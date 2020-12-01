// Data Model Patterns

// Documentos embebidos o modelo denormalizado


// Modelo denormalizado es el optimo para MongoDB y al que se debe recurrir siempre que se pueda

// Coleccion productos

// {
//     producto: "Zapatillas FTV",
//     marca: "Nike",
//     distribuidores: [
//         {nombre: "ServiZapas", contacto: "...", ...},
//         {nombre: "Distribuciones Manolo", contacto: "...", ...}
//     ]    
// }



// Modelo normalizado

// Coleccion productos

// {
//     producto: "Zapatillas FTV",
//     marca: "Nike",
//     distribuidores: [
//         1,2, ...
//     ]    
// }

// Coleccion distribuidores

//  {_id: 1, nombre: "ServiZapas", contacto: "...", ...},
//  {_id: 2, nombre: "Distribuciones Manolo", contacto: "...", ...}
//  ...


// Patterns

// Model One-to-One

// Con modelo denormalizado
// Con una sola consulta se consiguen todos los datos

// {
//     _id: 3,
//     nombre: "Joe Doe",
//     direccion: {
//         calle: "Gran Via, 40",
//         localidad: "Madrid",
//         cp: "28001"
//     } ...
// }


// Model One-to-Many

// // One-to-few
// // Al modelo denormalizado
// // El lado one recibirá normalmente más consultas
// // No seran frecuentes las escrituras en el lado many

// {
//     producto: "Nike FTV",
//     marca: "Nike",
//     imagenes: [
//         {url: "https.//dominio/img/nikeftv.jpg", textoAlt: "...", ... }
//         {url: "https.//dominio/img/nikeftv2.jpg", textoAlt: "...", ... }
//     ],
//     precio: ... ...
// }


// // One-to-Many indefinido

// Habría que estudiar cada caso, intentar ir al modelo denormalizado pero
// hay que tener en cuenta que si el lado many crece mucho se podria superar 
// el limite de 16 MG por documento.



// // One-to-skillions

// // Con modelo normalizado








// Modelo Many-to-Many

// Con modelo denormalizado
// Mayor numero de consultas en el lado de mayor numero registros
// redundancia

// Coleccion productos
