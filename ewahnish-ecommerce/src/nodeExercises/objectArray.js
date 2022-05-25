const object_group = [];
for (let i = 0; i < 10; i++){
    const newObject = {
        id:i+1,
        nombre: "Objeto " + (i+1),
        precio: Math.ceil((Math.random()*10000) + 1000)/100
    };
    object_group.push(newObject);
}

console.log("Lista de objetos ",object_group);

let nombres = ""

const agregoNombre = (oneObject) => {
    return oneObject.nombre  + ", ";
}

object_group.forEach(function(element){
    nombres = nombres + agregoNombre(element)
})

let precioTotal = 0;

let expensiveProduct = object_group[0];

let cheapProduct = object_group[0];

const sumoPrecio = (oneObject) => {
    return Number(oneObject.precio);
}

const cantidad_de_objetos = object_group.length;

object_group.forEach(function(element){
    precioTotal = precioTotal + sumoPrecio(element);
    if (element.precio > expensiveProduct.precio){
        expensiveProduct = element;
    }
    if (element.precio < cheapProduct.precio){
        cheapProduct = element;
    }
})

console.log("A.- Nombres ",nombres);

console.log("B.- Precio total ", precioTotal);

console.log("C.- Precio promedio ", (Math.ceil(precioTotal*100/cantidad_de_objetos))/100);

console.log("D.- Objeto mas caro ", expensiveProduct);

console.log("E.- Objeto mas economico ", cheapProduct);

