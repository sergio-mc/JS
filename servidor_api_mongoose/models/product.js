const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    sku: {type: String, unique: true},
    description: String,
    price: Number,
    provider: String
});

module.exports = mongoose.model('Product', ProductSchema);

