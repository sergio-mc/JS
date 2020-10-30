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