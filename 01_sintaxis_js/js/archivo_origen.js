export class Vehiculo { 

    constructor (marcaIn,modeloIn,colorIn) {
        this.marca = marcaIn;
        this.modelo = modeloIn;
        this.color = colorIn;

        let precio;
        this.setPrecio = valor => precio = valor;
        this.getPrecio = () => precio; 
        this.getPrecio = _ => precio; 

    }

    cambiarColor(color){
        this.color = color;
    }
}

// Exporta la clase