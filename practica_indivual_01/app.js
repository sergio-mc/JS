const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const port = 3000;

const cliente = require('./routes/cliente'); 
const producto = require('./routes/producto'); 

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/cliente',cliente);
app.use('/producto',producto);

app.listen(port, () => {
    console.log('Servidor escuchando en http://localhost:' + port);
})