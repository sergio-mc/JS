const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    sku: {type: String, unique: true, required: true},
    description: String,
    price: Number,
    provider: String
});

module.exports = mongoose.model('Product', ProductSchema);

