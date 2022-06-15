import Products from "./Containers/productContainer.js";
import productContainerLoad from "./productContainerLoadExpress.js"
import express from 'express';
import fs from 'fs'

//const express = require("express"); replaced by import express from 'express'
const app = express();

//Here we create the router for our products
const routerProducts = express.Router();

// '/api/productos is our path
app.use('/api/productos', routerProducts);

// this code is necessary for express to understand json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

routerProducts.use(express.json());
routerProducts.use(express.urlencoded({ extended: true }))

// '/productInput' is our virtual directory -- to access de form use 'http://localhost:8080/productForm
app.use('/productInput', express.static('public'))

//This function populates the products array and products.txt file (that for the moment contains the products)
//This has been added in order to have an initial products list
productContainerLoad();

// *** ROUTES ***
//This route returns the products list
routerProducts.get('/', async (req, res) => {
    try {
        const array = await Products.getAll();
        res.send({ message: 'Lista de productos ', products: array });
    }
    catch (error) {
        res.send({
            message: 'No se ha podido recuperar la lista de productos',
            error: error
        })
    }
})

//This route returns a random product and has been kept
routerProducts.get('/randomProduct', async (req, res) => {
    try {
        const array = await Products.getRandomProduct();
        res.send({ menssage: 'Un producto al azar ', 
                    products: array });
    }
    catch (error) {
        res.send({
            message: 'No se ha podido recuperar ningun producto',
            error: error
        })
    }
})

//This route returns a product according to its id.
routerProducts.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    console.log(id)
    if (!isNaN(id)) {
        try {
            const producto = await Products.getById(id);
            if (producto != undefined) {
                res.send({ 
                    message: 'Producto encontrado', 
                    product: producto 
                })
            } else {
                res.send({
                    message: "Producto no encontrado"
                })
            }
        }
        catch (error) {
            res.send({
                message: "Se produjo un error al buscar el producto",
                error: error
            })
        }
    } else {
        res.send({
            "error": "El id solicitado no es numerico"
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
            await Products.save(producto);
            try {
                const products = await Products.getAll();
                res.send({
                    message:"Producto incorporado",
                    product: producto
                })
            }
            catch (error) {
                res.send({
                    message: 'No se ha podido obtener la lista de productos',
                    error: error
                })
            }
        }
        catch (error) {
            res.send({
                message: 'No se ha podido guardar el producto',
                error: error
            })
        }
    } else {
        res.send({
            message: "Los datos suministrados son incorrectos"
        })
    }
})

//This route updates the product with the selected id
//A property is updated only if it receives a non null value
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

            if(receive.title !== null && receive.title !== undefined){
                products[index].title = receive.title;
            }
            if(receive.price !== null && receive.price !== undefined){
                products[index].price = receive.price;
            }
            if(receive.thumbnail !== null && receive.thumbnail !== undefined){
                products[index].thumbnail = receive.thumbnail;
            }

            //The array gets updated here
            let array = [];

            products.forEach((element) => {
                array.push({
                    title: element.title,
                    price: element.price,
                    thumbnail: element.thumbnail
                })
            })

            //products.txt file is replaced with the updated array
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
                        message: 'No fue posible cargar los productos en products.txt',
                        error: error
                    })
                }
            }
            catch (error) {
                res.send({
                    message: 'No se pudo borrar el archivo products.txt',
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
            message: 'Ha ocurrido un error al intentar recuperar la lista de productos',
            error: error
        })
    }

})

//This route removes the product with the selected id
routerProducts.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    if (!isNaN(id)) {
        try {
            const removedProduct = await Products.deleteById(id);
            if (removedProduct.length === 0) {
                res.send({
                    message: "El producto solicitado no existe"
                })
            } else {
                res.send({
                    message: "El producto ha sido eliminado",
                    product: removedProduct
                })
            }
        }
        catch (error) {
            res.send({
                message: "El producto no pudo ser eliminado",
                error: error
            })
        }
    } else {
        res.send({
            message: "El id suministrado no es numerico"
        })
    }
})

/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server http listening at port ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))