const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const port = 3000;

const proveedor = require('./routes/proveedor'); // No hace falta el .js
const pedido = require('./routes/pedido');
const usuario = require('./routes/usuario');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/proveedor',proveedor);
app.use('/pedido',pedido);
app.use('/usuario',usuario);

app.listen(port, () => {
    console.log('Servidor escuchando en http://localhost:' + port);
})