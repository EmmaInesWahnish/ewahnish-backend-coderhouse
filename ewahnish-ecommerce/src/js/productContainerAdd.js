import Products from "./Containers/productContainer.js";
const platos = [
    {
        title: "Hot Dogs",
        price: 350,
        thumbnail: "../assets/hotDogKids.jpg",
    },
    {
        title: "Panqueques Americanos",
        price: 450,
        thumbnail: "../assets/pancakes.png",
    }
]

Products.save(platos);


