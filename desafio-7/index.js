import express from 'express';
import Archivo from './classes/Archivo.js';

const app = express();
const PORT = 8080;

const archivo = new Archivo('productos.txt');
const productos = await archivo.leer();
const visitas = {items: 0, item: 0};

const server = app.listen(PORT, () => {
    console.log(`el servidor esta escuchando en el puerto http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('Error:', error);
});

app.get('/items', (req,res) => {
    visitas.items++;
    res.json({items: productos, cantidad: productos.length});
});

app.get('/item-random', (req,res) => {
    visitas.item++;
    let id = Math.floor(Math.random() * ((productos.length+1) - 1)) + 1;
    let producto = productos.filter( producto => producto.id === id);
    res.json({item: producto[0]});
});

app.get('/visitas', (req,res) => {
    res.json({visitas: {items: visitas.items, item: visitas.item}});
});