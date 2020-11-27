let db = db.getSiblingDB('maraton')

var nombres = ['Sergio', 'Rafa', 'Carol', 'Laura', 'Fernando', 'Carlos', 'David']

var apellidos = ['Hernandez', 'Marron', 'Sanchez', 'Garcia', 'Novo', 'Nadal', 'Lopez']

var letrasDni = ['A', 'B', 'C', 'D', 'P', 'X']


var participantes = [];

for (let i = 0; i < 100000; i++) {
    participantes.push({
        _id: i,
        nombre: nombres[Math.floor(Math.random() * nombres.length)],
        apellido1: apellidos[Math.floor(Math.random() * apellidos.length)],
        apellido2: apellidos[Math.floor(Math.random() * apellidos.length)],
        edad: Math.floor(Math.random() * 100),
        dni: Math.floor(Math.random() * 1e8) + letrasDni[Math.floor(Math.random() * letrasDni.length)]
    })

}

db.participantes.insert(participantes)