// Metodos y propiedades propios de JavaScript para arrays

let frutas = ['platano', 'manzana','pera'];

// Metodos mutables (van a modificar el valor de la variable de tipo array)

let frutaExtraida = frutas.pop(); // Eliminar el ultimo elemento del array
console.table(frutas); // Devuelve los elementos de fruta sin la fruta extraida
console.log('Pop: ' + frutaExtraida); // Devuelve el unico elemento extraido

frutas.push('kiwi','cerezas'); // Añade elemento al final del array
console.log('Push: ' + frutas);

frutas.shift(); // Extrae el primer elemento del array y desplaza el resto (en cuanto a indice) hacia la izquierda
console.log('Shift: ' + frutas);

frutas.unshift('fresas','uvas'); // Añade elementos desde el principio desplazando el resto a la derecha
console.log('Unshift: ' + frutas);

// Metodo splice para eliminar o añadir elementos

// splice(indice, cantidad, elementos opcionales a añadir o sustituir)

frutas.splice(1,3);
console.log('Splice: ' + frutas);

frutas = ['manzana','pera','naranja'];

frutas.splice(1,1, 'platanos'); // Sustituye el o los elementos desde la posicion indicada
console.log('Splice sustituye: ' + frutas);

frutas.splice(1,0, 'sandia','melon'); // Añade el elemento desde la posicion indicada
console.log('Splice añade desde posicion: ' + frutas);

frutas.sort(); // Ordena los elementos (lexicográfico Aa0*)
console.log('Sort: ' + frutas); 

frutas.reverse() // Invierte el orden de todos los elementos
console.log('Reverse: ' + frutas);

// Los metodos se pueden encadenar en JavaScript

let marcasVehiculos = ['Renault','Audi','Bmw','Subaru','Seat','Dacia'];

marcasVehiculos.sort().reverse(); // Ordena los elementos y los invierte.
console.log(marcasVehiculos);


// Metodo inmutable (no modifican el valor de la variabl de tipo array)

frutas = ['manzana','naranja','melon','kiwis','fresas','sandia'];

let frutasSelecciondas = frutas.slice(2,5); // Extrae elementos desde la posicion del primer parametro incluida hasta la posicion del segundo parametro
console.log(frutasSelecciondas);

let hayPomelos = frutas.includes('sandia'); // Devuelve true o false si existe o no el elemento pasado como argumento
console.log(hayPomelos);

let mensaje = frutas.join(' | '); // Devuelve los elementos del array en un string separados por la cadena pasada como argumento o comas si no se pasa un argumento
console.log(mensaje);

let marcasEuropeas = ['SEAT','Renault','Mercedes Benz'];
let marcasAsiaticas = ['Toyota','Mazda']

let marcas = marcasEuropeas.concat(marcasAsiaticas); // Concatenar los elementos del array
console.table(marcas);
marcas = marcasEuropeas.concat('Subaru','Hiundai'); // Concatenar elementos como un push pero sin mutar
console.table(marcas);


// Paso por valor y por referencia en JavaScript

// Los tipos primitivos tienen su paso por valor

let a = 'Juan';
let b = a; // Pasa el valor 'Juan'
console.log(b);
b = 'Carlos';
console.log(b);
console.log(a); // Mantiene el valor 'Juan'

// Los tipos no primitivos tienen su paso por referencia

let c = [1,2,3];
let d = c; // El paso se produce por referencia 
console.log(d);

d.push(4);
console.log(c);
console.log(d);

// En el caso de arrays podemos romper el paso por referencia con concat

let marcasSeleccionadas = marcasEuropeas.concat();

marcasSeleccionadas.push('Peugeot','Ferrari');

console.log(marcasEuropeas);
console.log(marcasSeleccionadas);


// Operadores spread ... ECMA6 2015

let marcasCoreanas = ['Kia','Hyundai'];

marcasAsiaticas.push(...marcasCoreanas);

console.log(marcasAsiaticas);


// Parametros rest ... ECMA6 2015

function setCategorias (...categorias){
    return categorias;
}

let producto = setCategorias('Deporte','Hombres','Rebajas')
console.log(producto);
