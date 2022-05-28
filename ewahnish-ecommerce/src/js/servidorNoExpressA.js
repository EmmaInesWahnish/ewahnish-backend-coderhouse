import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const http = require('http')

const server = http.createServer((peticion, respuesta) => {
    console.log("Recibimos la request " + new Date().getTime())
    respuesta.end('Hola mundo')
 })

 const connectedServer = server.listen(8080, () => {
    console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
 })