// Operaciones de Lectura en MongoDB

// Metodo find()

// Sintaxis

// db.<collection>.find({
//     <documento-de-consulta>,
//     <documento-de-proyeccion>
// })

// Todos los documentos de la coleccion (en un cursor con 20 docs. max.)

// db.<collection>.find() 
// db.<collection>.find({})


// **Set de datos para insertar en una base de datos gimnasio**

db.clientes.insert([
    { nombre: "Carolina", apellidos: "Sanchez", dni: "0561465X" },
    { nombre: "Pepe", apellidos: "Lopez", dni: "8161465B" },
    { nombre: "Pepe", apellidos: "Garcia", dni: "3561465Z" },
])

// Especificación de condicion de igualdad 
// {<campo>:<valor>, ...}

db.clientes.find({ nombre: "Pepe" })

db.clientes.find({ nombre: "Pepe", apellidos: "Lopez" })

db.clientes.find({ _id: "5fb6b5e04af17ece8f8281e2" }) // No buscaria por _id, seguiria buscando por el string.

db.clientes.find({ _id: ObjectId("5fb6b5e04af17ece8f8281e2") }) // Si encuentra cuando pasamos como ObjectId()


// Especificacion de condiciones usando operadores de consulta
// Sintaxis basica de operadores ($)
// { <campo> : { <operador1> : <valor>, ... } }

db.clientes.insert({ nombre: "Carolina", apellidos: "Sanchez", clases: ["aerobic", "zumba"] }) // Insert para ejemplo de operadores
db.clientes.insert({ nombre: "Sergio", apellidos: "Marron", clases: ["padel", "zumba"] }) // Insert para ejemplo de operadores

db.clientes.find({ clases: { $in: ["zumba", "aerobic"] } })


// Especificacion de condiciones AND
// 1ª forma que es con las condiciones de igualdad

db.clientes.find({ nombre: "Pepe", apellidos: "Lopez" }) // la coma funciona como AND logico

db.clientes.insert([
    { nombre: "Carolina", apellidos: "Sanchez", edad: 21 },
    { nombre: "Pepe", apellidos: "Lopez", edad: 17 },
    { nombre: "Pepe", apellidos: "Garcia", edad: 22 },
])


db.clientes.find({ nombre: "Pepe", edad: { $gt: 20 } })

db.clientes.find({ edad: { $gte: 18 }, edad: { $lt: 30 } }) // Ojo OR inclusivo si aparece el mismo campo varias veces
db.clientes.find({ edad: { $gte: 18, $lt: 30 } })

// 2ª Forma con el operador $and 

db.clientes.find({ $and: [{ edad: { $gte: 18 } }, { edad: { $lt: 30 } }] })


// Especificacion de condiciones OR
// Empleamos el operador $or : [ { documento }, {documento}, ... ]

db.clientes.find({ $or: [{ nombre: "Pepe" }, { edad: { $gte: 20 } }] })

db.clientes.find({ $or: [{ nombre: "Pepe", apellidos: "Perez" }, { edad: { $gte: 20 } }] })


// Combinar AND y OR

db.clientes.find({        // Tiene apellidos Sanchez (y) (o tiene edad >= 18 | o tiene nombre: Carolina)
    apellidos: "Sanchez",
    $or: [
        { edad: { $gte: 18 } },
        { nombre: "Carolina" },
    ]
})


// Coincidencias en documentos embebidos

// set de datos

db.clientes.insert([
    {
        nombre: "Alberto",
        apellidos: "Marron",
        domicilio: {
            calle: "Leganes",
            cp: "28981",
            localidad: "Madrid"
        }
    },
    {
        nombre: "Fran",
        apellidos: "Mencia",
        domicilio: {
            calle: "Alfonso",
            cp: "28985",
            localidad: "Madrid"
        }
    },
    {
        nombre: "Isabel",
        apellidos: "Quintanar",
        domicilio: {
            calle: "Finisterre",
            cp: "28900",
            localidad: "Yuncos"
        }
    }
])


db.clientes.find({ domicilio: { calle: "Leganes", cp: "28981", localidad: "Madrid" } }) // El orden de los campos al ser el mismo del documento anidado o embebido lo encuentra

db.clientes.find({ domicilio: { cp: "28981", calle: "Leganes", localidad: "Madrid" } }) // Si el orden de los campos no es el mismo del documento aninado o embebido no encuentra coincidencia porque lo que busca es el valor del literal de objeto


// Coincidencias en campos de documentos embebidos
// Acceso a campos con notacion del punto "campo.campoDocumento"

// Consulta de igualdad 

db.clientes.find({ "domicilio.localidad": "Madrid" })

db.clientes.find({ "domicilio.localidad": "Madrid", "domicilio.cp":"28981"})


// Coincidencias en Arrays

// Coincidencias en valor completo en Array

db.clientes.find({clases: ["aerobic","zumba"]}) // Igualdad exacta del array
db.clientes.find({clases: ["zumba","aerobic"]}) // Al no ser igual que el array no encuentra nada

// Coincidencias en los elementos del Array (usando operadores)

// Operador $all, El campo contenga al menos todos los elementos descritos en la consulta

db.clientes.insert(
    {
        nombre:"Raquel",
        apellidos:"Gutierrez",
        clases: ["padel","esgrima","pesas"]
    }
)

db.clientes.find({clases: {$all: ["esgrima","padel","pesas"]}})
db.clientes.find({clases: {$all: ["padel","pesas"]}})

