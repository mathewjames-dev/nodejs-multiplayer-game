/***
 *
 * Back-end Database User Model
 *
 ***/
const mongoose = require('mongoose');

// Defining schema.
const Schema = mongoose.Schema;
const Int32 = require('mongoose-int32')

// Defining the user schema.
const ItemSchema = new Schema({
    name: String,
    properties: Object,
    image: String
});

const ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;