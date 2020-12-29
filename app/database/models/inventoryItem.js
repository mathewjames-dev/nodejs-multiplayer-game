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
const InventoryItemSchema = new Schema({
    inventoryId: String,
    itemId: String
});

const InventoryItemModel = mongoose.model('InventoryItem', InventoryItemSchema);

module.exports = InventoryItemModel;