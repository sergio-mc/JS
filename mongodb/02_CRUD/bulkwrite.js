// Operacion bulkWrite permite realizar varias operaciones escritura con control del orden de ejecucion
// ¿Son esto transacciones? No.

// db.<collection>.bulkWrite(
//      [<operacion1>,<operacion2>, ...]
//      {
//          ordered: true | false,
//          writeConcern: <valor> // reconocimiento de escritura para replica set
//      }  
// )


db.libros.bulkWrite([
    {
        insertOne: {
            document: { titulo: "El Señor de los Anillos", autor: "J.R.R Tolkien" }
        }
    },
    {
        updateOne:{
            filter: {titulo: "La Historia Interminable"}, 
            update: {$set: {precio: 22}}
        }
    },
    {
        deleteOne: {
            filter: {autor: "William Shakespeare"}
        }
    }
])