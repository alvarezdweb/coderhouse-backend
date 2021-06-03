import express from 'express';
import Productos from './classes/Productos.js';

const app = express();
const PORT = 8080;
const productos = new Productos();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const server = app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('Error:', error);
});

app.get('/api/productos/listar', (req, res) => {
    res.json(productos.getProducts())
});

app.get('/api/productos/listar/:id', (req, res) => {
    console.log(req.params.id);
    res.json(productos.getProducts(req.params.id))
});

app.post('/api/productos/guardar', (req, res) => {
    const product = req.body;    
    res.json(productos.addProduct(product));
});
