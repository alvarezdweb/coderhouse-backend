import express from 'express';
import Productos from '../api/Productos.js';
import faker from 'faker';

export const router = express.Router();
export const viewRouter = express.Router();

export const productos = new Productos();

viewRouter.get('/productos/login', async (req, res) => {
    res.render("login.ejs")
});

viewRouter.get('/productos/vista', async (req, res) => {
    const listOfProducts = await productos.getProducts();
    res.render("index.ejs", {
        hayProductos: Array.isArray(listOfProducts),
        productos: listOfProducts
    })
});

viewRouter.get('/productos/vista-test', async (req, res) => {
    console.log(req.query)
    const productsQuant = req.query.cant || 10;
    const fakerProducts = [];
    for(let i = 0; i<productsQuant;i++){
        fakerProducts.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        })
    }
    console.log(fakerProducts.length)
    const listOfProducts = await productos.getProducts();
    res.render("index.ejs", {
        hayProductos: fakerProducts.length > 0,
        productos: fakerProducts
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
    const id = req.params.id;
    const updateData = { id: id, ...req.body };
    res.json(await productos.updateProduct(updateData));
});

router.delete('/productos/borrar/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await productos.deleteProduct(id));
});
