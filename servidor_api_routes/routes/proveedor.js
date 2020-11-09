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



app.get('/consulta', (req, res) => { // Equivale a http://dominio/proveedor/consulta
    console.log(req.query);
    res.status(200).json({ ok: true });
})

// Get con parametros en la url (ruta/parametro1/parametro2.....)

app.get('/consulta_unica/:_id', (req, res) => {
    let proveedor = proveedores.find(e => {
        return e._id == req.params._id;
    })

    if (proveedor === undefined) {
        return res.status(404).json({ mensaje: 'No se encontró ningun proveedor con id: ' + req.params._id })
    }
    res.status(200).json(proveedor);
})


app.get('/prov*', (req, res) => {
    res.status(200).json({ mensaje: 'Responde a los get de cualquier ruta que comience por prov' });
})

app.get('/*', (req, res) => {
    res.status(200).json({ mensaje: 'Error en el endpoint' });
})


// Post para crear registros

app.post('/', (req, res) => {
    let proveedor = req.body;
    proveedor._id = proveedores.length + 1;
    proveedores.push(proveedor);
    res.status(201).json({ mensaje: `El proveedor ${proveedor.nombre} ha sido registrado` });
    console.log(proveedores);
})

// Put para actualizar registros
app.put('/:_id', (req, res) => {
    let posicion = proveedores.findIndex(e => {
        return e._id == req.params._id;
    })

    if (posicion < 0) { return res.status(404).json({ mensaje: `El proveedor no existe` }) };
    if (req.body.nombre !== undefined) { proveedores[posicion].nombre = req.body.nombre };
    if (req.body.cif !== undefined) { proveedores[posicion].cif = req.body.cif };
    if (req.body.domicilio !== undefined) { proveedores[posicion].domicilio = req.body.domicilio }

    res.status(201).json({ mensaje: `El proveedor ${proveedores[posicion].nombre} ha sido actualizado` })
    console.log(proveedores);
})

app.delete('/:_id', (req, res) => {
    let posicion = proveedores.findIndex(e => {
        return e._id == req.params._id;
    })

    res.status(201).json({ mensaje: `El proveedor ${proveedores[posicion].nombre} ha sido eliminado` })

    if (posicion < 0) { return res.status(404).json({ mensaje: `El proveedor no existe` }) };
    proveedores.splice(posicion,1);

    
    console.log(proveedores);
})

module.exports = app;