const express = require('express');

const app = express();

const port = 3000;

app.use(express.static('public')); // Declaramos como publica la ruta de la carpeta public

// Metodo GET get(ruta, funcion flecha con req y res) 

app.get('/', (req,res) => {
    res.status(200).sendFile(__dirname + '/public/index.html');
});

app.get('/contacto', (req,res) => {
    res.status(200).sendFile(__dirname + '/public/contacto.html');
});

app.use((req,res) => {
    res.status(404).sendFile(__dirname + '/public/pagina404.html');
})

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

