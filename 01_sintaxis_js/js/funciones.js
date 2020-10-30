// ----- Sintaxis de declaracion -----

// --- function nombreFuncion (parametros) {
    // codigo que ejecute la función
    // return lo que devuelva
// }

function suma(a,b) {
    console.log(a + b);
}

function multiplicar(a,b) {
    // let multiplicacion = a * b;
    return a * b;
}


// ----- Sintaxis de invocación -----

// --- nombreFuncion(argumentos); ---

suma(5,10);

let resultado = multiplicar(5,10);
console.log(resultado);


// -- Expression functions (anonimas) -- 

let cuadrado = function (a) {
    return a * a
}

console.log('Cuadrado: ' + cuadrado(5));

// -- Funciones como argumento -- 

setTimeout(function () {
    console.log('Hola mundo a los 5 segundos');
}, 5000) // Metodo propio de JavaScript de tipo 'timer' para delay de ejecucion de codigo

console.log('Hola mundo')


// --- Funciones flecha ---

let cubo0 = (a) => {
    return a * a * a;
}

console.log('Cubo0: ' + cubo0(5));

// -- Simplificacion de la funcion flecha --

// - Si solo tiene un parametro se pueden eliminar los parentesis -

let cubo1 = a => {
    return a * a * a;
}

console.log('Cubo1: ' + cubo0(10));

// - Si solo tiene una linea en el cuerpo se pueden eliminar -

let cubo2 = a => a * a * a;

console.log('Cubo2: ' + cubo0(2));

// - Parametros predeterminados - 

function producto (a,b = 2) {
    return a * b;
}

console.log(producto(5)); // A sera igual a el introducido por argumento en el console.log y B sera igual a 2 ya que se ha definido en los parametros


// --- Callbacks JavaScript --- (Permiten establecer parametros que recibiran funciones como argumento para ser invocadas)

let segundos = 10;

function cuentraAtras(mostrarReloj){
    setInterval(function(){
        if (segundos > 0 ) {
            segundos--;
            mostrarReloj(segundos)
        }
    },1000)
}

function tiempoEnSegundos(s) {
    console.log(s);
}

function tiempoEnMilisegundos(s){
    console.log(s * 1000)
}

cuentraAtras(tiempoEnSegundos);

cuentraAtras(s => {console.log('Segundos ' + s)})


// ---- Ambito de las variables y constantes

// --- Variables declaradas con var su ámbito es el de la funcion mas proxima ---

var apellidos = 'Marron Calle'; // ambito global
var apellidos = 'Mencia'; // se pueden redeclarar

function setMayorEdad(edad){
    if (edad >= 18) {
        var adulto = true;
    } else {
        var adulto = false;
    }
    console.log(adulto);
}

// console.log(adulto); // Devolveria error porque su ambito es el de la funcion setMayorEdad()

setMayorEdad(47);


// --- Variables declaradas con let su ambito será el del bloque de codigo mas proximo ---

let ciudad = 'Barcelona'; // Ambito global
// let ciudad = 'Getafe'; // no se pueden redeclarar


function setPuntuacion(puntuacion){
    if (puntuacion >= 5) {
        let apto = true;
    } else {
        let apto = false;
        console.log(apto);
    }
    // console.log(apto);
}

setPuntuacion(3);


