import express from 'express';
import {router, viewRouter, productos} from './routes/productos.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Messages from './api/Messages.js'
import mongoose from 'mongoose';
import session from 'express-session'
import MongoStore from 'connect-mongo';
import passport from 'passport';
import passportLocal from 'passport-local';
import { users } from './models/users.js';
import bcrypt from 'bcrypt';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import Productos from './api/Productos.js'

mongoose.connect('mongodb+srv://root:gvHbtaYskBvc9VtZ@cluster0.6hv2w.mongodb.net/ecommerce?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('conexion exitosa!'))
    .catch(err => console.log(err))

const messages = new Messages();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8080;

const server = createServer(app);
const io = new Server(server);

const LocalStrategy = passportLocal.Strategy;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://root:gvHbtaYskBvc9VtZ@cluster0.6hv2w.mongodb.net/sessions?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))

app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

app.use('/api/', router);
app.use(viewRouter);
app.use(express.static('public'));

app.set("view engine", "ejs");
app.set("views", "./views");

server.listen(PORT, () => {
    console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('Error:', error);
});

// ------------------ DESAFIO 26 ------------------

passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
    function (req, username, password, done) {
      users.findOne({ 'username': username },
        function (err, user) {
          if (err)
            return done(err);
          if (!user) {
            console.log('User Not Found with username ' + username);
            return done(null, false,
              console.log('message', 'User Not found.'));
          }
          if (!isValidPassword(user, password)) {
            console.log('Invalid Password');
            return done(null, false,
              console.log('message', 'Invalid Password'));
          }
          return done(null, user);
        }
      );
    })
  );

  var isValidPassword = function (user, password) {
    return bcrypt.compareSync(password, user.password);
  }

  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
    function (req, username, password, done) {
        users.findOne({ 'username': username }, function (err, user) {
          if (err) {
            console.log('Error in SignUp: ' + err);
            return done(err);
          }
          if (user) {
            console.log('User already exists');
            return done(null, false,
              console.log('message', 'User Already Exists'));
          } else {
            var newUser = new users();
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.email = req.body.email;
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
  
            newUser.save(function (err) {
              if (err) {
                console.log('Error in Saving user: ' + err);
                throw err;
              }
              console.log('User Registration succesful');
              return done(null, newUser);
            });
          }
        }); 
    })
  )
  var createHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }

passport.serializeUser(function (user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function (id, done) {
    users.findById(id, function (err, user) {
      done(err, user);
    });
  });

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req,res) => {
    if (req.isAuthenticated()) {
        var user = req.user;
        console.log('user logueado');
        res.sendFile(__dirname + '/public/index.html');
      }
      else {
        console.log('user NO logueado');
        res.sendFile(__dirname + '/public/login.html');
      }
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), (req,res)=>{
        let user = req.user;
        res.sendFile(__dirname + '/public/index.html');
});

app.get('/faillogin', (req,res)=> {
    res.sendFile(__dirname + '/public/faillogin.html');
});

app.get('/registrar', (req,res)=> {
    res.sendFile(__dirname + '/public/register.html');
})

app.post('/registrar', passport.authenticate('signup', {failureRedirect: '/failreg'}), (req, res) => {

    res.sendFile(__dirname + '/public/login.html')
});

app.get('/failreg', (req,res)=> {
    res.sendFile(__dirname + '/public/failreg.html');
});

app.get('/username', (req, res) => {
    res.send({userName: req.user.username});
})

app.get('/logout', (req, res) => {
    req.logout();
    res.sendFile(__dirname + '/public/login.html')
}) 

// ------------------------------------------------------

//DESAFIO 38
const products = new Productos();

const getProductsByGraphql = async () => {
  return await products.getProducts();
}

const getProductByGraphql = async (args) => {
  const id = args.id;
  return await products.getProducts(id);
}

const addProduct = async (args) => {
  return await products.addProduct(args);
}

const schema = buildSchema(`
        type Query {
            message: String,
            products: [Product],
            product(id: String!): Product
        },
        type Mutation {
            addProduct(title: String!, thumbnail: String!, price: Int!): Product
        },
        type Product {
        _id: String
        title: String
        thumbnail: String
        price: Int
        }
    `);

const root = {
    message: () => 'test...',
    products: getProductsByGraphql,
    product: getProductByGraphql,
    addProduct: addProduct
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
//

io.on('connection', async (socket) => {

    const arrayMsg = await messages.getMessages();

    console.log('un cliente se conecto!');
    socket.emit('data', await productos.getProducts());
    socket.emit('messages', await messages.getMessages());
    
    socket.on('newProduct', async (data) => {
        io.sockets.emit('addProduct', await productos.getProducts());
    });

    socket.on('new-message', async (data) => {
        console.log('data', data)
            const newMsg = await messages.addMessage(data);
            io.sockets.emit('messages', await messages.getMessages());
    });
})

export default app;
