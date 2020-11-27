// Indices de texto

// Creacion
// db.<collection>.createIndex({<campo>: "text"})

db.libros.createIndex({ autor: "text" })

// Uso del indice $search y $text

db.libros.find({ $text: { $search: "Ende" } }) // No se especifica el campo porque no podemos tener mas de un indice de texto en la misma coleccion


// Limite solo podemos tener un indice de texto por coleccion pero podemos tener indices de texto multiples


db.libros.createIndex({ titulo: "text" }) // Error si intento crear otro

db.libros.dropIndexes() // los eliminamos


// Si podemos tener un indice texto con todos los campos en los que queramos utilizar estas funcionalidades

db.libros.createIndex({ autor: "text", titulo: "text" })


// Las consultas buscaran los terminos en todos los campos del indice

db.libros.find({ $text: { $search: "Ende" } })

db.libros.insert({ titulo: "Biografia de Ende", autor: "John Doe" })


// Wildcard Text index

db.libros.createIndex({ "$**": "text" }) // Crea indice de texto sobre todos los campos incluso los nuevos campos que se creen en registros posteriores a la creacion del indice


// Se pueden hacer sobre campos de subdocumentos

db.clientes.createIndex({ "direccion.$**": text })

// direccion.calle direccion.cp direccion.localidad direccion.provincia  amplias el modelo de direccion.diasEntrega


// Funcionalidades de los indices de texto

// use biblioteca

db.titulos.insert([
    { titulo: "Paris era una Fiesta", autor: "Ernest Hemingway" },
    { titulo: "Paris, La Guia Completa", autor: "vv.aa." },
    { titulo: "La Ciudad y los Perros", autor: "Mario Vargas Llosa" },
])


// Indice simple de texto

db.titulos.createIndex({ titulo: "text" })

// Busqueda de una palabra

db.titulos.find({ $text: { $search: "paRis" } })  // Ni distinguen mayusculas ni minusculas ni diacriticos -> Encontraria todos las colecciones con Paris

db.titulos.find({ $text: { $search: "Pa" } }) // Tampoco encuentra fragmentos

db.titulos.find({ $text: { $search: /Pa/ } }) // Devuelve error porque solo permite el tipo string

// Error: error: {
//     "ok" : 0,
//     "errmsg" : "\"$search\" had the wrong type. Expected string, found regex",
//     "code" : 14,
//     "codeName" : "TypeMismatch"
// }


// Busqueda de varias palabras

db.titulos.find({ $text: { $search: "Paris era" } })  // Escanea la existencia de las palabras sueltas -> (Paris) , (era)

// Busqueda de frase

db.titulos.find({ $text: { $search: "\"Paris era\"" } })

// { "_id" : ObjectId("5fbfc6795b8e5a572340d3dd"), "titulo" : "Paris era una Fiesta", "autor" : "Ernest Hemingway" }


// Excluir terminos en las busquedas

db.titulos.find({ $text: { $search: "Paris -guia" } })  // Elimina de las coincidencias las que contengan "guia"

// { "_id" : ObjectId("5fbfc6795b8e5a572340d3dd"), "titulo" : "Paris era una Fiesta", "autor" : "Ernest Hemingway" }


// Varios terminos en el mismo campo

db.titulos.find({ $text: { $search: "\"paris\" \"Fiesta\"" } })  // AND


// Stop words -> para evitar buscar articulos.. etc

db.titulos.insert({ titulo: "The Second World Ward", autor: "John Doe" })

db.titulos.find({ $text: { $search: "the" } }) // Por defecto no busca las palabras articulos, conjunciones... en ingles

db.titulos.find({ $text: { $search: "la" } }) // Al no ser ingles te lo busca

db.titulos.find({ $text: { $search: "la", $language: "es" } }) // Devuelve vacio 


// Stemed words (busca las coincidencias de una raiz de palabra)

db.titulos.insert([
    { titulo: "Agile Consultans", autor: "John Doe" },
    { titulo: "Consulting for Global Markets", autor: "John Doe" },
])

db.titulos.find({ $text: { $search: "consult" } })

db.titulos.insert([
    { titulo: "Economia de Guerra", autor: "Fulano" },
    { titulo: "Economice su Hogar", autor: "Fulano" },
])

db.titulos.find({ $text: { $search: "Econ", $language: "es" } }) // Da error en castellano


// Sensible a mayusculas/minusculas

db.titulos.find({ $text: { $search: "paris", $caseSensitive: true } })

// Sensible a diacriticos

db.titulos.find({ $text: { $search: "paris", $diacriticSensitive: true } })

// Text Score

db.titulos.insert([
    { titulo: "Paris", autor: "vv.aa." },
    { titulo: "Paris siempre sera Paris", autor: "vv.aa." },
])

db.titulos.find({ $text: { $search: "paris" } }, { score: { $meta: "textScore" } })
db.titulos.find({ $text: { $search: "paris" } }, { score: { $meta: "textScore" } }).sort({ score: 1 })


// Indice para colecciones con multiples lenguajes

db.books.insert([
    { 
        title: "El Quijote", 
        language: "spanish" ,
        translation: [
            {language: "english", titleTranslated: "The Quijote"},
            {language: "portuguese", titleTranslated: "O Quixote"},
        ]
    }
])

db.books.createIndex({title:"text", "translation.titleTranslated": "text"}, {default_language: "spanish"})

db.books.find({$text: {$search: "el"}})
db.books.find({$text: {$search: "the"}})
db.books.find({$text: {$search: "o"}})

db.books.find({$text: {$search: "quixote"}})

// Control de resultados con pesos en diferentes campos

// $in pesos en los campos

db.titulos.insert([
    {titulo: "El Coronel no tiene quien le escriba", categorias:["amor","novela","ficcion"]},
    {titulo: "El amor en los tiempos del colera", categorias:["amor","ficcion","novela"]}
])

db.titulos.createIndex({titulo: "text" , categorias:"text"})

db.titulos.find({$text: {$search: "amor"}}, {score: {$meta: "textScore"}}).sort({score:{$meta: "textScore"}})

// Con pesos en los campos

db.titulos.find({titulo: "text", categorias: "text"}, {weights: {titulo: 10, categorias:1 }})