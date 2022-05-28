import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var moment = require('moment');
let today = moment();
let born = moment("03/05/1952", "DD/MM/YYY");
let days = today.diff(born, 'days')
console.log(today.format());
console.log(today.format("ddd, hA"));
console.log(today.format("[Today is] dddd"));
console.log(today.format('YYYY MM DD'));
console.log(today.format('HH:mm'));
console.log(
    "Today is " +
    today.format('dddd, MMMM Do YYYY, h:mm:ss a')
);
console.log("I was born ", days, " days ago");