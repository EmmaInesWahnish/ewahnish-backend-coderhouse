import { ProductContainer } from "./Containers/productContainer";
import empanadas from '../assets/empanadas.png';
import choripan from '../assets/choripan.png';
import hotDog from '../assets/hotDogKids.jpg';

const platos = [
    {
        title: "Empanadas",
        price: 500,
        thumbnail: <img src={empanadas} alt="cazuela" />,
    },
    {
        title: "Choripan con Chimichurri",
        price: 350,
        thumbnail: <img src={choripan} alt="choripan" />,
    },
    {
        title: "Hot Dog",
        price: 450,
        imagen: <img src={hotDog} alt="hot dog" />
    }
]

platos.forEach(element =>{
    let product =new ProductContainer();
    product = {
        title: element.title,
        price: element.price,
    }
})
