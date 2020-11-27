// Planes de consulta

// La forma en la que Mongo utiliza los indices

// Query optimizer

// Plan cache
// - Se puede vaciar manualmente
// - Reinicia cuando se cae el servidor
// - Se va actualizando cuando se borra un indice o se crea uno nuevo

// Metodo explain() -> Nos devuelve de una consulta los datos de uso de indices

// db.<collection>.find(<consulta>).explain(<modo verbosidad>)
// Verbosidad
//      - queryPlaner por defecto. Devuelve la informacion del plan ganador (de las etapas de indices que se efectuaran)
//      - executionStats. Lo mismo del anterior pero ejecuta el plan ganador
//      - allPlansExecution. Devuelve la informacion de todos los planes incluyendo los no ejecutados

db.participantes.find({dni: "43121710A"}).explain("allPlansExecution") // Etapa collscan porque no hay ningun indice para esa forma de consulta

db.participantes.createIndex({dni: 1})


// Uso de varios indices simples

db.participantes.createIndex({apellido1: 1})

db.participantes.createIndex({edad: 1})

db.participantes.find({apellido1: "Nadal", edad: {$gte: 18}}).explain("allPlansExecution")


// Interseccion de indices

db.participantes.find({
    $or: [
        {apellido1: "Nadal", edad: {$gte: 18}},
        {edad: 45}
    ]
}).explain("allPlansExecution")

// Indices compuestos

db.participantes.dropIndexes()

db.participantes.createIndex({edad:1, apellido1: 1})

db.participantes.find({edad: {$gte: 18}}).explain("allPlansExecution")

db.participantes.find({apellido1: "Nadal"}).explain("allPlansExecution") // No utiliza el indice por el campo no es prefijo del indice

// Prefijo

// {edad: <expresion>, apellido1: <expresion>}

// {apellido1: <expresion>, edad: <expresion>}

// {apellido1: <expresion>, edad: <expresion>, } Para el uso del índice no influye el orden