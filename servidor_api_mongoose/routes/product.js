const { json } = require('body-parser');
const express = require('express');

const app = express();

const Product = require('../models/product');



// This get method find in the database all products and projects only the name and the sku without _id for each product.
app.get('/', (req, res) => {
    Product.find({}).select({ name: 1, sku: 1, _id: 0 }).exec((err, products) => {
        if (err) {
            return res.status(500).json({
                errorMessage: 'Database error'
            });
        } else {
            res.status(200).json({
                products: products
            })
        }

    });
})


app.get('/:_id', (req, res) => {
    Product.findOne({ _id: req.params._id }, (err, product) => {
        if (err) {
            if (product === null) {
                return res.status(400).json({
                    errorMessage: 'Not founded'
                });
            }
            return res.status(500).json({
                errorMessage: 'Database error'
            });
        }
        res.status(200).json({
            product: product
        })


    })
})



app.post('/', (req, res) => {

    const propsIn = Object.keys(req.body); // Key values from req = 'name','sku','description','price','stock'

    const propsAllowed = ['name', 'sku', 'description', 'price', 'stock'];

    const validPost = propsIn.every(e => {  // This function compare both arrays by iterating each prop for both arrays and give a boolean depeding if all props macth or not.
        propsAllowed.includes(e);
    })

    if (!validPost) {
        return res.status(400).json({
            errorMessage: 'Properties not allowed'
        })
    }

    let product = new Product({
        name: req.body.name,
        sku: req.body.sku,
        description: req.body.description,
        price: req.body.price,
        provider: req.body.provider
    });


    // Send the product to db and give a response
    product.save((err, productSaved) => {
        if (err) {
            let errorMessage;
            if (err.code === 11000) {
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


app.put('/:_id', (req,res) => {

    let updatedProduct = {};

    if(req.body.name) {
        updatedProduct.name = req.body.name
    }
    if(req.body.description) {
        updatedProduct.description = req.body.description
    }
    if(req.body.price) {
        updatedProduct.price = req.body.price
    }
    if(req.body.provider) {
        updatedProduct.provider = req.body.provider
    }

    Product.findOneAndUpdate({_id: req.params._id},{$set: updatedProduct}, {new: true} ,(err, product) => {
        if(err){
            return res.status(400).json({
                errorMessage: 'Database error'
            })
        }
        res.status(200).json({
            message: `Product ${product.name} updated successfully`
        })
    })

})

app.delete('/:_id', (req,res) => {

    if(product === null) {
        return res.status(400).json({
            errorMessage: 'El registro no existe'
        })
    }

    Product.findByIdAndDelete(req.params._id, (err,product) => {
        if(err){
            return res.status(400).json({
                errorMessage: 'Database error'
            })
        }
        res.status(200).json({
            message: `Product ${product.name} deleted successfully`
        })
    });

})


module.exports = app;