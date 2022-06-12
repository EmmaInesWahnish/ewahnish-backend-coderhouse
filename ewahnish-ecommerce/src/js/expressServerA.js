import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import Products from "./Containers/productContainerAsyncAwait.js";
import productContainerLoad from "./productContainerLoadExpress.js"

const express = require("express");
const app = express();

//Load products
productContainerLoad();

const PORT = 8080;

const server = app.listen(PORT, () => {
   console.log(`Server http listening at port ${server.address().port}`)
})
server.on("error", error => console.log(`Server error ${error}`))

// Routes
app.get('/products', (req, res) => {
    Products.getAllExpress(res);
 })

app.get('/randomProduct', (req, res) => {
    Products.getRandomProductExpress(res);
}) 
 
