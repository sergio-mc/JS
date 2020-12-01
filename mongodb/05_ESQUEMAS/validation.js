// Esquemas de validacion

// Operador $jsonSchema

// Empleo en creacion de colecciones con validacion

// use clinica2

db.createCollection("pacientes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "apellidos", "direccion"],
            properties: {
                nombre: {
                    bsonType: "string",
                    description: "debe ser string y obligatorio"
                },
                apellidos: {
                    bsonType: "string",
                    description: "debe ser string y obligatorio"
                },
                edad: {
                    bsonType: ["number", "null"],
                    minimum: 0,
                    maximum: 120,
                    description: "debe ser number y obligatorio"
                },
                fechaNacimiento: {
                    bsonType: "date",
                },
                direccion: {
                    bsonType: "object",
                    required: ["calle", "localidad"],
                    properties: {
                        calle: {
                            bsonType: "string"
                        },
                        localidad: {
                            bsonType: "string"
                        },
                        provincia: {
                            bsonType: "string",
                            enum: ["Caceres", "Madrid"]
                        },
                    }
                },
            }
        }
    }
})

// Modificacion de colecciones ya existentes ( runCommand() )
// validationLevel : Moderate  -> En actualizacion los docs antiguos que no cumplan la nueva validacion pueden seguir incumpliendola



db.empleados.insert({nombre:"Pedro", apellidos:"Gomez"})
db.empleados.insert({nombre:13})



db.runCommand({
    collMod: "empleados",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "apellidos"],
            properties: {
                nombre: {
                    bsonType: "string",
                    description: "debe ser string y obligatorio"
                },
                apellidos: {
                    bsonType: "string",
                    description: "debe ser string y obligatorio"
                },
                edad: {
                    bsonType: ["number", "null"],
                    minimum: 0,
                    maximum: 120,
                    description: "debe ser number"
                }
            }
        }
    },
    validationLevel: "moderate"
})

db.empleados.update({nombre:"Pedro"},{$set: {nombre: 12}}) // Sobre antiguo si cumplía te da error
db.empleados.insert({nombre:13}) // Sobre antiguo si no cumplia sigue dejandote pasar la validation

// validationAction : ""

db.createCollection("pacientes", {
    validator: {
        $jsonSchema: {

        }
    },
    validationAction: "warn"  // permite la escritura si no cumple la validacion pero atona en el log una advertencia
    
})