const http = require('http');

const port = 3000;


let equipos = [
    { nombre: 'Real Madrid', localidad: 'Madrid' },
    { nombre: 'Atletico Madrid', localidad: 'Madrid' },
    { nombre: 'Getafe A.G', localidad: 'Getafe' },
    { nombre: 'Leganes', localidad: 'Leganes' },
]


http.createServer((request, response) => {


    switch (request.url) {
        case "/":
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            response.write('BIENVENIDOS!');
            break;
        case "/equipos":
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(equipos));
            break;

        default:
            break;
    }







    response.end();
}).listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});


