const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();


const product = require('./routes/product');

const port = process.env.PORT; // Declaramos las variables en Node es VARIABLE_ENTORNO=valor


// Mongoose options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

// Mongoose connection
mongoose.connect('mongodb://localhost:27017/erp', options)
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

