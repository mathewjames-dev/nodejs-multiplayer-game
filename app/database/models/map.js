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
const MapSchema = new Schema({
    name: String,
    location: String,
    id: Int32
});

const MapModel = mongoose.model('Map', MapSchema);

module.exports = MapModel;