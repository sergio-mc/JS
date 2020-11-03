// Métodos y propiedades propios de JavaScript para tipo string 

let nombre = 'Juan';

console.log(nombre.length); // Devolver longitud del string (nº de caracteres)
console.log(nombre.toLowerCase()); // Devolver el string en minusculas
console.log(nombre.toUpperCase()); // Devolver el string en mayusculas
console.log(nombre.charAt(2)); // Devuelve el caracter de la posicion (indexado a cero)
console.log(nombre.indexOf('n')); // Devuelve la posición del caracter (1ª coincidencia)
console.log(nombre.indexOf('k')); // Si no encuentra el caracter devuelve -1

nombre = 'Amanda';
console.log(nombre.lastIndexOf('a')); // Devuelve la posición del caracter (1ª coincidencia)
console.log(nombre.includes('x')); // Devuelve true o false si encuentra o no la cadena de caracteres
console.log(nombre.includes('nda')); // Devuelve true o false si encuentra o no la cadena de caracteres
console.log(nombre.startsWith('A')); // Devuelve true o false si la cadena comienza por el argumento
console.log(nombre.endsWith('z')); // Devuelve true o false si la cadena finaliza por el argumento

let apellidos = 'Perez Gomez';
let nombreCompleto = nombre.concat(' ' + apellidos); // Concatena
console.log(nombreCompleto);

let frase = '             En un lugar de la Mancha.....            ';

console.log(frase.trim()); // Elimina espacios en blanco al comienzo y fin de la cadena de caracteres

console.log(apellidos.repeat(3)); // Repite la cadena tantas veces indiquemos con el entero

let cadena = '01234abcde';

console.log(cadena.slice(2,7)); // Devuelve el fragmento de cadena desde la primera posicion incluida (1er parametro) hasta la segunda posicion no incluida (2º parametro)

console.log(cadena.slice(-2)); // Pasando argumento negativo devuelve los n ultimos caracteres

// Template Literals (nueva sintaxis para string de ECMA6 2015)
// Escribir cadenas multilinea sin secuencias de escape
// Permite interpolar expresiones dentro de las cadenas

// Sintaxis 

// let identificador = `  ... caracteres ${expresion}
//                       ...   `

let puntuacion = 0.87;

let mensaje = `La jugadora ${nombre} ${apellidos} tiene una puntuacion de ${puntuacion}`;
console.log(mensaje);

let aviso = document.getElementById('aviso');

// aviso.innerHTML = `<ul>
//                     <li>${nombre}</li>
//                     <li>${apellidos}</li>
//                    </ul>`
