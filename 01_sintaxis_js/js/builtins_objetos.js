// Metodos y propiedades propios de JavaScript para arrays de objetos

let jugadores = [
    {nombre: 'Maria', apellidos:'Zuil', puntuacion:5},
    {nombre: 'Juan', apellidos:'Gomez', puntuacion:2},
    {nombre: 'Laura', apellidos:'Lopez', puntuacion:8},

]

console.log(jugadores[1]);

// Ciclo forEach ECMA6 2015

// <array>.forEach(elem, i) => {        // La funcion flecha ejecuta tantas veces como elementos tenga el array
//      codigo a ejecutar con cada elemento
//  }

jugadores.forEach((e) => {
    if(e.puntuacion >= 5){
        e.apto = true;
    } else {
        e.apto = false;
    }
});

let jugadoresAptos = [];

jugadores.forEach((e) => {
    if(e.puntuacion >= 5){
        jugadoresAptos.push(e)
    }
});


console.table(jugadores);
console.table(jugadoresAptos);


// Ciclo Map ECMA6 2015
// Devuelve en un array el resultado del codigo utilizado sobre cada elemento
// <array>.map((elemento,indice) => {
    // codigo a ejecutar
    // return;
//  });

let nombreJugadores = jugadores.map((e,i) => {
    return `${i + 1}.- ${e.nombre} ${e.apellidos}`;
});

console.table(nombreJugadores);

// Ciclo Filter ECMA6 2015
// Devuelve en un array los elementos que cumplan una condicion (de filtro)
// <array>.filter((elemento, indice) => {
    // return expresion condicional
//  })

let jugadoresNoAptos = jugadores.filter(e => {
    return e.puntuacion < 5;
});

console.table(jugadoresNoAptos);


// Ciclo Reduce ECMA6 2015
// Recorre los valores y en cada ciclo de iteracion actualiza (codigo) un valor de inicio y otro valor de fin a partir de los valores de cada elemento
// <array>.reduce((elem,i) => {
    // Codigo valor inicio y valor fin
//  }) 

jugadores[0].puntuacion = [4.5, 6.5, 7.8];
jugadores[1].puntuacion = [9.4, 6.5, 6.8];
jugadores[2].puntuacion = [7.5, 4.5, 7.9];
jugadores[0].puntuacionMedia = null;
jugadores[1].puntuacionMedia = null;
jugadores[2].puntuacionMedia = null;

jugadores.forEach(e => {
    let suma = e.puntuacion.reduce((inicio,fin) => {
        return inicio + fin;
    })

    e.puntuacionMedia = suma / e.puntuacion.length;


})

console.table(jugadores)

// Metodo sort para arrays de objetos
// Permite pasar funciones como argumentos

function compararAscendente (a, b) {
    if(a.apellidos < b.apellidos) {
        return -1
    }
    if(a.apellidos > b.apellidos) {
        return 1;
    }
    return 0;
}

jugadores.sort(compararAscendente);
console.table(jugadores);

function compararDescendente (a, b) {
    if(a.apellidos < b.apellidos) {
        return 1;
    }
    if(a.apellidos > b.apellidos) {
        return -1;
    }
    return 0;
}

jugadores.sort(compararDescendente);
console.table(jugadores);












