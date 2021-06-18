import express from 'express';
import {router, viewRouter, productos} from './routes/productos.js';
import handlebars from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8080;

const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

app.use('/api/', router);
app.use(viewRouter)
app.use(express.static('public'));

app.set("view engine", "ejs");
app.set("views", "./views");

server.listen(PORT, () => {
    console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('Error:', error);
});

app.get('/', (req, res) => {
    res.sendFile('index');
});

io.on('connection', socket => {
    console.log('un cliente se conecto!');
    socket.emit('data', productos.getProducts())

    socket.on('newProduct', (data) => {
        io.sockets.emit('addProduct', productos.getProducts());
    })
})

