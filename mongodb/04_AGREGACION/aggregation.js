// Agregación MongoDB
// Pipe con una serie de etapas que se ejecutan en memoria

// Sintaxis
// db.<coleccion>.aggregate(
    // [
    //     {etapa1}, // utiliza operadores de agregación
    //     {etapa2},
    //     ...
    // ],
    // {documento de opciones}
// )

// Etapa
// {$operadorEtapa: {$operador, $operador,...}}

// Operador $project

db.titulos.aggregate([
    {$project: {_id: 0, titulo: 1, categorias: 1}}
])

// Cada etapa actúa sobre la anterior
// Field reference utiliza $<nombre-del-campo>

db.titulos.aggregate([
    {$project: {_id: 0, titulo: 1, categorias: 1}},
    {$project: {title: "$titulo"}} // expresión
])

// $project también permite expresiones

// set de datos

db.libros.insert([
    {titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", stock: 10},
    {titulo: "La Ciudad y los Perros", autor: "Mario Vargas Llosa", stock: 10, prestados: 2},
    {titulo: "El Otoño del Patriarca", autor: "Gabriel García Márquez", stock: 10, prestados: 0},
])

db.libros.aggregate([
    {$project: {
        titulo: 1,
        _id: 0,
        prestados: {
            $cond: {
                if: {$eq: [0, "$prestados"]},
                then: "$$REMOVE",
                else: "$prestados"
            }
        }
    }}
])

// $sort ordenar el set documentos de la etapa anterior

// set de datos

// use gimnasio2

db.clientes.insert([
    {nombre: "Juan", apellidos: "Pérez", alta: new Date(2020,8,5), actividades: ["padel","tenis","esgrima"]},
    {nombre: "Luisa", apellidos: "López", alta: new Date(2020,9,15), actividades: ["aquagym","tenis","step"]},
    {nombre: "Carlos", apellidos: "Pérez", alta: new Date(2020,10,8), actividades: ["aquagym","padel","cardio"]},
    {nombre: "José", apellidos: "Gómez", alta: new Date(2020,8,25), actividades: ["pesas","cardio","step"]},
])

db.clientes.aggregate([
    {$project: {cliente: {$toUpper: "$apellidos"}, _id: 0}},
    {$sort: {cliente: 1}}
])

db.clientes.aggregate([
    {$project: {nombre: 1, apellidos: 1, _id: 0, mesAlta: {$month: "$alta"}}},
    {$sort: {mesAlta: -1, apellidos: 1}}
])

// $group

// { $group: {
//    _id: <expresión>, Agrupa por el campo _id
//    <campo>: {<acumulador>: <expresión>},
//    <campo>...
// }}

db.clientes.aggregate([
    {$project: {mesAlta: {$month: "$alta"}, _id: 0}},
    {$group: {_id: "$mesAlta", numeroAltasMes: {$sum: 1}}}, // Necesitamos _id para agrupar
    {$project: {mes: "$_id", numeroAltasMes: 1, _id: 0}}, // pero podemos volcar sus valores en otro campo nuevo y eliminarlo
    {$sort: {numeroAltasMes: -1}}
])

// Sobre cualquier operador pero especialmente con $group cada etapa tiene, por defecto, un límite de 100 megabytes de RAM
// se puede sobrepasar con la opción allowDiskUse como true

db.clientes.aggregate([
    {$project: {mesAlta: {$month: "$alta"}, _id: 0}},
    {$group: {_id: "$mesAlta", numeroAltasMes: {$sum: 1}}}, // Necesitamos _id para agrupar
    {$project: {mes: "$_id", numeroAltasMes: 1, _id: 0}}, // pero podemos volcar sus valores en otro campo nuevo y eliminarlo
    {$sort: {numeroAltasMes: -1}}
], {allowDiskUse: true})

// Otros ejemplos con otros operadores

// use shop2

db.pedidos.insert([
    {sku: "v101", cantidad: 12, precio: 20, fecha: ISODate("2020-11-21")},
    {sku: "v101", cantidad: 6, precio: 20, fecha: ISODate("2020-11-22")},
    {sku: "v101", cantidad: 4, precio: 20, fecha: ISODate("2020-11-21")},
    {sku: "v102", cantidad: 7, precio: 10.3, fecha: ISODate("2020-11-21")},
    {sku: "v102", cantidad: 5, precio: 10.9, fecha: ISODate("2020-11-21")}
])

// Total ventas por día de la semana

db.pedidos.aggregate([
    {$group: {_id: {$dayOfWeek: "$fecha"}, totalVentas: {$sum: {$multiply: ["$cantidad","$precio"]}}}},
    {$project: {diaSemana: "$_id", totalVentas: 1, _id: 0}},
    {$sort: {diaSemana: -1}}
])

// Promedio de cantidad de producto 

db.pedidos.aggregate([
    {$group: {_id: "$sku", cantidadPromedioPedido: {$avg: "$cantidad"}}},
    {$project: {skuProducto: "$_id", cantidadPromedioPedido: 1, _id: 0}},
])

// Para crear arrays

// use biblioteca

db.libros.aggregate([
    {$group: {_id: "$autor", libros: {$push: "$titulo"}}},
    {$project: {autor: "$_id", libros: 1, _id: 0}}
])


// Con varios campos como agrupadores

// use maraton

db.participantes.aggregate([
    {$group: {_id: {nombre: "$nombre", edad: "$edad"}, totalMismoNombreMismaEdad: {$sum: 1}}},
    {$project: {nombre: "$_id.nombre", edad: "$_id.edad", total: "$totalMismoNombreMismaEdad", _id: 0}}
])



// $unwind Deconstruye un array en sus elementos

// use shop2

db.productos.insert([
    {nombre: "Camiseta", marca: "Nike", tallas: ["xs","s","m","l","xl"]},
    {nombre: "Camiseta", marca: "Puma", tallas: null},
    {nombre: "Camiseta", marca: "Adidas"}
])

db.productos.aggregate([
    {$unwind: "$tallas"},
    {$project: {_id: 0, nombre: 1, marca: 1, talla: "$tallas"}}
])

// Opciones de $unwind

db.productos.aggregate([
    {$unwind: {path:"$tallas", includeArrayIndex: "orden"}}, // pasar a un campo la posición en el array original
    {$project: {_id: 0, nombre: 1, marca: 1, talla: "$tallas", orden: 1}}
])

db.productos.aggregate([
    {$unwind: {path:"$tallas", preserveNullAndEmptyArrays: true}}, // mantiene los que no tengan el campo o lo tengan null
    {$project: {_id: 0, nombre: 1, marca: 1, talla: "$tallas"}}
])

// Otro ejemplo Actividades favoritas de los clientes

// use gimnasio2

db.clientes.aggregate([
    {$unwind: "$actividades"},
    {$group: {_id: "$actividades", total: {$sum: 1}}},
    {$project: {actividad: "$_id", total: 1, _id: 0}},
    {$sort: {total: -1}}
])


// $match

// Sintaxis en el documento que las consultas con find, findOne, update, etc...

// use maraton

db.participantes.aggregate([
    {$match: {$and: [{edad: {$gte: 40}}, {edad: {$lt: 50}}]}},
    {$group: {_id: "$edad", total: {$sum: 1}}},
    {$project: {edad: "$_id", total: 1, _id: 0}}
])

// Uso de índices (https://docs.mongodb.com/master/core/aggregation-pipeline/#pipeline-operators-and-indexes)

db.participantes.explain("allPlansExecution").aggregate([
    {$match: {nombre: "Laura"}},
    {$group: {_id: "$edad", total: {$sum: 1}}}, // No coge el índice para edad
    {$project: {edad: "$_id", total: 1, _id: 0}}
])

// Ejemplo con palabras

// use shop2

db.opiniones.insert([
    {sku: "v102", user: "00012", opinion: "buen servicio pero producto en mal estado"},
    {sku: "v102", user: "00013", opinion: "muy satisfecho con la compra"},
    {sku: "v102", user: "00014", opinion: "muy mal, tuve que devolverlo"},
    {sku: "v103", user: "00014", opinion: "perfecto en todos los sentidos"},
    {sku: "v102", user: "00015", opinion: "mal, no volveré a comprar"},
])

db.opiniones.createIndex({opinion: "text"})

db.opiniones.aggregate([
    {$match: {$text: {$search: "mal"}}},
    {$group: {_id: "$sku", malasOpiniones: {$sum: 1}}},
    {$project: {sku: "$_id", malasOpiniones: 1, _id: 0}}
])

db.opiniones.aggregate([
    {$match: {$text: {$search: "buen perfecto"}}},
    {$group: {_id: "$sku", buenasOpiniones: {$sum: 1}}},
    {$project: {sku: "$_id", buenasOpiniones: 1, _id: 0}}
])

// En niveles inferiores

db.clientes.insert([{
        nombre: "Carlos", 
        apellidos: "Pérez", 
        alta: new Date(2020,9,5), 
        actividades:[
            {nombre: "padel", activo: true, turno: 'mañana'},
            {nombre: "esgrima", activo: true, turno: 'mañana'},
            {nombre: "tenis", activo: true, turno: 'tarde'}
        ]
    }
])

db.clientes.find(
    {actividades: {$elemMatch: {nombre: "tenis", activo: true}}},
    {nombre: 1, apellidos: 1, _id: 0, actividades: {$elemMatch: {nombre: "tenis", activo: true}}}
)

// Con agregación

db.clientes.aggregate([
    {$unwind: "$actividades"},
    {$match: {"actividades.nombre": "tenis", "actividades.activo": true}},
    {$project: {_id: 0, nombre: 1, apellidos: 1, deporte: "$actividades.nombre", turno: "$actividades.turno"}}
])

// $addFields

// use maraton

db.resultados.insert([
    {nombre: "Juan", llegada: new Date("2020-11-01T16:31:40")},
    {nombre: "Laura", llegada: new Date("2020-11-01T15:43:40")},
    {nombre: "Pedro", llegada: new Date("2020-11-01T17:10:40")},
])

db.resultados.aggregate([
    {$addFields: {tiempo: {$subtract: ["$llegada", new Date("2020-11-01T12:00:00")]}}},
    {$addFields: {horas: {$floor: {$mod: [{$divide: ["$tiempo", 1000 * 60 * 60]}, 24]}}}},
    {$addFields: {minutos: {$floor: {$mod: [{$divide: ["$tiempo", 1000 * 60]}, 60]}}}},
    {$addFields: {segundos: {$mod: [{$divide: ["$tiempo", 1000]}, 60]}}},
    {$sort: {tiempo: 1}},
    {$project: {nombre: 1, horas: 1, minutos: 1, segundos: 1, _id: 0}}
])

// $skip <entero> Cada uno en su etapa

// $limit <entero> 

// $merge (Salida a otra colección) (Sustituye a $out)

db.participantes.aggregate([
    {$match: {$and: [{edad: {$gte: 50}}, {edad: {$lt: 60}}]}},
    {$group: {_id: "$edad", total: {$sum: 1}}},
    {$project: {edad: "$_id", total: 1, _id: 0}},
    {$merge: "resumen"}
])

// Salida a otra base de datos

db.participantes.aggregate([
    {$match: {$and: [{edad: {$gte: 50}}, {edad: {$lt: 60}}]}},
    {$group: {_id: "$edad", total: {$sum: 1}}},
    {$project: {edad: "$_id", total: 1, _id: 0}},
    {$merge: {
        into: {db: "maratonMadrid", coll: "resumenMadrid"}
    }}
])

// Control de la actualización o inserción de documentos

db.participantes.aggregate([
    {$match: {nombre: "Carlos"}},
    {$limit: 10},
    {$addFields: {fecha: new Date()}},
    {$merge: {
        into: {db: "maratonMadrid", coll: "resumenCarlos"},
        on: "_id",
        whenMatched: "keepExisting",
        whenNotMatched: "insert"
    }}
])

// $lookup un tipo de join en MongoDB (left outer)
// Sintaxis
// { $lookup:
        // {
        //     from: <colección-externa>,
        //     localField: <campo de la colección>,
        //     foreignField: <campo de la colección externa>,
        //     as: <campo de salida (array)>
        // }
// }

// use shop3

db.pedidos.insert([
    {_id: 1, items: [
            {codigo: "a01", precio: 12, cantidad: 2},
            {codigo: "j02", precio: 10, cantidad: 4},
        ]
    },
    {_id: 2, items: [
            {codigo: "j01", precio: 20, cantidad: 1}
        ]
    },
    {_id: 3, items: [
            {codigo: "j01", precio: 20, cantidad: 4}
        ]
    },
    {_id: 4, items: []}

])

db.productos.insert([
    {_id: 1, codigo: "a01", descripcion: "producto 1", stock: 120},
    {_id: 2, codigo: "d01", descripcion: "producto 2", stock: 80},
    {_id: 3, codigo: "j01", descripcion: "producto 3", stock: 60},
    {_id: 4, codigo: "j02", descripcion: "producto 4", stock: 70},
])

// Operación para obtener desde la colección pedidos los datos de cada producto comprado

db.pedidos.aggregate([
    {$unwind: {path: "$items", preserveNullAndEmptyArrays: true}},
    {$lookup: {
        from: "productos",
        localField: "items.codigo",
        foreignField: "codigo",
        as: "producto"
    }},
    {$unwind: {path: "$producto", preserveNullAndEmptyArrays: true}},
    {$project: {
            numeroPedido: "$_id", 
            producto: "$items.codigo", 
            descripcion: "$producto.descripcion",
            stock: "$producto.stock",
            cantidad: "$items.cantidad",
            precio: "$items.precio",
            _id: 0
        }
    }
])

// Otro join de la colección contraria

db.productos.aggregate([
    {$lookup: {
            from: "pedidos",
            localField: "codigo",
            foreignField: "items.codigo",
            as: "pedidos"
        }
    },
    {$unwind: {path: "$pedidos", preserveNullAndEmptyArrays: true}},
    {$unwind: {path: "$pedidos.items", preserveNullAndEmptyArrays: true}},
    {$match: {$or: [
                    {$expr: {$eq: ["$codigo", "$pedidos.items.codigo"]}},
                    {pedidos: {$exists: false}}
                ] 
            }
    },  
    {$project: {
        _id: 0,
        codigo: 1,
        descripcion: 1,
        stock: 1,
        numeroPedido: "$pedidos._id",
        precio: "$pedidos.items.precio",
        cantidad: "$pedidos.items.cantidad"
    }}

])