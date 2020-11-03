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
