const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const port = 3000;

const proveedor = require('./routes/proveedor'); // No hace falta el .js

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/proveedor',proveedor);

app.listen(port, () => {
    console.log('Servidor escuchando en http://localhost:' + port);
})