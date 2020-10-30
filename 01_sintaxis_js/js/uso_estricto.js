// ---- Uso estricto de JavaScript (frente a modo poco riguroso) ----

'use strict'

mensaje = 'Hola Mundo'; // No permite declarar variables sin palabra reservada

function suma(a,a){ // No permite redeclarar parametros
    return a + a;
}