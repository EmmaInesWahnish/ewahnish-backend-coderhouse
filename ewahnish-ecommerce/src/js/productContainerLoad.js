import Products from "./Containers/productContainer.js";
const platos = [
    {
        title: "Cazuela de Mariscos",
        price: 500,
        thumbnail: "../assets/cazuela.png",
    },
    {
        title: "Choripan con Chimichurri",
        thumbnail: "../assets/choripan.png",
        price: 350
    },
    {
        title: "Carne a la olla con verduras",
        price: 450,
        thumbnail: "../assets/carne-a-la-olla.png",
    },
    {
        title: "Pierna de cordero rellena",
        price: 500,
        thumbnail: "../assets/cordero.png",
    },
    {
        title: "Frutillas",
        price: 500,
        thumbnail: "../assets/frutillas.jpg",
    },
    {
        title: "Locro",
        thumbnail: "../assets/locro.png",
        price: 350
    },
    {
        title: "Omelette",
        price: 450,
        thumbnail: "../assets/omeletteKids.jpg",
    },
    {
        title: "Tiramisu",
        price: 500,
        thumbnail: "../assets/tiramisu.jpg",
    },
]

export default function productContainerLoad(){

Products.save(platos);

}


