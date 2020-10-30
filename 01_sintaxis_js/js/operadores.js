// ----- Operadores -----

// --- operando1 operador operando2 (binarios) ---
// --- operando operador (unarios)
// --- ternario (ver sintaxis mas adelante)

// ---- Tipos de operadores ----

// --- Operadores Aritmeticos ---

// -- + y - 

let nativos = 50;
let extranjeros = 10;
let habitantes = nativos + extranjeros;
console.log(habitantes);

habitantes = nativos + 5
console.log(habitantes)

// -- El operador (suma) también sirve para concatenar

let nombre = 'Sergio'
let mensaje;

mensaje = 'Bienvenido' + nombre;
console.log(mensaje)

let resultado = 10;
factorCorrecion = '3';

puntuacion = resultado + factorCorrecion;
console.log(puntuacion); // Este console.log() muestra un 103 ya que la puntuación se convierte en string ya que ha sumado un number con un string.

// -- * y / -- ( * = multriplicar / = dividir)

let a = 10;
let b = 2;

resultado = a / b;
console.log(resultado);

// -- Valor NaN (not a number) --

a = 'Hola'
resultado = a * b;
console.log(resultado); // Este console.log() te devuelve un NaN ya que en resultado se está multiplicando un string con un numero

// -- Resto % --

let ejemploResto = 13 % 2;
console.log(ejemploResto); // Este console.log() te devuelve un 1 ya que 13/2 = 6 y resto 1

// -- Incremento ++ -- (suma una unidad a una variable)

let c = 1;

console.log(c++); // Postincremento, por eso console.log() te devuelve 1 en vez de 2 
console.log(c++);

let d = 10;

console.log(++d); // Preincremento, por eso console.log() te devuelve 11 en vez de 10

// -- Decremento -- (resta una unidad a una variable)

let e = 4;
console.log(--e);

// --- Precedencia de operaciones, de derecha a izquierda e igual que en matematicas ---

resultado = 12 + 3 * 8;
console.log(resultado);


resultado = (12 + 3) * 8;
console.log(resultado);

// --- Operadores de asignación --- 

// -- = --  

// -- Asignación de adición += -- 

let puntuacion1 = 4
let puntuacion2 = 9

puntuacion1 += puntuacion2; // puntuacion1 = puntuacion1 + puntuacion2

// -- -= *= /= %= --

// --- Operacion de Comparación ---

// -- Operador de igualdad (==) -- (No es estricto con los tipos de datos)

let ciudad = 'Parla';
let termino = 'Parla';

let hayCoincidencia = ciudad == termino;
console.log(hayCoincidencia);

// (No es estricto con los tipos de datos)

let valor1 = 3;
let valor2 = '3';

hayCoincidencia = valor1 == valor2;
console.log(hayCoincidencia);

// -- Operador de igualdad estricta (===) --

hayCoincidencia = valor1 === valor2;
console.log(hayCoincidencia);

// -- Operador de desigualdad (!=) -- 

// -- Operador de desigualdad estricta (!==) -- 

hayCoincidencia = valor1 !== valor2;
console.log(hayCoincidencia);

// -- Operador Mayor que > -- 

valor1 = 8.4;
valor2 = 3;

resultado = valor1 > valor2;
console.log(resultado);

// -- Operador Mayor o Igual que >= -- 

// -- Operador Menor que < --

resultado = valor1 < valor2;
console.log(resultado);

// -- Operador Menor o Igual que <= -- 

// --- Operadores Lógicos ---

// -- Operador Lógico AND && --

valor1 = 12;
valor2 = 14;
let valor3 = 12;

resultado = valor2 < valor1 && valor1 == valor3;
console.log(resultado);

// -- Operador Lógico OR || --

resultado = valor2 < valor1 || valor1 == valor3;
console.log(resultado);

// -- Operador Lógico NOT ! -- 

mayorEdad = false;
console.log(!mayorEdad);

// -- Operador condicional (Ternario) -- (Ejemplo: expresionDeCondicion ? valor1 : valor2)

let estado;
let edadAlumno = 20;

estado = edadAlumno >= 18 ? 'Adulto' : 'Menor';
console.log(estado);

