// Introduccion a los indices en MongoDB

// Los Indices son a nivel de coleccion

// Crear indices createIndex()
// db.<collection>.createIndex({campo:1 | -1, ...}, opciones)

db.clientes.createIndex({apellidos:1}) // Indice simple

db.clientes.createIndex({apellidos:1}, {name: "Consultas por apellido"}) // Se le puede añadir un name para a la hora de tener que buscarlo

// Ver indices de una coleccion getIndexes()

db.clientes.getIndexes()


// Eliminar indice de una coleccion dropIndex(<nombre>,{campo: 1 | -1, ....})

db.clientes.dropIndex("apellidos_1")


// Eliminar todos los indices

db.clientes.dropIndexes()  // Elimina todos excepto el de _id que no se puede eliminar
