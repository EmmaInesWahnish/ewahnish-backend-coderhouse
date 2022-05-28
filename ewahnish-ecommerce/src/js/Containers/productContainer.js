import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
export default class Products {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }

    static getAll(array) {
        //devuelve todos los productos
        fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            .then((contenido) => {
                array = JSON.parse(contenido)
                console.log("Lista de productos ", array)
            })
            .catch((error) => {
                array = [];
                console.log("File products.txt does not exist or is damaged", error)
            })
    }

    static save(product) {
        //El archivo idgenerator.txt guarda el ultimo id utilizado
        let productId = 0;
        let newProduct;
        fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            .then((contenido) => {
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
                    //se incorpora al array el nuevo producto mediante push
                    products.push(newProduct);
                })
                fs.promises.writeFile('./src/files/products.txt', JSON.stringify(products),)
                    .catch((error) => { console.log("Error de grabacion ", error) })
            })
            .catch((error) => {
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
                    //se incorpora al array el nuevo producto mediante push
                    products.push(newProduct);
                })
                fs.promises.writeFile('./src/files/products.txt', JSON.stringify(products),)
                    .catch((error) => { console.log("Error de grabacion ", error) })
            })
    }

    static getById(findId, searchedProduct) {
        fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            .then((contenido) => {
                const products = JSON.parse(contenido)
                const index = products.findIndex(element => element.id === findId);
                searchedProduct = products[index]
                if (searchedProduct != undefined) {
                    console.log("Producto buscado ", searchedProduct, " con id ", findId);
                } else {
                    console.log("No hay un producto con id ", findId);
                }
            })
            .catch((error) => {
                console.log("Error de lectura archivo products.txt ", error)

            })
    }

    static deleteById(findId) {
        //Obtener producto por id
        fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            .then((contenido) => {
                const products = JSON.parse(contenido)
                const whichId = products.findIndex(element => element.id === findId);
                if (whichId !== -1) {
                    let removedProduct = [];
                    console.log("Posicion del producto a eliminar ", whichId)
                    removedProduct = products.splice(whichId, 1);
                    console.log("Producto eliminado ", removedProduct);
                    fs.promises.writeFile('./src/files/products.txt', JSON.stringify(products),)
                        .then(() => { Products.getAll() })
                        .catch((error) => { console.log("Error de grabacion en products.txt ", error) })
                } else {
                    console.log("No hay un producto con id ", findId);
                }
            })
            .catch((error) => {
                console.log("Error de lectura en products.txt ", error)
            })
    }

    static deleteAll() {
        //borra el archivo products.txt
        fs.unlink('./src/files/products.txt', error => {
            if (error) {
                console.log("Se produjo un error ", error);
            } else {
                console.log("Archivo borrado");
            }
        });
    }

    static getRandomProduct() {
        let productLastId = 0;
        fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            .then((contenido) => {
                const products = JSON.parse(contenido);
                productLastId = products[products.length - 1].id;
                let randomId = Math.floor((Math.random()*productLastId)+1);
                let randomProduct = []
                Products.getById(randomId, randomProduct);
            })
            .catch((error) => {
                console.log("File products.txt is empty ", error)
            });
    }
}
