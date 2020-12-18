// Tipos para datos primitivos
// Sintaxis
// let variable: tipo;
// String
var mensaje;
mensaje = "Hola Mundo!";
// mensaje = 12;
// Number
var resultado;
resultado = 9.5;
// Boolean
var mayorEdad;
mayorEdad = true;
// Arrays (variable: elemento[] o variable: Array<elemento>)
var frutas;
var coches;
frutas = ['pera', 'naranja', 'manzana'];
// Tipo any
var id = 2876; // Rompe inferencia de tipo en la inicializacion permitiendo CUALQUIER tipo
id = '09876';
// Tipado de funciones (incorpora el tipo void)
function suma(a, b, mensaje) {
    return mensaje ? mensaje + a + b : 'El resultado es ' + a + b;
}
suma(12, 2);
function setMensaje(mensaje) {
    console.log(mensaje);
}
// Tipos genericos para funciones (se define el tipo en la invocacion de la funcion)
function devResultado(a) {
    return a;
}
var b = devResultado('Hola');
var c = devResultado(12);
var ref = 12;
ref = '12';
var razaToby = 'Mastin';
// Clases 
var Jugador = /** @class */ (function () {
    function Jugador(nombre, apellidos) {
        this.nombre = nombre;
        this.apellidos = apellidos;
    }
    Jugador.prototype.setGoles = function (goles) {
        this.goles = goles;
    };
    return Jugador;
}());
var jugador1 = new Jugador('Sergio', 'Ramos');
var jugadores;
var jugador2 = { nombre: "Cristiano" };
jugadores = [jugador1]; // Si añadimos jugador2 devuelve error porque no es de la clase Jugador
