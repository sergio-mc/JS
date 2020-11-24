// Metodos para iterar cursor (donde son devueltos los docs de las consultas)

// hasNext() -> devuelve boolean true mientras existan documentos en el cursor

// next() -> leer el siguiente documento del cursor

// print()

// tojson() -> parsear a json

// toArray() -> convertir la slaida del cursor en un array

// Para utilizar en la shell de mongo (conjuntamente con JavaScript)


while (clientes2.hasNext()) {
    print(tojson(clientes2.next()))
}

let clientes3 = db.clientes.find()
let arrayClientes = clientes3.toArray()
arrayClientes[1]
// {
//     "_id" : ObjectId("5fb6c7ac4af17ece8f8281ed"),
//         "nombre" : "Fran",
//             "apellidos" : "Mencia",
//                 "domicilio" : {
//         "calle" : "Alfonso",
//             "cp" : "28985",
//                 "localidad" : "Madrid"
//     }
// }


// Metodo count() 
// db.<collection>.find(<consulta>).count()  // Devuelve entero con el numero de documentos devueltos por la consulta

db.clientes.find({nombre: "Fran"}).count()


// Metodo limit()
// db.<collection>.find(<consulta>).limit(<entero>)  // Limita el cursor entero especificado

db.clientes.find().limit(5)


// Metodo skip()
// db.<collection>.find(<consulta>).skip(<entero>)  // Omite los documentos especificadios por el entero

db.clientes.find().skip(2)

db.clientes.find().skip(10).limit(10)


// Metodo sort()
// db.<collection>.find(<consulta>).sort(<documento>)

// {campo1: 1 | -1, campo2: 1 | -1, ...}

db.clientes.find({}, {apellidos: 1, nombre: 1, _id: 0}).sort({apellidos: -1})  // Un solo campo


// Metodo distinct

// db.<collection>.distinct(<campo>,<consulta>,<opciones>) // Opcion es colacion

db.clientes.distinct("apellidos") // Devolver todos los valores distintos de apellidos
