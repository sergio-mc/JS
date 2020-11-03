// --- Declaración de objetos mediante clases (ECMA6 2015)

class Vehiculo {

    constructor (marcaIn,modeloIn,colorIn) {
        this.marca = marcaIn;
        this.modelo = modeloIn;
        this.color = colorIn;

        // Forma de tener una propiedad privada // Se necesitará metodos para setearlos
        let precio;
        this.setPrecio = valor => precio = valor;
        this.getPrecio = () => precio; // Funcion get()
        this.getPrecio = _ => precio; // Los parentesis vacios pueden cambiar por _

    }

    cambiarColor(color){
        this.color = color;
    }
}

let vehiculo1 = new Vehiculo('Subaru','Brz','Blanco');

console.table(vehiculo1);
console.log(vehiculo1.marca);

vehiculo1.setPrecio(30000);
console.table(vehiculo1.getPrecio()); // Al ser privada no se puede obtener esta propiedad, para ello hace falta una funcion get()


// Clases con propiedades privadas (de muy reciente implementacion de soporte para navegadores)
// Metodos get y set 

class Empleado {

    nombre;
    apellidos;
    #edad; // Esta propiedad sería privada
    #dni;

    constructor(nombre, apellidos){
        this.nombre = nombre;
        this.apellidos = apellidos;
    }

    setEdad(e) {
        this.#edad = e;
    }

    getEdad() {
        return this.#edad;
    }

    set dni(dniIn){
        this.#dni = dniIn;
    }

    get dni(){
        return this.#dni;
    }
}

let empleado1 = new Empleado('Sergio','Marron');
empleado1.setEdad(25);
console.table(empleado1);
console.log(empleado1.getEdad());

empleado1.dni = '5421556X'; // En la invocacion los metodos get y set se usan como propiedades
console.log(empleado1.dni);


// Herencia

class Rectangulo {

    #alto;
    #ancho;

    constructor(alto,ancho){
        this.#alto = alto;
        this.#ancho = ancho;
    }

    getArea(){
        return this.#alto * this.#ancho;
    }
}

let poligono1 = new Rectangulo(10,20);
console.log('Area: ' + poligono1.getArea());

class Cuadrado extends Rectangulo{
    constructor(lado){
        super(lado,lado);
        this.lado = lado;
    }

    getMensajeArea(){
        return 'El area es ' + super.getArea();
    }
}

let poligono2 = new Cuadrado(15);
console.log(poligono2.getArea());
console.log(poligono2.getMensajeArea());