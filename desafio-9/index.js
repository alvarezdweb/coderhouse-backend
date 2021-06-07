import express from 'express';
import Productos from './classes/Productos.js';

const app = express();
const PORT = 8080;
const productos = new Productos();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/', router);
app.use(express.static('public'));

const server = app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('Error:', error);
});

router.get('/productos/listar', (req, res) => {
    res.json(productos.getProducts())
});

router.get('/productos/listar/:id', (req, res) => {
    console.log(req.params.id);
    res.json(productos.getProducts(req.params.id))
});

router.post('/productos/guardar', (req, res) => {
    const product = req.body;    
    res.json(productos.addProduct(product));
});

router.put('/productos/actualizar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateData = { id: id, ...req.body };
    res.json(productos.updateProduct(updateData));
});

router.delete('/productos/borrar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.json(productos.deleteProduct(id));
});

app.get('/', (req, res) => {
    res.sendFile('index');
});
