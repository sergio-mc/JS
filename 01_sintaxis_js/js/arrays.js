// ---- Arrays (arreglos) ----

// --- let identificador = [elemento1, elemento2, ....]; ---
// --- let identificador = new Array(elemento1, elemento2, ....); ---

let frutas = ['manzana','pera','platano','naranja'];

console.log(frutas);

// --- Acceso a los elementos del array emplea la sintaxis identificador [expresion que devuelva posicion] ---
// --- Posicion de cada elemento será la que tenga en el indice del array que comienza en 0 ---

let frutaSeleccionada = frutas[2];
console.log(frutaSeleccionada);

frutas[0] = 'cereza'
console.log(frutas);


// -- Es muy comun usar arrays de objetos -- 

let participantes = [
    {nombre: 'Sergio', apellidos:'Marron'},
    {nombre: 'Alberto', apellidos:'Marron'},
    {nombre: 'Pilar', apellidos:'Calle'}
]

console.table(participantes);