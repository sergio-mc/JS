// Operaciones de Inserccion en MongoDB

// Metodo insert()
// Sintaxis

// db.<collection>.insert({
//     <documento o array de documentos>,
//     {
//         writeConcern: <documento>, // Relativo a replica set
//         ordered: <true> o <false>
//     }
// })


// Insertar un documento en coleccion sin _id

db.usuarios.insert({ nombre: "Sergio", apellidos: "Marron", edad: 20 })
WriteResult({ "nInserted": 1 })

// Insertar un documento en coleccion con _id

db.usuarios.insert({ nombre: "Sergio", apellidos: "Marron", edad: 20, _id: 2 })

// Insertar multiples documentos

db.usuarios.insert([
    { _id: 4, nombre: "Pilar", apellidos: "Calle", edad: 20 },
    { _id: 3, nombre: "Carol", apellidos: "Sanchez", edad: 20 },
])

// Insertar multiples documentos con ordered true (valor por defecto)
// (Las inserciones multiples no tienen roll-back si se produce un error)

db.usuarios.insert([
    { _id: 10, nombre: "Pilar", apellidos: "Calle", edad: 20 },
    { _id: 11, nombre: "Carol", apellidos: "Sanchez", edad: 20 },
    { _id: 11, nombre: "Carol", apellidos: "Sanchez", edad: 20 },
    { _id: 12, nombre: "Carol", apellidos: "Sanchez", edad: 20 },
    { _id: 13, nombre: "Carol", apellidos: "Sanchez", edad: 20 },
])

// Insertar multiples documentos con ordered false

db.usuarios.insert([
    { _id: 20, nombre: "Pilar", apellidos: "Calle", edad: 20 },
    { _id: 21, nombre: "Pepe", apellidos: "Sanchez", edad: 20 },
    { _id: 21, nombre: "Carol", apellidos: "Sanchez", edad: 20 },
    { _id: 22, nombre: "Carol", apellidos: "Sanchez", edad: 20 },
    { _id: 23, nombre: "Carol", apellidos: "Sanchez", edad: 20 },
], { ordered: false })

// Ver de nuevo tipo de datos para _id (cualquiera menos de array)

// Tipo de dato Date

db.usuarios.insert({ nombre: "Sergio", createdAt: new Date() })


// Los documentos pueden tener varios niveles de anidado con limite de 100

db.usuarios.insert({
    nombre: "Carol",
    direcciones: [
        {
            calle: "Principe pio", localidad: {
                nombre: "Madrid",
                cp: "28010"
            }
        },
        {
            calle: "Av Aviacion", localidad: {
                nombre: "Getafe",
                cp: "28981"
            }
        }
    ]
})


// Metodos alternativos insertOne() e insertMany()

// Sintaxis insertOne()

// db.<collection>.insertOne({
//     <documento>,
//     {
//         writeConcern: <documento>, // Relativo a replica set
//     }
// })


// Sintaxis insertMany()

// db.<collection>.insertMany({
//     <array de documentos>,
//     {
//         writeConcern: <documento>, // Relativo a replica set
//         ordered: <true> o <false>
//     }
// })

// Todo exactamente igual que insert() para cada caso uno o multiples documentos excepto que insertOne() e insertMany() no soportan el metodo explain() para la comprobacion de indices.


// Metodo save(), realiza tanto operaciones de insercion como de actualizacion (*poco utilizado*)

// Sintaxis 

// db.<collection>.save({
//     <documento>,
//     {
//         writeConcern: <documento>, // Relativo a replica set
//     }
// })

// Si el documento pasado tiene un _id que no existe crea el documento y si el _id ya existe en la coleccion lo sustituye

db.usuarios.save({ _id: 30, nombre: "Carolina", apellidos: "Sanchez", edad: 21 })


// Metodos adicionales para insertar 

// db.<collection>.update()
// db.<collection>.updateOne()
// db.<collection>.updateMany()
// db.<collection>.findAndModify()
// db.<collection>.findOneAndUpdate()
// db.<collection>.findOneAndReplace()

// db.<collection>.bulkWrite()








