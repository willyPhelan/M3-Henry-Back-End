const express = require('express');
const app = express();

//const cors = require('cors');

//Habilito todas las solicitudes CORS
//app.use(cors());


//Configuro opciones para el middleware del módulo 'cors'. Si no cambio nada, estas son las opciones que toma por default:
var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//Seteamos headers para la respuesta que le enviamos al cliente
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); //Autorizo recibir solicitudes de este dominio
    res.header('Access-Control-Allow-Credentials', true); //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //Autorizo recibir solicitudes con dichos hedears
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
    next();
});


app.get('/second-server', (req, res, next) => {
    res.send({ data: "No encontramos resultados" })
})

//Habilito CORS para una ruta en particular
// app.get('/example-route', cors(),  (req, res, next) => {
//     res.sendStatus(200)
// })


//Habilito CORS para una ruta en particular pasándole las opciones que definí
// app.get('/example-route', cors(corsOptions),  (req, res, next) => {
//     res.sendStatus(200)
// })


app.listen(3004, () => {
    console.log('Port 3004, Ready!')
});