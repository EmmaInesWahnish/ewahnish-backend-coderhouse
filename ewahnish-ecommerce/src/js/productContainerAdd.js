import Products from "./Containers/productContainerAsyncAwait.js";
const platos = [
    {
        title: "Pancakes",
        price: 500,
        thumbnail: "../assets/pancakes.jpg",
    },
    {
        title: "Pasta con Albondigas",
        thumbnail: "../assets/pastaAlbondigas.jpg",
        price: 350
    },
    {
        title: "Pancitos de Salchicha",
        price: 450,
        thumbnail: "../assets/pigsInBlanket.jpg",
    },
    {
        title: "Empanadas",
        price: 500,
        thumbnail: "../assets/empanadas.png",
    },
    {
        title: "Pasta a los cuatro quesos",
        price: 500,
        thumbnail: "../assets/spaetzle.png",
    },
    {
        title: "Hot Dogs",
        thumbnail: "../assets/hotDogKids.jpg",
        price: 350
    },
]

Products.save(platos);



