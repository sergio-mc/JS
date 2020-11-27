// Ordenación de resultados en memoria

db.participantes.dropIndexes()

// Con índices simples no nos influye el sentido del índice

db.participantes.createIndex({dni: 1}) 

db.participantes.find().sort({dni: 1})  // Si la ordenación tiene el campo no es necesario usar memoria para ordenar

db.participantes.find().sort({dni: -1}) // Idem y no pasa nada porque el sentido sea diferente

db.participantes.find().sort({edad: -1}) // En este caso ya tiene que usar la memoria para ordenar 

// Con índices múltiples

db.participantes.createIndex({apellido1: 1, edad: -1}) // Aquí influye tanto el prefijo como el sentido de cada campo
                                            // no sera necesario ordenar en memoria si el sentido de todos los campos
                                            // coincide con el del índice o si todos son el sentido contrario


db.participantes.createIndex({apellido1: 1, edad: -1, nombre: 1})