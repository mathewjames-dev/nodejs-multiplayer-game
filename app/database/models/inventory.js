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
const InventorySchema = new Schema({
    userId: String,
    maxSize: Int32
});

const InventoryModel = mongoose.model('Inventory', InventorySchema);

module.exports = InventoryModel;