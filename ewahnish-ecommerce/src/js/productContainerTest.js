import pkg from "./Containers/productContainer.js";
const {ProductContainer} = pkg;

product = new ProductContainer(
    {
        title: "Un objeto",
        price: 500,
        thumbnail: "la imagen"
    });
console.log(product[i])
product.save();

console.log(ProductContainer.getAll());

