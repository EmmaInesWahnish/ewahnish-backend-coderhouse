import Products from "./Containers/productContainer.js";
const platos = [
    {
        title: "Pasta a los cuatro quesos",
        price: 350,
        thumbnail: "../assets/spaetzle.png",
    },
    {
        title: "Locro con carne vacuna y porcina",
        price: 450,
        thumbnail: "../assets/locro.png",
    }
]

Products.save(platos);


