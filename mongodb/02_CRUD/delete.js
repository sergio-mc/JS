// Metodo remove()

// db.<collection>.remove(
//      <doc-consulta>  // Por defecto el metodo elimina todos los elementos que devuelva la consulta
//      justOne: true | false   
// )

// No puede ser utilizado con las capped collections 

db.libros.remove({autor: /John/}) // Eliminará todos los docs en los que autor contenga "John"

db.libros.remove({}) // Eliminara todos los registros pero mantiene la coleccion vacia pero no la elimina (para eliminar coleccion se usa .drop())

// deleteOne() idem a remove() con justOne igual a true
// deleteMany() idem a remove() 