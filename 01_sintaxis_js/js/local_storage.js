// Objeto JSON para parsear de objeto JavaScript a Json y viceversa

let jugador = {
    nombre:'Sergio',
    apellidos:'Ramos',
    goles:0
}

let jugadorEnJson = JSON.stringify(jugador); // Parse JS a Json
console.log(jugadorEnJson);

let nuevoJugador = JSON.parse(jugadorEnJson); // Parsea Json a Js
console.log(nuevoJugador);


// Uso de JSON en localStorage

let participantes = [
    {nombre:'Laura',apellidos:'Lopez'},
    {nombre:'Carlos',apellidos:'Fernandez'}
]

// Objeto localStorage setItem() | getItem() | removeItem |

localStorage.setItem('participantes',JSON.stringify(participantes)); // 1er Argumento Nombre Item, 2º Argumento Valor JSON o string

let nuevosParticipantes = JSON.parse(localStorage.getItem('participantes'));
console.log(nuevosParticipantes);

localStorage.removeItem('participantes');