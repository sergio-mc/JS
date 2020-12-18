const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());


const product = require('./routes/product');

const port = process.env.PORT;
const mongoURI = process.env.MONGOURI; // Declaramos las variables en Node es VARIABLE_ENTORNO=valor


// Mongoose options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

// Mongoose connection
mongoose.connect(mongoURI, options)
    .then(() => {
        console.log('Connection with database successful')
    })
    .catch((err) => {
        console.log('connection with database failed', err)
    });


// Use bodyParser with urlencoded and json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/product', product);


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

// app.listen(8080, '0.0.0.0', () => {
//     console.log('Listening to port:  ' + 8080);
// });
