// Metodos y propiedades propios de JavaScript para fechas

// Obtenemos o generamos fechas a través de instancias del objetos Date

// Obtener la fecha actual con una instancia de Date sin argumentos

let fechaActual = new Date();
console.log(fechaActual);
console.log(typeof fechaActual); // No hay tipo primitivo para las fechas pero serán un objeto de la clase Date

// Establecemos fechas con Date

// 1ª Opcion pasandole los argumentos año, mes, dia, hora, minuto, segundo, milisegundo

let fechaNacimiento = new Date(2000,5,1);
console.log(fechaNacimiento);

let fechaAlta = new Date(2020,0,1); // Años diferentes al siglo XX pasar 4 digitos al primer argumento

// 2ª Opción pasandole una fecha-string 

let fechaExpedicion = new Date('2020-01-15'); // Los meses no van indexados a 0. Esto significa que el 1 es Enero
console.log(fechaExpedicion);

// 3ª Opción pasandole un unico argumento con milisegundos desde Fecha Epoch

let fechaRandom = new Date(4561455656);
console.log(fechaRandom);

// Metodos 'get' del objecto Date

console.log(fechaActual.getFullYear()); // Devuelve el año en tipo Number
console.log(fechaActual.getMonth()); // Devuelve el mes indexado a 0


let meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];

let mesActual = meses[fechaActual.getMonth()];
console.log(mesActual)

console.log(fechaActual.getDate()); // Devuelve el dia del mes en tipo Number
console.log(fechaActual.getDay()); // Devuelve el dia de la semana
console.log(fechaActual.getHours()); // Devuelve la hora de la fecha en tipo Number
console.log(fechaActual.getMinutes()); // Devuelve los minutos de la fecha en tipo Number
console.log(fechaActual.getSeconds()); // Devuelve los segundos de la fecha en tipo Number
console.log(fechaActual.getMilliseconds()); // Devuelve los milisegundos de la fecha en tipo Number

console.log(fechaActual.getTime()); // Devuelve los milisegundos desde Epoch en tipo Number

let fechaSalida = new Date(fechaActual.getTime() + 3 * 24 * 60 * 60 * 1000);
console.log(fechaSalida);
