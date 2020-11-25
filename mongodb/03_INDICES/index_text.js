// Indices de texto

// Creacion
// db.<collection>.createIndex({<campo>: "text"})

db.libros.createIndex({ autor: "text" })

// Uso del indice $search y $text

db.libros.find({ $text: { $search: "Ende" } }) // No se especifica el campo porque no podemos tener mas de un indice de texto en la misma coleccion


// Limite solo podemos tener un indice de texto por coleccion pero podemos tener indices de texto multiples


db.libros.createIndex({ titulo: "text" }) // Error si intento crear otro

db.libros.dropIndexes() // los eliminamos


// Si podemos tener un indice texto con todos los campos en los que queramos utilizar estas funcionalidades

db.libros.createIndex({ autor: "text", titulo: "text" })


// Las consultas buscaran los terminos en todos los campos del indice

db.libros.find({ $text: { $search: "Ende" } })

db.libros.insert({ titulo: "Biografia de Ende", autor: "John Doe" })


// Wildcard Text index

db.libros.createIndex({ "$**": "text" }) // Crea indice de texto sobre todos los campos incluso los nuevos campos que se creen en registros posteriores a la creacion del indice


// Se pueden hacer sobre campos de subdocumentos

db.clientes.createIndex({ "direccion.$**": text })

// direccion.calle direccion.cp direccion.localidad direccion.provincia  amplias el modelo de direccion.diasEntrega