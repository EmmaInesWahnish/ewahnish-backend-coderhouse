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
        let theId;
        fs.readFile('./src/files/idgenerator.txt', 'utf-8', (error, contenido) => {
            if (error){
                let theId = 0;
                ProductContainer.setId(theId);
                ProductContainer.id = theId;
            } else {
                ProductContainer.id = Number(contenido);
                theId = ProductContainer.id;
                console.log(theId);
            }
        })
        return theId;
    }

    static setId(theId) {
        fs.writeFile('./src/files/idgenerator.txt', 'utf-8', Number(theId) , error => {
            if (error){
                console.log(Error)
            } else {
                console.log("Id guardado")
            }
        })
    }

    save() {
        ProductContainer.getId();
        let theId = Number(ProductContainer.idIncrement());
        console.log(theId)
        const appendProduct = {
            id: theId,
            title: this.title,
            price: this.price,
            thumbnail: this.thumbnail
        }
        console.log(appendProduct)
        fs.appendFile('./src/files/products.txt', appendProduct, error => {
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

    idIncrement(theId) {
        theId++;
        return theId;
    }

}

product = new ProductContainer( "Un objeto",500,"la imagen");
console.log(product)
product.save();

console.log(ProductContainer.getAll());