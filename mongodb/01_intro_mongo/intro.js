// Apuntes y codigo de operaciones Mongo


// Base de datos
// Colecciones <= tablas
// Documento <= registro/filas como se quier llamar | Limite 16 MB

// **************************************************************************

// --- Formato de los documentos ---

// - La shell interpreta JavaScript
// - Escribimos las operaciones de Mongo en JSON
// - Almacenamos internamente como BSON (Porque soporta mas tipos de datos)

// **************************************************************************


// --- Campo _id ---

// - Es clave unica y es obligatorio
// - Si no se introduce _id en los nuevos registros, MongoDB lo crea usando el formato ObjectId()
// - El _id es inmutable (ni modificar ni eliminar una vez creado)
// - El _id puede tener tipos diferentes de datos para la misma coleccion
// - El _id puede tener cualquier tipo de datos pero no puede tener arrays aunque si documentos

db.foo.insert({_id:["0457","5164"] , nombre:"Carlos"})
WriteResult({
        "nInserted" : 0,
        "writeError" : {
                "code" : 2,
                "errmsg" : "can't use an array for _id"
        }
})

db.foo.insert({_id: {old: "0457",new:"E2234"},nombre:"Laura"}) // Documento como _id

// **************************************************************************


// --- Principales caracteristicas y comando de la Shell de Mongo ---

// - show dbs -> mostrar bases de datos
// - use -> alternamos entre las bases de datos y creamos nueva
// - db -> nos devuelve la base de datos en la que estamos
// - show collections -> muestra las coleccion de esa base de datos


// **************************************************************************


// --- Operaciones en la shell en colecciones tienen la siguiente sintaxis ---

db.<coleccion>.metodo1(documentos-json).metodo2(documentos-json)...

// - Si fueran en base de datos

db.metodo1(documentos-json)

// Los documentos Json se pueden sustituir por objetos JavaScript y la Shell los parsea


// **************************************************************************


// --- Nombres de colecciones (deben cumplir reglas de identificadores JS) ---

// -- Si necesitamos nombres que incumplan 

db.createCollection("01_inventario")

// En estos casos las llamadas a las colecciones usaran siempre getCollection

db.getCollection("01_inventario").insert({a:3})
db.getCollection("01_inventario").find()

// - Eliminar coleccion

db.<coleccion>.drop() // Elimina totalmente sin preguntar

// - Eliminar base datos

db.dropDatabase() // Elimina totalmente sin preguntar


// **************************************************************************


// Shell soporta JavaScript

let registros = [];

for (i = 0; i < 100; i++){
    registros.push({a:i})
};

// Shell devuelve los documentos de la base de datos en un cursor con un limite por defecto de 20 documentos. 

// Para iterar los siguientes documentos del cursor empleamos: 

it

// Si devolvemos una consulta a una variable la devuelve completa (no limita a 20 documentos)

let documentos = db.foo.find();

// Hay un metodo pretty para sangrar los documentos

<...salida...>.pretty()

// Comprobacion de tipos en la shell

db.pacientes.insert({
    nombre: "Laura",
    edad: 12
})

let pacientes = db.pacientes.findOne()
typeof pacientes.edad
number