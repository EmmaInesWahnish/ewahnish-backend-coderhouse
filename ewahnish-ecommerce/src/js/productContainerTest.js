import Products from "./Containers/productContainer.js";
let i = 6
const product = new Products(`Producto ${i}`, 500, `imagen ${i}`);
product.save();

