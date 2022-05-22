const fs = require('fs');

export class ProductContainer {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }

    getAll() {
        let products = [{}];
        fs.readFile('./src/files/products.txt', 'utf-8', (error, contenido) => {
            if (error) {
                throw new Error("Error de lectura ", error)
            } else {
                try {
                    products = JSON.parse(contenido);
                    console.log(products);
                } catch (err) {
                    throw new Error("Error de conversion ", Error)
                }
            }
        })
        return products;
    }

    getId() {
        this.getAll()
        let last = products.length;
        const theId = 1;
        if (last > 0) {
            theId = products[last].id;
        }
        return theId;
    }

    save(product) {
        appendProduct = {
            id: this.getId(),
            title: product.title,
            price: product.price,
            thumbnail: this.thumbnail
        }

        fs.appendFile('./src/files/products.txt', JSON.stringify(appendProduct), error => {
            if (error) {
                throw new Error("Error de grabacion ", error);
            } else {
                console.log("Archivo guardado");
            }
        });
    }

    getById(findId) {
        this.getAll();
        const index = products.findIndex(element => element.id === findId);
        return products[index];
    }

    deleteById(findId) {
        this.getAll();
        const index = products.findIndex(element => element.id === findId);
        let newProducts = {}
        for (let i = 0; i < products.length; i++) {
            if (i !== index) {
                newProducts.push({
                    id: products[i].id,
                    title: products[i].title,
                    price: products[i].price,
                    thumbnail: products[i].thumbnail
                })
            }
        }
        fs.writeFile('./src/files/products.txt', JSON.stringify(newProducts), error => {
            if (error) {
                throw new Error("Error de grabacion ", error);
            } else {
                console.log("Archivo guardado");
            }
        });
    }

    deleteAll() {
        fs.unlink('./src/files/products.txt', error => {
            if (error) {
                throw new Error("Se produjo un error ", error);
            } else {
                console.log("Archivo borrado");
            }
        });
    }

    static id;

    static idIncrement() {
        ProductContainer.id++;
    }


}