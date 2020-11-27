// Wildcard index

// db.<collection>.createIndex({"campo.$**": 1})

// use fabrica

db.productos.insert({
    nombre: "Turbina F-48",
    caracteristicas: {
        tuercas: "F-11",
        chapa: "o-27"
    }
})

db.productos.createIndex({ "caracteristicas.$**": 1 })

// Insertamos nuevos campos en caracteristicas

db.productos.insert({
    nombre: "Turbina F-48C",
    caracteristicas: {
        tuercas: "F-11",
        chapa: "o-27",
        colector: "F-R-12"
    }
})

db.productos.find({ "caracteristicas.colector": "F-R-12" }).explain()


// Indices Geospaciales

// db.<collection>.createIndex(<campo-coordenadas>: "2dsphere")

// use nuevayork

db.restaurantes.createIndex({ "address.cord": "2dsphere" })


// Consulta de proximidad 

// $near

db.restaurantes.find({
    "address.coord": {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [-73.9667, 40.78]
            },
            $minDistance: 100,
            $maxDistance: 500
        }
    }
})


// Consulta acotada

// $geoWithin

db.restaurantes.find({
    "address.coord": {
        $geoWithin: {
            $geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [-73.9667, 40.78],
                        [-74.9667, 40.78],
                        [-74.9667, 41.78],
                        [-73.9667, 41.78],
                        [-73.9667, 40.78],
                    ]
                ]
            }
        }
    }
})


// Indices Hashed (Veremos en Sharding)

// Indices TTL Usar en colecciones (logs o algundato temporal), de manera que borran los registros de manera automatica pasada una cierda cantidad de tiempo o despues de una fecha exacta

// db.<collection>.createIndex(<campo>: 1 | -1), {expireAfterSeconds: <catidad en segundos>}

// Documentos que se eliminan automaticamente tras pasar un tiempo desde su creacion 

// use shop

db.logs.createIndex({ startSesion: 1 }, { expireAfterSeconds: 60 })

db.logs.insert({ user: "Juan", startSesion: new Date() })

// Documentos que se eliminan en una fecha determinada


db.logs.createIndex({ deleteAt: 1 }, { expireAfterSeconds: 0 })

db.logs.insert({ user: "Juan", points: 300, deleteAt: new Date(2020, 10, 26, 20, 12, 00) })


// Indices unicos

// db.<collection>.createIndex(<documento de indice>, {unique: true})

// Uno o varios indices unicos simples

// use clinica

db.clientes.createIndex({ dni: 1 }, { unique: true })
db.clientes.createIndex({ nie: 1 }, { unique: true })

db.clientes.insert({ nombre: "Juan", dni: "44444444P" })
db.clientes.insert({ nombre: "Sech", dni: "44444444P" })

// WriteResult({
//     "nInserted" : 0,
//     "writeError" : {
//             "code" : 11000,
//             "errmsg" : "E11000 duplicate key error collection: clientes.clientes index: dni_1 dup key: { dni: \"44444444P\" }"
//     }
// })

// Si creamos un indice con documentos ya existentes que incumplan el criterio de campo unico, no podra crear el indice => depurar los duplicados



db.clientes.dropIndexes()

db.clientes.insert({nombre: "Juan", dni: '44444444P'})
db.clientes.insert({nombre: "María", dni: '44444444P'})

db.clientes.createIndex({dni: 1},{unique: true}) // Error porque ya existen campos duplicados
// {
//     "ok" : 0,
//     "errmsg" : "Index build failed: 32e568e1-33be-46a3-9c5a-4a93db91e09b: Collection clinica.clientes ( df2532ed-9c54-439c-b605-60c5a294ce0f ) :: caused by :: E11000 duplicate key error collection: clinica.clientes index: dni_1 dup key: { dni: \"44444444P\" }",
//     "code" : 11000,
//     "codeName" : "DuplicateKey",
//     "keyPattern" : {
//             "dni" : 1
//     },
//     "keyValue" : {
//             "dni" : "44444444P"
//     }
// }




// Podemos crear indices multiples unicos

// use shop

db.productos.createIndex({ marca: 1, nombre: 1 }, { unique: true })

// { ...,
//     "nombre" : "Sudadera FTR34",
//     "marca" : "Nike",
//   ...
// }

db.productos.insert({ marca: "Nike", nombre: "Pantalones FG" })
db.productos.insert({ marca: "Nike", nombre: "Sudadera FTR34" })


// Indices unicos y campos inexistentes
// Si tenemos un indice unico para un campo, solo podremos tener un documento
// que no contenga ese campo (a ese documento, MongoDB la crea el campo y le asigna el valor null)

db.clientes.remove()

db.clientes.createIndex({dni:1},{unique:true})

db.clientes.remove({nombre: "Laura", apellidos:"Perez"})
WriteResult({"nInserted": 1})

db.clientes.remove({nombre: "Javier", apellidos:"Gonzalez"})
WriteResult({})


// Indices parciales 
// db.<collection>.createIndex(<documento>,{partialFilterExpression: <expresion>})
// La expresion que flitrará los documentos que seran introducidos en el indice

db.clientes.dropIndexes()

db.clientes.createIndex({apellidos: 1}, {partialFilterExpression: {creadoEl: {$gte: new Date(2015, 0, 1)}}})

db.clientes.insert([
    {apellidos: "Fernandez", nombre: "Juan", creadoEl: new Date()},
    {apellidos: "Gomez", nombre: "Laura", creadoEl: new Date(2013, 2, 2)},
])

db.clientes.find({apellidos: "Fernandez"}).explain()


// Indices sparse (escasos), no incluye los documentos que no tengan el campo indicado en el indice

// db.<collection>.createIndex(<documento>, {sparse: true})

// use maraton

db.participantes.insert([
    {nombre: "Juan", apellidos: "Perez", dni: "2233444F"},
    {nombre: "Laura", apellidos: "Perez"}
])

db.participantes.createIndex({dni: 1}, {sparse: true})

// Para comprobar

db.participantes.find().sort({dni: 1}).hint({dni: 1}) // Forzar al uso del indice