// Indices multikey con un campo que almacena tipo de dato array

// db.<collection>.createIndex({<campo-array>: 1 | -1})

// Ejemplos

// use shop

db.productos.insert({
    nombre:"Sudadera FTR34",
    marca: "Nike",
    stock: [
        {color:"azul", talla:"xs", cantidad: 2},
        {color:"azul", talla:"l", cantidad: 12}
    ],
    categorias: ["mujer","ropa"]
})

// Los indices multikey cuando son simples (es decir un solo campo) se pueden hacer varios indices sobre varios campos
// Varios campos

db.productos.createIndex({stock:1})
db.productos.createIndex({categorias:1})

// Los indices multikey cuando son multiple (es decir varios campos) solo uno de ellos puede ser sobre campos de tipo array

db.productos.createIndex({stock:1, marca: -1})

db.productos.createIndex({stock:1, categorias: -1}) // No estaria permitido
// {
//     "ok" : 0,
//     "errmsg" : "Index build failed: d669fdcd-2169-4d06-b329-c35bb2bd8ca7: Collection shop.productos ( 8f84e1df-a99f-4caa-a8d1-5660f0ae479f ) :: caused by :: cannot index parallel arrays [categorias] [stock]",
//     "code" : 171,
//     "codeName" : "CannotIndexParallelArrays"
// }


// La limitacion de un solo campo de tipo array en un indice multikey multiple hace que las operaciones de escritura se limiten para ese indice

db.productos.insert({
    nombre:"Gorra Sport",
    marca: ["Adidas","Nike"],
    stock: [
        {color:"negro", talla:"unica", cantidad: 5},
        {color:"azul", talla:"unica", cantidad: 12}
    ],
    categorias: ["hombre","ropa"]
})
// WriteResult({
//     "nInserted" : 0,
//     "writeError" : {
//             "code" : 171,
//             "errmsg" : "cannot index parallel arrays [marca] [stock]"
//     }
// })

