const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


const product = require('./routes/product');


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


app.listen(8080, () => {
    console.log(`Server listening at http://localhost:8080`)
})

