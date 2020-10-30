console.log('Pepe'); //Comentarios en linea

/*console.log('Pepe'); 
console.log('Pepe');  Comentario en bloque */

// --- VARIABLES --- 
// --- Declaracion de Variables --- 

// ----- Con la palabra reservada var (clasica) -----

var edad; // No se define el tipo de dato. A diferencia de otros como podrían ser String, Number...

// ---- Identificadores ----

// -- Tienen que comenzar por vocal | $ | _
// -- No se pueden utilizar palabras reservadas
// -- (Buena práctica) Utilizar camelCase (ej:primerApellido)
// -- (Buena práctica) Utilizar nombres semánticos

// ----- Con la palabra reservada let (6 ECMA2015) -----

let primerApellido; // Modifica el ámbito a partir de ECMA2015

// ----- Declaración Global (Exige inicialización) -----

direccion = "C/Leganes 33" // Mala Práctica

// ---- Declaración e Inicialización ----

let localidad = "Parla"

// ---- Podemos declarar varias variables a la vez (,) ----

let email, nombre, apellidos, telefono, codigoPostal;

// ----- Constantes (Valor no cambiará durante la ejecución del programa) -----

var URLSERVER = "http://www.google.es"; // Pre ECMA2015

const urlPedidos = "http://www.google.es"; // urlPedidos = "Hola"; Esto no podría ocurrir y daría un error ya que es una constante y no se puede reasignar su valor

// ----- Tipos de datos en JavaScript ----- (Tipado de datos es debil y dinámico)

email = "sergio@sergio.com";
email = 22;

// --- Tipos Primitivos ---

// -- String o cadena alfanumerica (Comillas dobles o simples) --

let ciudad = 'Villa de \nMadrid';
let calle = 'O\'Donell 40';

console.log(ciudad, calle);
console.log(typeof calle); // Devuelve el tipo de la variable en ese momento 

// -- Number (Numeros de todo tipo flotantes con punto)

let resultado = 9.5;

// -- Boolean () --

let mayorEdad = true; // False(0) , True(1)

// -- Undefined -- 

let marca; // valor-tipo-dato undefined
console.log(marca);

// -- Null --

marca = null // valor-tipo-dato 

// ---- Tipos Compuestos ----

// -- Object --

// -- Arrays --

// -- Objectos --

let resultados = [3,4,5];
console.log(typeof resultados);
console.log(calle.length);