// ----- Estructuras de control de flujo de programa -----

// --- Estructura condicional if ---

// -- if (condición) {
//    codigo a ejecutar si cumple esa condición
// } --

let nombre = 'Sergio';
let edad = 20;
let mayorEdad;

if(edad >= 18 && nombre != undefined){
    mayorEdad = true
    console.log(nombre + ' es mayor de edad');
}

if(edad < 18)console.log('Menor de edad'); // No se suele emplear el alivio de llaves

// -- if (condición) {
//    codigo a ejecutar si cumple esa condición
// } else {
//    codigo a ejecutar si no cumple esa condición
// }

let a = 10;
let b = 20;

if (a > b ) {
    console.log('A es mayor que B')
} else {
    console.log('A es menor o igual que B')
}

// --- Estructura if else if ---

// -- if (condición) {
//    codigo a ejecutar si cumple esta condición
// } else if (condición) {
//    codigo a ejecutar si cumple esta condición
// } else {
//    codigo a ejecutar si no se cumple ninguna condición
// }

if (a > b ) {
    console.log('A es mayor que B')
} else if (a === b ){
    console.log('A es igual a B')
} else {
    console.log('A es menor que B')
}

// --- Estructura condicional switch ---

// -- switch (expresión) {
//      case valor1:
        // codigo a ejecutar
        // break
    // ...
    // case valor2:
        // codigo a ejecutar
        // break  
    //  default:
        // codigo a ejecutar      
// } -- 

let diaSemana = 2;

switch (diaSemana) {
    case 1:
        console.log('Lunes')
        break;
    case 2:
        console.log('Martes')
        break;
    case 3:
        console.log('Miercoles')
        break;
    case 4:
        console.log('Jueves')
        break;
    case 5:
        console.log('Viernes')
        break;
    case 6:
        console.log('Sabado')
        break;
    case 7:
        console.log('Domingo')
        break;
    default:
        console.log('Dia de la semana no valido')
        break;
}

let mes = 'octubre';

switch (mes) {
    case 'enero':
    case 'febrero':
    case 'marzo':
        console.log('1er Trimestre')
        break;
    case 'abril':
    case 'mayo':
    case 'junio':
        console.log('2o Trimestre')
        break;
    case 'julio':
    case 'agosto':
    case 'septiembre':
        console.log('3er Trimestre')
        break;
    case 'octubre':
    case 'noviembre':
    case 'diciembre':
        console.log('4o Trimestre')
        break;
    default:
        console.log('Mes no valido')
        break;
}

// --- Estructura iterativa for ---

// -- for (valor inicial; condición; actualización) {
//         codigo a ejecutar mientras se cumpla la condicion
// }

for(i = 0; i < 10; i++) {
    console.log('Hola');
    console.log('En cada iteración i tendrá el valor de ' + 1);
}


let usuario;
let contraseña; 
let contador = 1;

/* Entretenimiento y uso de función promp()
for (password = prompt('Escribe tu contraseña');
    password !=='1234';
    password = prompt('Contraseña no valida, intentelo de nuevo')) {
    contador++;
}

console.log(contador); */

// --- Estructura iterativa while ---

// -- while (condicion) {
    // código ejectuar mientras se cumpla la condicion
// }

while (usuario !== 'Sergio') {
    usuario = prompt('Escriba su nombre de usuario');
}

// --- Estructura iterativa do while ---

// -- do {
    // código ejectuar mientras se cumpla la condicion
// } while (condicion)

do {
    contraseña = prompt('Escriba su contraseña')
} while (contraseña !== 'js');