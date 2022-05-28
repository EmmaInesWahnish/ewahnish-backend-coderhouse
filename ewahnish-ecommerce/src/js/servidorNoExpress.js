import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const http = require('http');
var moment = require('moment');

const server = http.createServer((peticion, respuesta) => {
    let date = new Date(Date.now());
    let hour = date.getHours();
    
    if (hour >= 6 && hour <= 12) {
      respuesta.end('Good morning');
    } else if (hour >= 13 && hour <= 19) {
      respuesta.end('Good afternoon');
    } else {
      respuesta.end('Good night');
    }    
    console.log(hour);
})

const PORT = 8080;
const connectedServer = server.listen(PORT, () => {
    console.log(`Server listening at port ${server.address().port}`)
})
connectedServer.on("error", error => console.log(`Error en servidor ${error}`))