// ---- Objetos en JavaScript ----

// 1ª Forma de declarar objetos mediante literal 
// {
//     propiedad: valor,
//     propiedad2: valor,
//     .....
//     metodo(){
//        // codigo    
//     }
// }


let jugador1 = {
    nombre: 'Sergio',
    apellidos: 'Ramos',
    dorsal: '4',
    goles: 1,
    equipos: ['Real Madrid', 'Sevilla'],
    marcarGol(){
        this.goles++;
    }
}

// --- Acceso objetos con notacion del punto ---

console.log(jugador1.dorsal);
jugador1.marcarGol();
console.log(jugador1.dorsal);

jugador1.apellidos = 'Ramos Calle';
console.log(jugador1.apellidos);

console.log(jugador1['nombre']); // Forma alternativa de acceso a propiedades

// jugador1 = 4; // Atención el uso de objetos no impide que JS siga siendo 'tipado dinamico'
// console.log('Tipo de jugador 1 ahora: ' + typeof jugador1, 'Valor: ' + jugador1);

// 2ª Forma de declarar objetos con Object

// new Object()

let jugador2 = new Object(); // Establecer el tipo objeto (vacio) --- Similar a: let jugador2 = {};
jugador2.nombre = 'Lionel';
jugador2.apellidos = 'Messi';
jugador2.goles = 0;
jugador2.dorsal = '10';
jugador2.marcarGol = function(){
    this.goles++;
}

jugador2.marcarGol();
console.table(jugador2);

// 3ª Forma de declarar objetos con función constructoria (lo más parecido a clases y sus instancias)

function Jugador (nombreIn,apellidosIn,dorsalIn,golesIn) {
    this.nombre = nombreIn;
    this.apellidos = apellidosIn;
    this.dorsal = dorsalIn;
    this.goles = golesIn;

    this.marcarGol = function () {
        this.goles++;
    }

}

// "Instanciar" objectos de esa funcion constructora de objetos con la palabra new 

let jugador3 = new Jugador('Iker','Casillas','1',0);
let jugador4 = new Jugador('Sergio','Marron','51',10);

jugador3.marcarGol();
console.table(jugador3);
jugador4.edad = 20;
console.table(jugador4);


jugador4.anulaGol = function() {this.goles--}; // Es mala practica 
jugador4.anulaGol();
console.log('Se anula 1 gol: ');
console.table(jugador4);

// 4ª Forma Factory functions

function Empleado (nombre, apellidos){
    return {
        nombre,
        apellidos
    }
}

let empleado1 = Empleado('Juan','Lopez');
console.log(empleado1);