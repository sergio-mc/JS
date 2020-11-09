const express = require('express');
const app = express();

let pedidos = [
    { _id: 1, cliente: 'Sergio', importe: 500 },
    { _id: 2, cliente: 'Alex', importe: 100 },
    { _id: 3, cliente: 'Carol', importe: 20 },
]

app.get('/', (req, res) => {
    res.status(200).json(pedidos);
})

module.exports = app;