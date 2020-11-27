// Indices y colacion

db.participantes.dropIndexes()

// La colacion se puede establecer a nivel de indice

db.participantes.createIndex({nombre:1}, {collation: {locale: "es", strength: 1}})

// Si pasamos la consulta sin especificar la colacion no usará el indice

db.participantes.find({nombre: "Carol"})

// Para que use la colacion deberemos especificarla en la consulta (tiene que ser el mismo lenguaje de la colacion)

db.participantes.find({nombre:"Carol"}).collation({locale: "es", strength: 1}) // Si utilizara el indice y ademas tendremos las funcionalidades especificada en este caso mayus/minus y diacriticos


// Cuando la colacion es establece a nivel de coleccion se utilizaran los indices siempre que la consulta sea de la misma colacion

db.createCollection("jueces", {collation: {locale: "es", strength: 1}})

db.jueces.insert({nombre:"Juan",apellidos:"Lopez"})

db.jueces.createIndex({nombre:1})

db.jueces.find({nombre:"juan"}) // Utilizaria el indice aunque no se especifique la colacion

db.jueces.find({nombre:"juan"}).collation({locale:"en", strength:1}) // No utilizaria el indice porque la colacion es diferente