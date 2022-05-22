const fs = require('fs');

class ProductContainer {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }

    static getAll() {
        let products = [{}];
        fs.readFile('./src/files/products.txt', 'utf-8', (error, contenido) => {
            if (error) {
                console.log("Error de lectura ", error)
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

    static getId() {
        let theId = 0;
        fs.readFile('./src/files/idgenerator.txt', 'utf-8', (error, contenido) => {
            if (error){
                ProductContainer.setId(theId);
            } else {
                theId = Number(contenido);
                console.log(theId);
            }
        })
        return theId;
    }

    static setId(theId) {
        fs.writeFile('./src/files/idgenerator.txt', 'utf-8', theId , (error) => {
            if (error){
                console.log(Error)
            } else {
                console.log("Id guardado")
            }
        })
    }

    save() {
        ProductContainer.getId();
        const theId = ProductContainer.idIncrement();
        const appendProduct = {
            "id": theId,
            "title": this.title,
            "price": this.price,
            "thumbnail": this.thumbnail
        }

        fs.appendFile('./src/files/products.txt', JSON.stringify(appendProduct), error => {
            if (error) {
                throw new Error("Error de grabacion ", error);
            } else {
                console.log("Archivo guardado");
            }
        });
    }

    static getById(findId) {
        this.getAll();
        const index = products.findIndex(element => element.id === findId);
        return products[index];
    }

    static deleteById(findId) {
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

    static deleteAll() {
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

product = new ProductContainer( "Un objeto",500,"la imagen");
console.log(product)
product.save();

console.log(ProductContainer.getAll());