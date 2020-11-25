// Colacion permite establecer criterios de comparacion para strings segun reglas locales (de cada lenguaje)

// La colacion se especifica en 3 niveles

// - A nivel de operaciones que utilicen consulta
// - A nivel de indice 
// - A nivel de la coleccion

// Las opciones de colacion se establecen en un documento con una serie de propiedad/valor

// *- A nivel de coleccion

// use tienda

db.productosSinColacion.insert([
    { _id: 1, nombre: "cafe" },
    { _id: 2, nombre: "café" },
    { _id: 3, nombre: "cafE" },
    { _id: 4, nombre: "cafÉ" }
])

db.productosSinColacion.find({}).sort({ nombre: 1 })
// { _id: 1, nombre: "cafe" }
// { _id: 2, nombre: "café" }
// { _id: 3, nombre: "cafE" }
// { _id: 4, nombre: "cafÉ" }

db.createCollection("productosConColacion",{collation: {locale: "es"}})

db.productosSinColacion.insert([
    { _id: 1, nombre: "cafe" },
    { _id: 2, nombre: "café" },
    { _id: 3, nombre: "cafE" },
    { _id: 4, nombre: "cafÉ" }
])

db.productosSinColacion.find({}).sort({nombre: 1})
// { "_id" : 3, "nombre" : "cafE" }
// { "_id" : 1, "nombre" : "cafe" }
// { "_id" : 4, "nombre" : "cafÉ" }
// { "_id" : 2, "nombre" : "café" }


// Ejemplo con eñes Powered by Fernando

db.productosSinColacion.insert([
    {_id: 10, pais: "España"},
    {_id: 11, pais: "España"},
])

db.productosConColacion.insert([
    {_id: 10, pais: "España"},
    {_id: 11, pais: "España"},
])

// Para acceder a las opciones o info de una colecion tenemos
// db.getCollectionInfos({name: <nombre-de-coleccion>})

// No se puede modificar 'en caliente' las opciones de una coleccion

// Como utilizar colacion a nivel de operacion

db.productosSinColacion.find({}).sort({nombre:1}).collation({locale:"es"})
// { "_id" : 1, "nombre" : "cafe" }
// { "_id" : 3, "nombre" : "cafE" }
// { "_id" : 2, "nombre" : "café" }
// { "_id" : 4, "nombre" : "cafÉ" }

// Strength en colacion (Controlar en las busquedas sobre string si distingue o no minusculas, mayusculas y diacriticos)

// El valor de strength por defecto es 3, lo que quiere decir que distingue mayus/minus/diacriticos

db.productosSinColacion.find({nombre:"cafe"}).collation({locale:"es"}) 
// { "_id" : 1, "nombre" : "cafe" } // solo devuelve la que cumple mayus/minus/diacriticos


// Nivel 2 de strength () no distinguir mayusculas de minusculas

db.productosSinColacion.find({nombre:"cafe"}).collation({locale:"es", strength: 2}) 

// { "_id" : 1, "nombre" : "cafe" }
// { "_id" : 3, "nombre" : "cafE" }

db.productosSinColacion.find({nombre:"cafe"}).collation({locale:"es", strength: 1}) 

// { "_id" : 1, "nombre" : "cafe" }
// { "_id" : 2, "nombre" : "café" }
// { "_id" : 3, "nombre" : "cafE" }
// { "_id" : 4, "nombre" : "cafÉ" }


// caseLevel (boolean) define si distinguen o no mayusculas de minusculas (para usar con strength 1)

db.productosSinColacion.find({nombre:"cafe"}).collation({locale:"es", strength: 1, caseLevel: true}) 

// caseFirst "upper" | "lower" para preferencia de mayusculas/minusculas en orden de la consulta

db.productosSinColacion.find({}).collation({locale:"es"}).sort({nombre:1}) 

// { "_id" : 1, "nombre" : "cafe" }
// { "_id" : 3, "nombre" : "cafE" }  // Devolvia antes la minuscula (por criterio locale: "es")
// { "_id" : 2, "nombre" : "café" }
// { "_id" : 4, "nombre" : "cafÉ" }

db.productosSinColacion.find({}).collation({locale:"es", caseFirst: "upper"}).sort({nombre:1}) 

// { "_id" : 3, "nombre" : "cafE" }
// { "_id" : 1, "nombre" : "cafe" }  // Devolvia primero la mayuscula al establecer "upper"
// { "_id" : 4, "nombre" : "cafÉ" }
// { "_id" : 2, "nombre" : "café" }


// numericOrdering para ordenar de manera numerica campos de tipo string

db.productosSinColacion.insert([
    {_id: 20, codigo: "A1"},
    {_id: 21, codigo: "A2"},
    {_id: 22, codigo: "A3"},
    {_id: 23, codigo: "A11"},
    {_id: 24, codigo: "A21"},
])

db.productosSinColacion.find({_id: {$gte:20}}).collation({locale:"es"}).sort({codigo:1})

// { "_id" : 20, "codigo" : "A1" }
// { "_id" : 23, "codigo" : "A11" }
// { "_id" : 21, "codigo" : "A2" }  // Nos devuelve los codigos no correctamente ordenados porque son strings
// { "_id" : 24, "codigo" : "A21" }
// { "_id" : 22, "codigo" : "A3" }

db.productosSinColacion.find({_id: {$gte:20}}).collation({locale:"es",numericOrdering: true}).sort({codigo:1})