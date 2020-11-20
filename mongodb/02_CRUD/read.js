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

db.clientes.find({ "domicilio.localidad": "Madrid", "domicilio.cp": "28981" })


// Coincidencias en Arrays

// Coincidencias en valor completo en Array

db.clientes.find({ clases: ["aerobic", "zumba"] }) // Igualdad exacta del array
db.clientes.find({ clases: ["zumba", "aerobic"] }) // Al no ser igual que el array no encuentra nada

// Coincidencias en los elementos del Array (usando operadores)

// Operador $all, El campo contenga al menos todos los elementos descritos en la consulta

db.clientes.insert(
    {
        nombre: "Raquel",
        apellidos: "Gutierrez",
        clases: ["padel", "esgrima", "pesas"]
    }
)

db.clientes.find({ clases: { $all: ["esgrima", "padel", "pesas"] } })
db.clientes.find({ clases: { $all: ["padel", "pesas"] } })


// Consulta de valor de elemento en un array. Si el valor o condicion pasada se cumple en uno de los elementos del array se devuelve ese documento en la consulta

db.clientes.find({ clases: "padel" })

db.clientes.insert([
    { nombre: "Maria", apellidos: "Garcia", puntuaciones: [100, 120, 44] },
    { nombre: "Fernando", apellidos: "Garcia", puntuaciones: [60, 90, 70] }
])

db.clientes.find({ puntuaciones: { $lte: 50 } }) // Al menos un elemento del array cumpla la condicion


// Consulta de multiples condiciones en elementos de array

db.clientes.find({ puntuaciones: { $gte: 50, $lt: 75 } }) // Al menos un elemento del array o una combiacion de varios elementos deben cumplir todas las condiciones


// Consulta de multiples condiciones en un solo elemento del array

db.clientes.find({ puntuaciones: { $elemMatch: { $gte: 50, $lt: 75 } } }) // Al menos un elemento del array debe cumplir todas las condiciones


// Consultas por la posiicon de un elemento del array. (Notacion del punto con el indice del array)

db.clientes.find({ "clases.0": "padel" }) // Buscara los que en la posicion 0 del array tenga el valor o la expresion


// Consultas de documentos con array con un determinado numero de elementos

db.clientes.find({ clases: { $size: 3 } })


// Consultas de documentos en array

db.clientes.insert([
    {
        nombre: "Oriana",
        apellidos: "Garcia",
        direcciones: [
            { calle: "Alcala 40", cp: "28001", localidad: "Madrid" },
            { calle: "Zamora 12", cp: "34005", localidad: "Vigo" }
        ]
    },
    {
        nombre: "Sylvanas",
        apellidos: "Gomez",
        direcciones: [
            { calle: "Alcala 60", cp: "28001", localidad: "Madrid" },
            { calle: "Zamora 24", cp: "34005", localidad: "Vigo" }
        ]
    },
])

// Consulta de igualdad de campo de tipo array de documentos

db.clientes.find({     // El valor como ocurre con documentos y arrays de primitivos debe ser exactamente igual incluyendo orden
    direcciones: [
        { calle: "Alcala 40", cp: "28001", localidad: "Madrid" },
        { calle: "Zamora 12", cp: "34005", localidad: "Vigo" }
    ]
})


// Consulta en un campo de un documento de un array de documentos 

db.clientes.find({ "direcciones.localidad": "Madrid" }) // Devuelve los documentos en los que, al menos uno de sus subdocumentos del array de direcciones contiene campo localidad con valor Madrid


// Consulta en un campo de un documento en una determinada posicion de un array de documentos (notacion del punto)


db.clientes.find({ "direcciones.1.localidad": "Madrid" }) // Devuelve los documetnso en los que el segundo subdocumento del array direcciones el campo localidad con valor Madrid


// Especificar multiples condiciones en arrays de documentos

db.monitores.insert([
    {
        nombre: "Diana",
        apellidos: "Lopez",
        actividades: [
            { clase: "aerobic", turno: "mañana", homologado: false },
            { clase: "aerobic", turno: "tarde", homologado: false },
            { clase: "zumba", turno: "mañana", homologado: true },

        ]
    },
    {
        nombre: "Carol",
        apellidos: "Nuñez",
        actividades: [
            { clase: "aerobic", turno: "tarde", homologado: true },
            { clase: "zumba", turno: "tarde", homologado: false },
        ]
    },
])

// Varios subdocumentos del array pueden en combinacion cumplir todas las condiciones

db.monitores.find({ "actividades.clase": "aerobic", "actividades.homologado": true })

// Uno de los subdocumentos del array debe cumplir todas las condiciones

db.monitores.find({ actividades: { $elemMatch: { clase: "aerobic", homologado: true } } })


// Proyeccion de documentos 

// db.<collection>.find({consulta},{proyeccion})

// Devuelve todos los campos si no se introduce el documento de proyeccion

// Para devolver los campos especificadosy el campo _id

db.clientes.find({ puntuaciones: { $gte: 18 } }, { nombre: 1, apellidos: 1 }) // Devolvera los documentos encontrados el campo nombre, appelidos y _id

db.clientes.find({}, { nombre: 1 }) // Devolvera todos los elementos con el campo nombre y _id


// Devolucion sin el campo _id

db.clientes.find({ puntuaciones: { $gte: 18 } }, { _id: 0, nombre: 1, apellidos: 1 }) // Con el valor 0 excluimos el campo _id

db.clientes.find({}, { _id: 0, nombre: 0, apellidos: 0 }) // Con el valor 0 excluimos todos los campos introducidos



// Combinacion de inclusion y exclusion de campos: No se pueden incluir y excluir campos en el mismo documento de proyeccion a excepcion de campo _id

db.clientes.find({}, { _id: 0, nombre: 1, apellidos: 0 }) // Error

db.clientes.find({}, { _id: 1, nombre: 0, apellidos: 0 }) // Valido



// Campos especificos en subdocumentos embebidos

db.clientes.find({}, { nombre: 1, "domicilio.calle": 1, _id: 0 }) // Devolvera el campo nombre y el campo calle de los subdocumentos del campo domicilio (mantiene la estructura)

db.clientes.find({}, { "domicilio.calle": 0, _id: 0 }) // Elimina del documento del campo domicilio su campo calle


// Campos especificos en arrays de documentos 

db.clientes.find({}, { "direcciones.localidad": 1, _id: 0 }) // Devolvera el campo localidad de cada documento del array direcciones


// Consultas para campos con valor null o campos inexistentes 

db.monitores.insert({ nombre: "Sergio", apellidos: "Marron" })
db.monitores.insert({ nombre: "Sara", apellidos: "Gonzalez", actividades: null })

// Cuando pasamos en la consulta un valor de igualdad null devuelve los documentos con ese campo y valor null y tambien los documentos que no tengan ese campo

db.monitores.find({ actividades: null })


// Si necesitamos estrictamente los que tiene valor null 

db.monitores.find({ actividades: { $type: 10 } })

// o bien

db.monitores.find({ actividades: { $type: "null" } }) // Ref operador para ver los tipos  https://docs.mongodb.com/manual/reference/operator/query/


// Consulta para comprobacion de existencia de campos


db.monitores.find({ actividades: { $exists: true } }) // Devolver los documentos que contengan el campo actividades



// Metodo findOne() 

// Sintaxis

// db.<collection>.findOne({consulta},{proyeccion})

// Devuelve el primer resultado de la consulta 

// Se usa mucho a nivel DBA o DEV para comprobar el modelo de una coleccion (devuelve pretty)

db.clientes.findOne({ nombre: "Sylvanas" })


// Operadores de comparacion 


// $gte: >=  
// $gt:  >
// $lte: <=
// $lt: <
// $eq:

db.clientes.find({ nombre: { $eq: "Sylvanas" } }) // Equivalente a la asignacion "directa"

// $in recibe un array con las posibles coincidencias y funciona como un OR lógico

db.clientes.find({ clases: { $in: ["zumba", "pesas"] } }) // Devolverá los documentos en los que el campo clase tenga zumba o pesas

db.clientes.find({ nombre: { $in: ["Oriana", "Fernando"] } }) // Aunque se suele usar en arrays, tambien se puede usar con campos con otros tipos


// Uso de expresiones regulares

db.clientes.find({ clases: { $in: ["zumba", /^p/] } }) // Devuelve los documentos que tengan en el campo clases el valor zumba o el cualquier valor que cumpla la expresion regular.


// Advertencia: $in no es compatible con el operador $regex

// $ne

db.clientes.find({ apellidos: { $ne: "Garcia" } }) // Devolvera los documentos en los que appelidos no sean igual a Garcia y los que no tenga el campo apellidos

db.clientes.find({ apellidos: { $ne: "Garcia" }, apellidos: { $exists: true } }) // Excluye los que no tengan el campo apellidos

// $nin

db.clientes.find({ nombre: { $nin: ["Raquel", "Oriana"] } }, { _id: 0, nombre: 1 }) // Devuelve todos los que no se llamen Raquel o no se llamen Oriana

db.clientes.find({ nombre: { $ne: "Oriana", $ne: "Fran" } }, { _id: 0, nombre: 1 }) // Devuelve todos los que no se llamen Fran porque en el segundo parametro machaca el valor Oriana

db.clientes.find({ $and: [{ nombre: { $ne: "Oriana" } }, { nombre: { $ne: "Fran" } }] }, { _id: 0, nombre: 1 }) // Si devuelve todos los que no se llamen Fran u Oriana


// Operadores logicos

// $and

// Recibe arrays con las expresiones que necesitamos

db.clientes.find({ $and: [{ nombre: { $ne: "Oriana" } }, { nombre: { $ne: "Fran" } }] }, { _id: 0, nombre: 1 })

// $or

db.clientes.find({ $or: [{ edad: { $gte: 18 } }, { nombre: "Oriana" }], edad: { $exists: true } }) // Devuelve los clientes que tengan edad >= 18 o que se llamen Oriana


// $not -> Devuelve los que no cumplen la expresion que se le pasa al operador

db.clientes.find({ edad: { $not: { $gte: 18 } } }, { _id: 0, nombre: 1, edad: 1 }) // Devuelve los que no tengan el campo

db.clientes.find({ edad: { $lit: 18 } }, { _id: 0, nombre: 1, edad: 1 }) // No devuelve los que no tengan el campo


// $nor -> Recibe array de expresiones. Selecciona los documentos que incumplen alguna de las expresiones

db.clientes.find({
    $nor: [
        { edad: { $lt: 18 } },
        { nombre: "Pepe" },
    ]
}, { _id: 0, edad: 1, nombre: 1 })

// o

db.clientes.find({$nor: [{nombre:"Pepe"},{nombre:"Fernando"}]},{_id:0, nombre:1}) // Devuelve los que no se llamen ni Pepe ni Fernando