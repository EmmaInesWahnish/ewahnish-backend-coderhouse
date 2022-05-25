const random_numbers = [];
for (let i= 0; i < 20; i++){
    const one_number = {
        key: i+1,
        value:0
    } 
    random_numbers.push(one_number)
}

for (let i = 0; i < 10000; i++){
    const  which_number = Math.floor((Math.random()*20)+1);
    const which_index = random_numbers.findIndex(element => element.key === which_number);
    if(which_index != -1){
        random_numbers[which_index].value = random_numbers[which_index].value + 1;
    };
}

console.log(random_numbers);

const sumoPrecio = (oneObject) => {
    return Number(oneObject.precio);
}

let ocurrencias = 0;

random_numbers.forEach(function(element){
    ocurrencias = ocurrencias + element.value;
});

console.log(ocurrencias);


