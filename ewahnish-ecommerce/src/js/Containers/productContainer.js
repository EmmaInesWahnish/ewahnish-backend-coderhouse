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

    save() {
        //El archivo idgenerator.txt guarda el ultimo id utilizado
        fs.promises.readFile('./src/files/idgenerator.txt', 'utf-8',)
            .then((contenido) => {
                let productId = Number(contenido);
                //se prepara el nuevo id
                productId = productId + 1;
                //se construye el registro que se va a grabar
                let newProduct = {
                    id: productId,
                    title: this.title,
                    price: this.price,
                    thumbnail: this.thumbnail
                }
                console.log("Producto a ser agregado a products.txt ", newProduct);
                fs.promises.readFile('./src/files/products.txt', 'utf-8',)
                    .then((contenido) => {
                        //se obtiene el array de productos
                        const products = JSON.parse(contenido)
                        //se incorpora al array el nuevo producto mediante push
                        products.push(newProduct);
                        fs.promises.writeFile('./src/files/products.txt', JSON.stringify(products),)
                            .then(() => { Products.getAll() })
                            .catch((error) => { console.log("Error de grabacion ", error) })
                        fs.promises.writeFile('./src/files/idgenerator.txt', `${productId}`,)
                            .catch((error) => { console.log("Error de grabacion ", error) })
                    })
                    .catch((error) => {
                        const products = [];
                        products.push(newProduct);
                        fs.promises.writeFile('./src/files/products.txt', JSON.stringify(products),)
                            .then(() => { Products.getAll() })
                            .catch((error) => { console.log("Error de grabacion ", error) })
                        fs.promises.writeFile('./src/files/idgenerator.txt', `${productId}`,)
                            .catch((error) => { console.log("Error de grabacion ", error) })
                    })

            })
            .catch((error) => {
                //se trata del primer id a ser ser incorporado
                const productId = 1;
                console.log("productId ", productId);
                let newProduct = {
                    id: productId,
                    title: this.title,
                    price: this.price,
                    thumbnail: this.thumbnail
                }
                console.log("Producto a ser agregado a products.txt con id 1 ", newProduct);
                fs.promises.readFile('./src/files/products.txt', 'utf-8',)
                    .then((contenido) => {
                        const products = JSON.parse(contenido);
                        products.push(newProduct);
                        fs.promises.writeFile('./src/files/products.txt', JSON.stringify(products),)
                            .then(() => { Products.getAll() })
                            .catch((error) => { console.log("Error de grabacion productos.txt ", error) })
                        fs.promises.writeFile('./src/files/idgenerator.txt', `${productId}`,)
                            .catch((error) => { console.log("Error de grabacion idgenerator.txt ", error) })
                    })
                    .catch((error) => {
                        const products = [];
                        products.push(newProduct);
                        fs.promises.writeFile('./src/files/products.txt', JSON.stringify(products),)
                            .then(() => { Products.getAll() })
                            .catch((error) => { console.log("Error de grabacion productos.txt ", error) })
                        fs.promises.writeFile('./src/files/idgenerator.txt', `${productId}`,)
                            .catch((error) => { console.log("Error de grabacion idgenerator.txt", error) })
                    })

            })
    }

    static getById(findId, searchedProduct) {
        fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            .then((contenido) => {
                const products = JSON.parse(contenido)
                const index = products.findIndex(element => element.id === findId);
                console.log(index);
                searchedProduct = products[index]
                console.log("Producto buscado ", searchedProduct)
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
                let removedProduct = [];
                console.log("Position ", whichId)
                removedProduct = products.splice(whichId,1);
                console.log("Producto eliminado ", removedProduct);
                fs.promises.writeFile('./src/files/products.txt', JSON.stringify(products),)
                    .then(() => { Products.getAll() })
                    .catch((error) => { console.log("Error de grabacion en products.txt ", error) })

            })
            .catch((error) => {
                console.log("Error de lectura en products.txt ", error)
            })
    }

    static deleteAll() {
        //borra el archivo products
        fs.unlink('./src/files/products.txt', error => {
            if (error) {
                console.log("Se produjo un error ", error);
            } else {
                console.log("Archivo borrado");
            }
        });
        //borra el archivo idgenerator.txt
        fs.unlink('./src/files/idgenerator.txt', error => {
            if (error) {
                console.log("Se produjo un error ", error);
            } else {
                console.log("Archivo borrado");
            }
        });
    }

}
