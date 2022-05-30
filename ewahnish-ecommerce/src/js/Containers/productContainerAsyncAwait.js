import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
export default class Products {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }

    static async getAll() {
        //devuelve todos los productos
        let array = [];
        try {
            const contenido = await fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            array = JSON.parse(contenido)
            console.log("I return the product list ", array)
        }
        catch (error) {
            array = [];
            console.log("File products.txt does not exist or is damaged", error);
        }
    }

    static async getAllExpress(res) {
        //devuelve todos los productos
        let array = [];
        try {
            const contenido = await fs.promises.readFile('./src/files/products.txt', 'utf-8',);
            array = JSON.parse(contenido);
            console.log("I return the product list ", array);
            res.send({ mensaje: 'Product List', products: array });
        }
        catch (error) {
            array = [];
            console.log("File products.txt does not exist or is damaged", error);
        }
    }

    static async save(product) {
        let productId = 0;
        let newProduct;
        try {
            const contenido = await fs.promises.readFile('./src/files/products.txt', 'utf-8',);
            const products = JSON.parse(contenido);
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
            fs.promises.writeFile('./src/files/products.txt', JSON.stringify(products),)
                .catch((error) => { console.log("Write error ", error) })
        }
        catch (error) {
            console.log("File products.txt is empty ", error)
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
            fs.promises.writeFile('./src/files/products.txt', JSON.stringify(products),)
                .catch((error) => { console.log("Write error ", error) })
        }
    }

    static async getById(findId, searchedProduct) {
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
    }

    static async getByIdExpress(findId, searchedProduct, res) {
        try {
            const contenido = await fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            const products = JSON.parse(contenido)
            const index = products.findIndex(element => element.id === findId);
            searchedProduct = products[index]
            if (searchedProduct != undefined) {
                console.log("Random product ", searchedProduct, " with id ", findId);
                res.send({ mensaje: 'Random Product', products: searchedProduct })
            } else {
                console.log("There in no product with id ", findId);
            }
        }
        catch (error) {
            console.log("Read error reading file products.txt ", error)

        }
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
                console.log("There in no product with id ", findId);
            }
        }
        catch (error) {
            console.log("Read error reading file products.txt ", error)
        }
    }

    static deleteAll() {
        //borra el archivo products.txt
        fs.unlink('./src/files/products.txt', error => {
            if (error) {
                console.log("There was an undetermined error ", error);
            } else {
                console.log("File deleted");
            }
        });
    }

    static async getRandomProduct() {
        try {
            const contenido = await fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            const products = JSON.parse(contenido);
            const productLastId = products[products.length - 1].id;
            let randomId = Math.floor((Math.random() * productLastId) + 1);
            let randomProduct = []
            Products.getById(randomId, randomProduct);
        }
        catch (error) {
            console.log("File products.txt is empty ", error)
        };
    }

    static async getRandomProductExpress(res) {
        try {
            const contenido = await fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            const products = JSON.parse(contenido);
            const productLastId = products[products.length - 1].id;
            let randomId = Math.floor((Math.random() * productLastId) + 1);
            let randomProduct = []
            Products.getByIdExpress(randomId, randomProduct, res);
        }
        catch (error) {
            console.log("File products.txt is empty ", error)
        };
    }
}
