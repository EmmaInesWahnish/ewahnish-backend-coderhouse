import Products from "./Containers/productContainer.js";
import productContainerLoad from "./productContainerLoadExpress.js"
import express from 'express';
import fs from 'fs'

//const express = require("express");
const app = express();
const routerProducts = express.Router();

// '/api/productos is our route for routerProducts
app.use('/api/productos', routerProducts);

// necessary for express to understand json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

routerProducts.use(express.json());
routerProducts.use(express.urlencoded({ extended: true }))

// product input form available at '/'
app.use('/', express.static('public'))

//Load products
productContainerLoad();

// Routes
routerProducts.get('/', async (req, res) => {
    try {
        const array = await Products.getAll();
        res.send({ message: 'Lista de productos ', products: array });
    }
    catch (error) {
        res.send({
            message: 'No se ha podido recuperar la lista de productos'
        })
    }
})

routerProducts.get('/randomProduct', async (req, res) => {
    try {
        const array = await Products.getRandomProduct();
        res.send({ mensaje: 'Un producto al azar ', products: array });
    }
    catch (error) {
        res.send({
            message: 'No se ha podido recuperar ningun producto'
        })
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
                message: "Se produjo un error indeterminado al buscar el producto"
            })
        }
    } else {
        res.send({
            "error": "El id no es numerico"
        })
    }
})

routerProducts.post('/', async (req, res) => {
    let receive = req.body;
    let producto = [{
        title: receive.title,
        price: receive.price,
        thumbnail: receive.thumbnail
    }]
    if (producto) {
        try {
            await Products.getAll()
            await Products.save(producto);
            try {
                const products = await Products.getAll();
                res.send({
                    productos: products
                })
            }
            catch (error) {
                res.send({
                    message: 'No se ha podido obtener la lista de productos'
                })
            }
        }
        catch (error) {
            res.send({
                message: 'No se ha podido salvar el producto'
            })
        }
    } else {
        res.send({
            message: "Datos erroneos"
        })
    }
})

routerProducts.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    let receive = req.body;
    let searchedProduct = {};
    console.log("The id ", id, "receive  ", receive)
    try {
        const products = await Products.getAll();
        const index = products.findIndex(element => element.id === id);
        searchedProduct = products[index];
        console.log(index, " Modifico ", searchedProduct);
        if (index !== -1) {

            if(receive.title !== null){
                products[index].title = receive.title;
            }
            if(receive.price !== null){
                products[index].price = receive.price;
            }
            if(receive.title !== null){
                products[index].thumbnail = receive.thumbnail;
            }

            let array = [];

            products.forEach((element) => {
                array.push({
                    title: element.title,
                    price: element.price,
                    thumbnail: element.thumbnail
                })
            })

            try {
                await fs.promises.unlink('./src/files/products.txt');
                try {
                    await Products.save(array);
                    res.send({
                        message: 'Modificacion exitosa',
                        product: array
                    })
                }
                catch (error) {
                    res.send({
                        message: 'No pudo cargar',
                        error: error
                    })
                }
            }
            catch (error) {
                res.send({
                    message: 'No pudo borrar',
                    error: error
                })
            }
        } else {
            res.send({
                message: 'Producto no encontrado'
            })
        }
    }
    catch (error) {
        res.send({
            message: 'Ha ocurrido un error',
            error: error
        })
    }

})

routerProducts.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    if (!isNaN(id)) {
        try {
            const removedProduct = await Products.deleteById(id);
            if (removedProduct.length === 0) {
                res.send({
                    "error": "El producto no existe"
                })
            } else {
                res.send({
                    "removed": removedProduct
                })
            }
        }
        catch (error) {
            res.send({
                "error": "El producto no pudo ser eliminado"
            })
        }
    } else {
        res.send({
            "error": "El id no es numerico"
        })
    }
})

/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server http listening at port ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))