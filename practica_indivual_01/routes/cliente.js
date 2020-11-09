const express = require('express');
const app = express();

let clientes = [];

app.get('/', (req, res) => { // Base path
    res.status(200).json(clientes);
})

app.post('/', (req, res) => {
    if (req.body._id === undefined) {
        return res.status(200).json({
            mensaje: `No se ha introducido una _id valida`
        })
    };
    if (req.body.nombre === undefined) {
        return res.status(200).json({
            mensaje: `No se ha introducido un nombre valido`
        })
    };
    if (req.body.cif === undefined) {
        return res.status(200).json({
            mensaje: `No se ha introducido una cif valida`
        })
    };
    if (req.body.domicilio === undefined) {
        return res.status(200).json({
            mensaje: `No se ha introducido un domicilio valido`
        })
    }
    let cliente = {
        _id: req.body._id,
        nombre: req.body.nombre,
        domicilio: req.body.domicilio,
        cif: req.body.cif,
    }

    if (cliente === undefined) {
        return res.status(200).json({
            mensaje: `Campos invalidos, no se ha podido crear el cliente`
        })
    }

    clientes.push(cliente);
    res.status(200).json({
        mensaje: `Cliente ${cliente.nombre} ha sido creado`
    })
    console.log(clientes)

})

// Put para actualizar registros
app.put('/:_id', (req, res) => {
    let posicion = clientes.findIndex(e => {
        return e._id == req.params._id;
    })

    if (posicion < 0) { return res.status(404).json({ mensaje: `El cliente no existe` }) };
    if (req.body.nombre !== undefined) { clientes[posicion].nombre = req.body.nombre };
    if (req.body.cif !== undefined) { clientes[posicion].cif = req.body.cif };
    if (req.body.domicilio !== undefined) { clientes[posicion].domicilio = req.body.domicilio }

    res.status(201).json({ mensaje: `El cliente ${clientes[posicion].nombre} ha sido actualizado` })
    console.log(clientes);
})

app.delete('/:_id', (req, res) => {
    let posicion = clientes.findIndex(e => {
        return e._id == req.params._id;
    })
    

    if (posicion < 0) { return res.status(404).json({ mensaje: `El cliente no existe` }) };
    res.status(201).json({ mensaje: `El cliente ha sido eliminado` })

    clientes.splice(posicion, 1);
    console.log(clientes);
})

module.exports = app;