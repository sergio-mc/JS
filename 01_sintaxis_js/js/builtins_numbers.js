// Metodos y propiedades propios JavaScript para tipos number

// Parseo de string a number

let resultado = '9,7'; // Tipo string

resultado = parseInt(resultado); // Devuelve la parte entera y la convierte a number
console.log(resultado);

resultado2 = parseFloat(resultado); // Conversion a number manteniendo la parte float
console.log(resultado2);

// Parseo de number a string

let puntuacion = 9;

puntuacion = puntuacion.toString();
console.log(typeof puntuacion + ` ${puntuacion}`);

// Objecto Math

let puntuacion2 = 2.5;

let puntuacionFinal = Math.round(puntuacion2); // Se suele convertir a positivo para evitar el redondeo de los .5
console.log(puntuacionFinal);


let puntuacionSuelo = Math.floor(puntuacion2);
console.log(puntuacionSuelo);
let puntuacionTecho = Math.ceil(puntuacion2);
console.log(puntuacionTecho);

// Random (Aleatorio), devuelve un numero entre 0 y 0.99999999

let nombres = ['Carol','Alex','Joao','Rafa','Sergio','Fabio'];

let aviso = document.getElementById('aviso');

function nombreRandom () {
    aviso.innerHTML = nombres[Math.floor(Math.random() * nombres.length)];
}


