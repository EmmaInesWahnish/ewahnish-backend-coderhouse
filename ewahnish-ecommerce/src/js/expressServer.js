import Products from "./Containers/productContainer.js";
import productContainerLoad from "./productContainerLoadExpress.js"
import express from 'express';

//const express = require("express");
const app = express();
const routerProducts = express.Router();

app.use('/api/productos', routerProducts);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

routerProducts.use(express.json());
routerProducts.use(express.urlencoded({ extended: true }))

app.use('/static', express.static('public'))

//Load products
productContainerLoad();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server http listening at port ${server.address().port}`)
})
server.on("error", error => console.log(`Server error ${error}`))

// Routes
routerProducts.get('/', async (req, res) => {
    try {
        const array = await Products.getAll();
        res.send({ message: 'Product List', products: array });
    }
    catch (error) {
        console.log("An undetermined error has occured", error);
    }
})

routerProducts.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    console.log(id)
    if (!isNaN(id)) {
        try {
            const producto = await Products.getById(id);
            if (producto != undefined) {
                res.send({ message: 'Producto encontrado', producto: producto })
            } else {
                res.send({
                    "error": "Producto no encontrado"
                })
            }
        }
        catch (error) {
            res.send({
                "error": "Se produjo un error indeterminado al buscar el producto"
            })
        }
    } else {
        res.send({
            "error": "El id no es numerico"
        })
    }
})

routerProducts.get('/randomProduct', async (req, res) => {
    try {
        const array = await Products.getRandomProduct();
        res.send({ mensaje: 'Product List', products: array });
    }
    catch (error) {
        console.log("File products.txt does not exist or is damaged", error);
    }
})

routerProducts.post('/', async (req, res) => {
    let receive = req.body;
    let producto = [{
        title: receive.title,
        price: receive.price,
        thumbnail: receive.thumbnail
    }]
    try {
        const productId = await Products.save(producto);
        console.log(productId)
        try {
            const products = await Products.getAll();
            res.send({
                productos: products
            })
        }
        catch (error) {
                res.send({
                    message: 'Ha ocurrido un error'
                })
            }

        }
        catch (error) {
            console.log("An undetermined error has occured", error);
        }
    })
