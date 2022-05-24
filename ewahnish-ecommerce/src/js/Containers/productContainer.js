const fs = require('fs');

class ProductContainer {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }

    static getAll() {
        let products = [{}];
        fs.promises.readFile('./src/files/products.txt', 'utf-8',)
            .then((contenido) => {
                products = JSON.parse(contenido);
                console.log(products);
            })
            .catch((error) => { console.log("Error de lectura ", error) })
    }

    static getId() {
        let theId = 0;
        fs.promises.readFile('./src/files/idgenerator.txt', 'utf-8',)
            .then((contenido) => {
                theId = Number(contenido)
            })
            .catch((error) => {
                console.log("No existe el archivo");
                theId = 0;
                //ProductContainer.setId(theId)
            })
        console.log(theId)
        return theId;
    }

    static setId(theId) {
        fs.promises.writeFile('./src/files/idgenerator.txt', 'utf-8', Number(theId))
            .catch((error) => { console.log(error) })
    }

    save() {
        let theId = ProductContainer.getId();
        let productId = ProductContainer.idIncrement(theId);
        console.log(productId);
        const appendProduct = {
            id: productId,
            title: this.title,
            price: this.price,
            thumbnail: this.thumbnail
        }
        fs.promises.appendFile('./src/files/products.txt', JSON.stringify(appendProduct),)
            .catch((error) => { console.log("Error de grabacion ", error) })
        fs.promises.writeFile('./src/files/idgenerator.txt', `${productId}`,)
            .then(console.log(ProductContainer.getAll()))
            .catch((error) => { console.log("Error de grabacion ", error) })
    }

    static getById(findId) {
        ProductContainer.getAll();
        const index = products.findIndex(element => element.id === findId);
        return products[index];
    }

    static deleteById(findId) {
        ProductContainer.getAll();
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
        console.log(newProducts)
        fs.promises.writeFile('./src/files/products.txt', JSON.stringify(newProducts),)
            .then(console.log(ProductContainer.getAll()))
            .catch((error) => { console.log("Error de grabacion ", error) })
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

    static idIncrement(theId) {
        theId++;
        return theId;
    }

}

product = new ProductContainer("Un objeto", 500, "la imagen");
console.log(product)
product.save();
