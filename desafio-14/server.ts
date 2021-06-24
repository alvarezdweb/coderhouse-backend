import express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    return res.send('Bienvenido al servidor express.js')
});

const PUERTO:number = 8080;

const server = app.listen( PUERTO, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});

server.on('error', error => {
    console.log('error en el servidor', error);
});