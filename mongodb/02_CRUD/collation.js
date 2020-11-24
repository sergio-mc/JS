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