import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import Products from "./Containers/productContainerAsyncAwaitB.js";
import productContainerLoad from "./productContainerLoadExpress.js"

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Load products
productContainerLoad();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server http listening at port ${server.address().port}`)
})
server.on("error", error => console.log(`Server error ${error}`))

// Routes
app.get('/products', async (req, res) => {
    try {
        const array = await Products.getAll();
        res.send({ mensaje: 'Product List', products: array });
    }
    catch (error) {
        console.log("File products.txt does not exist or is damaged", error);
    }
})

app.get('/randomProduct', async (req, res) => {
    try {
        const array = await Products.getRandomProduct();
        res.send({ mensaje: 'Product List', products: array });
    }
    catch (error) {
        console.log("File products.txt does not exist or is damaged", error);
    }
})

