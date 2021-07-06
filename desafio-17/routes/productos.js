import express from 'express';
import Productos from '../api/Productos.js';

export const router = express.Router();
export const viewRouter = express.Router();

export const productos = new Productos();

viewRouter.get('/productos/vista', async (req, res) => {
    const listOfProducts = await productos.getProducts();
    res.render("index.ejs", {
        hayProductos: Array.isArray(listOfProducts),
        productos: listOfProducts
    })
})

router.get('/productos/listar', async (req, res) => {
    res.json(await productos.getProducts())
});

router.get('/productos/listar/:id', async (req, res) => {
    res.json(await productos.getProducts(req.params.id))
});

router.post('/productos/guardar', async (req, res) => {
    const product = req.body;   
    await productos.addProduct(product);
    res.redirect('/')
});

router.put('/productos/actualizar/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const updateData = { id: id, ...req.body };
    res.json(await productos.updateProduct(updateData));
});

router.delete('/productos/borrar/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    res.json(await productos.deleteProduct(id));
});
