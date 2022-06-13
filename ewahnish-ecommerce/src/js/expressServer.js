import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import Products from "./Containers/productContainer.js";
import productContainerLoad from "./productContainerLoadExpress.js"
import express from 'express';

//const express = require("express");
const app = express();
const routerProducts = express.Router();

app.use('/products', routerProducts);

app.use(express.json());
app.use(express.urlencoded({extended: true}))

routerProducts.use(express.json());
routerProducts.use(express.urlencoded({extended: true}))

//Load products
productContainerLoad();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server http listening at port ${server.address().port}`)
})
server.on("error", error => console.log(`Server error ${error}`))

// Routes
routerProducts.get('/list', async (req, res) => {
    try {
        const array = await Products.getAll();
        res.send({ mensage: 'Product List', products: array });
    }
    catch (error) {
        console.log("File products.txt does not exist or is damaged", error);
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

