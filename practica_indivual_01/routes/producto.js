const express = require('express');
const app = express();

let productos = [];

app.get('/', (req, res) => { // Base path
    res.status(200).json(productos);
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
    if (req.body.categoria === undefined) {
        return res.status(200).json({
            mensaje: `No se ha introducido una categoria valida`
        })
    };
    if (req.body.stock === undefined) {
        return res.status(200).json({
            mensaje: `No se ha introducido un stock del producto valido`
        })
    }
    if (req.body.codigo === undefined) {
        return res.status(200).json({
            mensaje: `No se ha introducido un codigo valido`
        })
    }
    let producto = {
        _id: req.body._id,
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        stock: req.body.stock,
        codigo: req.body.codigo
    }

    if (producto === undefined) {
        return res.status(200).json({
            mensaje: `Campos invalidos, no se ha podido crear el producto`
        })
    }

    productos.push(producto);
    res.status(200).json({
        mensaje: `producto ${producto.nombre} ha sido creado`
    })
    console.log(productos)

})

// Put para actualizar registros
app.put('/:_id', (req, res) => {
    let posicion = productos.findIndex(e => {
        return e._id == req.params._id;
    })

    if (posicion < 0) { return res.status(404).json({ mensaje: `El producto no existe` }) };
    if (req.body.nombre !== undefined) { productos[posicion].nombre = req.body.nombre };
    if (req.body.categoria !== undefined) { productos[posicion].categoria = req.body.categoria };
    if (req.body.stock !== undefined) { productos[posicion].stock = req.body.stock }
    if (req.body.codigo !== undefined) { productos[posicion].codigo = req.body.codigo }

    res.status(201).json({ mensaje: `El producto ${productos[posicion].nombre} ha sido actualizado` })
    console.log(productos);
})

app.delete('/:_id', (req, res) => {
    let posicion = productos.findIndex(e => {
        return e._id == req.params._id;
    })
    

    if (posicion < 0) { return res.status(404).json({ mensaje: `El producto no existe` }) };
    res.status(201).json({ mensaje: `El producto ha sido eliminado` })

    productos.splice(posicion, 1);
    console.log(productos);
})

module.exports = app;