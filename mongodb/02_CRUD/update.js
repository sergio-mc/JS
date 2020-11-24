// Operaciones de actualizacion

// Metodo update()

// db.<collection>.update(
//    <documento-consulta>,   // Utiliza la misma sintaxis que para los find
//    <documento-actualizacion>,   // Detallan los cambios al actualizar
//    {
//       multi: boolean  // Define si se actualizan todos los docs o solo el primer doc que cumplan la consulta
//       ...
//    }
// )

// Set de datos

// use biblioteca

db.libros.insert([
    { title: 'Agu Trot', autor: 'Yo', stock: 10 },
    { title: 'La Ciudad y los Perros', autor: 'Mario Vargas Llosa', stock: 10, prestados: 2 },
    { title: 'El Otoño del Patriarca', autor: 'Gabriel Garcia Marquez', stock: 10, prestados: 0 }
])


// Actualizacion de documento completo (sin el _id puesto que es inmutable)

db.libros.update(
    { title: "Agu Trot" },
    { title: "Agu Trot", autor: 'Gabriel Garcia Marguez', stock: 10, prestados: 0 }
)

// Opcion upsert (update and insert) Crear un documento con la actualizacion si la consulta no devuelve ninguna coincidencia

db.libros.update(
    { title: 'El Coronel no tiene quien le escriba' },
    { title: 'El Coronel no tiene quien le escriba', autor: 'Gabriel Garcia Marquez', stock: 5 },
    { upsert: true }   // En este caso la operacion es idempotente (el resultado será siempre el mismo a partir de la primera ejecucion)
)

// Operaciones de actualizacion con operadores (las mas habituales puesto que solo modifican algunos del o los documentos a actualizar)

// $set
// {$set: {<campo>:<valor>, ...}}
// Si el campo a actualizar no existe, $set lo crea y le asigna el valor especificado

db.libros.update({ "_id": ObjectId("5fbbf1bc8ff4774c4faa6e7c") }, { $set: { prestados: 2 } })

db.libros.update({ "_id": ObjectId("5fbbf1bc8ff4774c4faa6e7c") }, { $set: { prestados: 3, categorias: ['novela', 'castellano'] } })


// Sobre campos en subdocumentos

db.libros.insert({
    titulo: 'El Quijote',
    autor: {
        nombre: 'Miguel',
        apellidos: 'Cervantes',
        pais: 'España'
    }
})

db.libros.update({ titulo: 'El Quijote' }, { $set: { "autor.apellidos": "De Cervantes Saavedra" } })

// Sobre elementos de un array

db.libros.update({ title: 'Agu Trot' }, { $set: { "categorias.1": "español" } }) // acceso con notacion del punto y posicion del elemento


// $setOnInsert -> Establece el valor de uno o varios campos si la operacion resulta una insercion, en caso de actualizacion el operador no hace nada.

db.libros.update(
    { title: 'La Historia Interminable' },
    { $setOnInsert: { autor: "Michael Ende" }, $set: { precio: 20 } },
    { upsert: true }
)

// $unset -> Eliminar uno o varios campos (y sus valores)

// {$unset: {<campo>: '', ...}}  // Se le pasa string vacio como valor

db.libros.update(
    { title: 'La Historia Interminable' },
    { $unsert: { precio: '' } }  // Se pasa string vacio con indepencia del tipo de dato
)

// $currentDate

db.libros.update({ titulo: "El Quijote" }, { $set: { stock: 10 }, $currentDate: { actualizadoEl: true } })

// Opcion para tipo de dato timestamp

db.libros.update({ titulo: "El Quijote" }, { $set: { stock: 10 }, $currentDate: { actualizadoEl: { $type: 'timestamp' } } })

// $inc

// {$inc: {<campo>: cantidad, ...}}  // Acepta valores positivos y negativos, No se puede usar sobre campos con valor null

db.libros.update({ "title": "El Coronel no tiene quien le escriba" }, { $inc: { stock: 5 } })  // Sumara 5


// $min -> Solo actualiza si el valor a actualizar es menor que el actual

db.libros.update({ "titulo": "El Quijote" }, { $min: { stock: 12 } })  // Si el stock actual es 10 no hara nada

db.libros.update({ "titulo": "El Quijote" }, { $min: { stock: 8 } })  // Si el stock actual es 10 cambiara a 8 porque es menor

// Prueba con lexicografico

db.libros.update({ "titulo": "El Quijote" }, { $set: { valoracion: 'b' } }) // Seteo de valoracion alfabeticamente

db.libros.update({ "titulo": "El Quijote" }, { $min: { valoracion: 'c' } }) // No haria nada porque c va detras de b

db.libros.update({ "titulo": "El Quijote" }, { $min: { valoracion: 'a' } }) // Modifica porque a es menor que b en lexicografico (ASCII)

// $max -> Contrario al anterior

// $mul

// {$mul: {<campo>: cantidad, ...}}
// Si no tiene el campo lo crea y lse asigna el valor 0 (entiende que lo multiplica por 0)
// Para campo con valor null error

db.libros.update({ "title": "El Coronel no tiene quien le escriba" }, { $mul: { stock: 4 } })

db.libros.update({ "title": "El Coronel no tiene quien le escriba" }, { $mul: { prestados: 2 } })

db.libros.update({ "title": "El Coronel no tiene quien le escriba" }, { $set: { precio: null } })

// $rename -> Renombre los campos 

// {$rename: {<campo>:<nuevo-nombre>, ...}}
// Si renombras a un nombre que ya existe en otro campo, borra ese campo

db.libros.update({ titulo: "El Quijote" }, { $rename: { titulo: "title" } })

// Opcion multi igual true para actualizar todas las coincidencias de la consulta

db.libros.update({}, { $set: { editorial: 'Planeta' } }) // Solo actualiza el primer documento encontrado por la consulta

db.libros.update({}, { $set: { editorial: 'Planeta' } }, { multi: true }) // Actualiza todos los docs encontrados por la consulta

db.libros.update({}, { $rename: { editorial: 'ed' } }, { multi: true })


// Renombrado de campos en docs embebidos

db.libros.insert({
    title: "Mas Ruido que Nueces",
    autor: "William Shakespeare",
    categoria: {
        primaria: "novela",
        lengua: "inglés"
    }
})

db.libros.update({ title: "Mas Ruido que Nueces" }, { $rename: { "categoria.lengua": "categoria.idioma" } })

db.libros.update({
    title: "Mas Ruido que Nueces"
}, {
    $set: {
        editoriales: [
            { nombre: "Planeta", isbn: "vdsljkfhdsfjks" },
            { nombre: "Deusto", isbn: "cajkchaksjda" },
        ]
    }
})

db.libros.update({ title: "Mas Ruido que Nueces" }, { $rename: { "editoriales.isbn": "editoriales.codIsbn" } }) // Error

// WriteResult({
//     "nMatched" : 0,
//     "nUpserted" : 0,
//     "nModified" : 0,
//     "writeError" : {
//             "code" : 28,
//             "errmsg" : "cannot use the part (editoriales of editoriales.isbn) to traverse the element ({editoriales: [ { nombre: \"Planeta\", isbn: \"vdsljkfhdsfjks\" }, { nombre: \"Deusto\", isbn: \"cajkchaksjda\" } ]})"
//     }
// })

db.libros.update({ title: "Mas Ruido que Nueces" }, { $rename: { "editoriales.0.isbn": "editoriales.0.codIsbn" } }) // Tambien da error

// El renombrado de campos de documentos embebidos se puede realizar con la notacion del punto pero no es posible en renombrado de campos de documentos embebidos dentro de un array


// Operadores de actualizacion para arrays

// $ (operador posicional) para actualizacion

// {"<array>.$": <valor>}

db.libros.update({
    title: "Mas Ruido que Nueces"
}, { $set: { editoriales: ["inglesa", "medieval", "novela"] } })

db.libros.update({ categorias: "novela" }, { $set: { "categorias.$": "Novela" } }, { multi: true })

// Otro ejemplo

db.libros.insert([
    { titulo: "Mas Ruido que Nueces", autor: "William Shakespeare", valoraciones: ["bien", "regular", "bien", "mal", "muy bien"] },
    { titulo: "La Historia Interminable", autor: "Michael Ende", valoraciones: ["muy bien", "regular", "bien", "bien", "muy bien"] },
])

db.libros.update({ valoraciones: "bien" }, { $set: { "valoraciones.$": "correcto" } }, { multi: true }) // Solamente cambia la primera coincidencia de bien y los sustituye por correcto

// $ [] (operador posicional) idem anterior pero cambia todos los elementos encontrados por la consulta en el array
// {"<array>.$[]": <valor>}

db.libros.insert({ titulo: "The Firm", autor: "John Grisham", opiniones: [3, 2, 5, 4, 6] })

db.libros.update({ titulo: "The Firm" }, { $set: { "opiniones.$[]": 6 } })

// $[<identificador>] (operador posicional) idem anterior pero permite especificar que elementos seran modificados de los docs en la consulta


// ${"<array>.$[<identificador>]": <valor>}
// {arrayFilters:[{<identificador>:<condicion>}]}

db.libros.update({ titulo: "The Firm" }, { $set: { precios: [22, 21, 13, 18, 21, 14] } })

db.libros.update(
    { titulo: "The Firm" },
    { $set: { "precios.$[elem]": 15 } },
    { arrayFilters: [{ "elem": { $lt: 15 } }] }
)

// Otro ejemplo mas, estos operadores se pueden usar con otros operadores de campo que no sean $set
// Con $inc

db.libros.update(    // Incrementa en 2 todos los precios de ese libro
    { titulo: "The Firm" },
    { $inc: { "precios.$[]": 2 } }
)


// $addToSet -> Añade un valor a un campo array salvo que el valor ya exista
// {$addToSet: {<array>: <valor>}}

db.libros.update({}, { $set: { categorias: ['novela'] } }, { multi: true })

db.libros.update({}, {$addToSet: {categorias: "castellano"}}, {multi:true}) // Operacion idempotente

// $each

db.libros.update({"titulo": "The Firm"}, {$addToSet: {categorias: ["USA","drama"]}}) // -> Se mostraria asi : Categorias ["novela","castellano", ["USA","drama"]]

db.libros.update({"titulo": "The Firm"}, {$addToSet: {categorias: {$each: ["USA","drama"]}}})

// $pop
// {$pop: {<array>: -1}} // para -1 elimina el primer elemento y para 1 el ultimo elemento del array

db.libros.update({"titulo":"The Firm"},{$pop: {categorias: -1}}) // En este caso elimina el primero

// $pull elimina el primer elemento que cumpla la condicion especificada
// {$pull: {<array>: valor|condicion}}

db.libros.update({"titulo":"The Firm"},{$pull: {categorias: "USA"}})

db.libros.update({"titulo":"The Firm"},{$set: {categorias: ["castellano","USA","drama","novela","castellano"]}}) // Reponemos array

// Ejemplo con expresion

db.libros.update({"titulo":"The Firm"},{$pull: {categorias: {$in: ["castellano","drama"]}}})

// Ejemplo con expresion regular para eliminar todos

db.libros.update({"titulo":"The Firm"},{$pull: {categorias: /./}})

// $pullAll idem con una lista de elementos a eliminar
// {$pullAll: {<array>: [valor1,valor2,...]}}

db.libros.update({"titulo":"The Firm"},{$pullAll: {categorias: ["castellano","drama"]}})


// $push idem con una lista de elementos a eliminar
// {$pushAll: {<array>: [valor1,valor2,...]}}

db.libros.insert({titulo: "El Caso Fitgerald", autor: "John Grisham", categorias: ["novela","drama"]})

db.libros.update({titulo: "El Caso Fitgerald"}, {$push: {categorias: "USA"}}) // Añade el elemento

// Añadir varios elementos al final del array

db.libros.update({titulo: "El Caso Fitgerald"}, {$push: {categorias: {$each: ["suspense","ingles"]}}}) // Añade cada elemento 

// Añadir modificadores del array

db.libros.update({titulo: "El Caso Fitgerald"},{$push: {categorias: {$each: ["best-seller", "leyes"], $sort: -1, $slice: -3}}}) // Se le pueden añadir otras funciones como $sort o $slice

// Añadir elementos con el modificador de posicion

db.libros.update({titulo: "El Caso Fitgerald"}, {$push: {categorias: {$each: ["tapa dura","america"], $position: 1}}}) // Añade desde el indice de la posicion


// Metodo updateOne() idem update() pero solo puede actualizar un documento (con lo cual no tiene la opcion multi)
// Sintaxis es igual

// Metodo updateMany() idem update() pero siempre para todos los documentos de la consulta (equivalente a multi: true)
// Sintaxis es igual

// Metodos adicionales 

// https://docs.mongodb.com/manual/reference/update-methods/







