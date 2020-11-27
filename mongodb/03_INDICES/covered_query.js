// Consultas totalmente cubiertas

// - Todos los campos de la consulta forman parte de un índice
// - Todos los campos devueltos en la consulta (proyección) están en ese mismo índice

db.participantes.find({apellido1: "Fernández", edad: 45}, {apellido1: 1, edad: 1, _id: 0})