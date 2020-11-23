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

db.libros.update({titulo: "El Quijote"},{$rename: {titulo: "title"}})

// Opcion multi igual true para actualizar todas las coincidencias de la consulta

db.libros.update({}, {$set: {editorial: 'Planeta'}}) // Solo actualiza el primer documento encontrado por la consulta

db.libros.update({}, {$set: {editorial: 'Planeta'}}, {multi: true}) // Actualiza todos los docs encontrados por la consulta

db.libros.update({}, {$rename: {editorial: 'ed'}}, {multi: true})














