const express = require('express');
const app = express();

let proveedores = [
    { _id: 1, nombre: 'Gas Naturas, S.A', cif: 'A12345678', domicilio: 'Bilbao' },
    { _id: 2, nombre: 'Iberdrola, S.A', cif: 'A87654321', domicilio: 'Madrid' },
    { _id: 3, nombre: 'Planeta D\'Agostini', cif: 'A43218765', domicilio: 'Barcelona' }
]

app.get('/',(req,res) => { // Base path
    res.status(200).json(proveedores);
})

module.exports = app;