// Indice simple

db.clientes.createIndex({apellidos:1})

db.clientes.createIndex({"direccion.calle": 1}) // Se pueden crear sobre campos embebidos


// Indices compuestos

db.clientes.createIndex({apellidos:1, nombre: -1})  // Influye el orden de los campos (prefijo) y el sentido de cada campo

