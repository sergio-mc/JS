const express = require('express');

const app = express();

const Product = require('../models/product');




app.post('/', (req, res) => {

    let product = new Product({
        name: req.body.name,
        sku: req.body.sku,
        description: req.body.description,
        price: req.body.price,
        provider: req.body.provider
    });


    // Send the product to db and give a response
    product.save((err, productSaved) => {
        if(err){
            let errorMessage;
            if(err.code === 11000){
                errorMessage = 'Sku code already exists'
            } else {
                errorMessage = 'Data base error'
            }


            return res.status(400).json({
                message: errorMessage,
                err: err
            })
        } 
        res.status(200).json({
            message: 'ok'
        });
    });





})




module.exports = app;