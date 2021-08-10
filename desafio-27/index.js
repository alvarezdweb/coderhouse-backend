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
import passportFacebook from 'passport-facebook';

const FACEBOOK_CLIENT_ID = "194233676083385";
const FACEBOOK_CLIENT_SECRET = "18a6e2e015139eccdb101ec54346777a";


mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
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
const FacebookStrategy = passportFacebook.Strategy;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
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

// ------------------ DESAFIO 27 ------------------

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email', 'photos'],
  scope: ['email']
}, function (accessToken, refreshToken, profile, done) {
  console.log(JSON.stringify(profile, null, 3));
  let userProfile = profile;
  return done(null, userProfile);
}));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
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

app.get('/username', (req, res) => {
    res.send({userName: req.user.displayName, email: req.user.emails[0].value, photo: req.user.photos[0].value});
})

app.get('/logout', (req, res) => {
    req.logout();
    res.sendFile(__dirname + '/public/login.html');
}) 


app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook',
    {
        successRedirect: '/',
        failureRedirect: '/logout'
    }
));

app.get('/datos', (req, res) => {
  if (req.isAuthenticated()) {
      res.send(req.user);
  } else {
      res.status(401).send('debe autenticarse primero');
  }
});

// ------------------------------------------------------

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

