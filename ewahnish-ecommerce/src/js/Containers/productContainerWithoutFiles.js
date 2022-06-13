import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
export default class Products {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }

    static async getAll(products) {
        //devuelve todos los productos
        try {
            //const contenido = await fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            //array = JSON.parse(contenido)
            console.log("I return the product list ", products)
            return products;
        }
        catch (error) {
            products = [];
            console.log("Array is empty ", error);
        }
    }

    static async save(product, products) {
        let productId = 0;
        let newProduct;
        try {
            //const contenido = await fs.promises.readFile('./src/files/products.txt', 'utf-8',);
            //const products = JSON.parse(contenido);
            productId = products[products.length - 1].id;
            console.log(productId)
            product.forEach(function (element) {
                productId = productId + 1;
                newProduct = {
                    id: productId,
                    title: element.title,
                    price: element.price,
                    thumbnail: element.thumbnail
                };
                //new product added to array using push
                products.push(newProduct);
            })
            //fs.promises.writeFile('./src/files/products.txt', JSON.stringify(products),)
            //    .catch((error) => { console.log("Write error ", error) })
        }
        catch (error) {
            console.log("products array is empty ", error)
            const products = [];
            product.forEach(function (element) {
                productId = productId + 1;
                newProduct = {
                    id: productId,
                    title: element.title,
                    price: element.price,
                    thumbnail: element.thumbnail
                }
                //new product added to array using push
                products.push(newProduct);
            })
            return products
            //fs.promises.writeFile('./src/files/products.txt', JSON.stringify(products),)
            //    .catch((error) => { console.log("Write error ", error) })
        }
    }

    static async getById(findId) {
        let searchedProduct = [];
        try {
            const contenido = await fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            const products = JSON.parse(contenido)
            const index = products.findIndex(element => element.id === findId);
            searchedProduct = products[index]
            if (searchedProduct != undefined) {
                console.log("Random product ", searchedProduct, " with id ", findId);
            } else {
                console.log("There in no product with id ", findId);
            }
        }
        catch (error) {
            console.log("Read error reading file products.txt ", error)

        }
        return searchedProduct;
    }

    static async deleteById(findId) {
        //Obtener producto por id
        try {
            const contenido = await fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            const products = JSON.parse(contenido)
            const whichId = products.findIndex(element => element.id === findId);
            if (whichId !== -1) {
                let removedProduct = [];
                console.log("Posicion del producto a eliminar ", whichId)
                removedProduct = products.splice(whichId, 1);
                console.log("Deleted product ", removedProduct);
                fs.promises.writeFile('./src/files/products.txt', JSON.stringify(products),)
                    .then(() => { Products.getAll() })
                    .catch((error) => { console.log("Write error in file products.txt ", error) })
            } else {
                console.log("There is no product with id ", findId);
            }
        }
        catch (error) {
            console.log("Read error reading file products.txt ", error)
        }
    }

    static async deleteAll() {
        //borra el archivo products.txt
        try{
            await fs.promises.writeFile('./src/files/products.txt',JSON.stringify([]))
        }
        catch(error){
            console.log("Error deleting elements ", error)
        }
    }

    static async deleteLoadExpress(array) {
        try {
            //borra el archivo products.txt
            await fs.promises.unlink('./src/files/products.txt');
            await Products.save(array);
        }
        catch (error) {
            console.log(error);
        }
    }

    static async getRandomProduct() {
        let randomProduct = []
        try {
            const contenido = await fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            const products = JSON.parse(contenido);
            const productLastId = products[products.length - 1].id;
            let randomId = Math.floor((Math.random() * productLastId) + 1);
            const index = products.findIndex(element => element.id === randomId);
            randomProduct = products[index]
            if (randomProduct != undefined) {
                console.log("Random product ", randomProduct, " with id ", randomId);
            } else {
                console.log("There in no product with id ", findId);
            }
        }
        catch (error) {
            console.log("File products.txt is empty ", error)
        }
        return randomProduct
    }
}
