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
const SpriteSchema = new Schema({
    id: Int32,
    name: String,
    location: String,
    sheetWidth: Int32,
    sheetHeight: Int32,
    numberOfRows: Int32,
    numberOfCols: Int32,
    trackingDownRow: Int32,
    trackingUpRow: Int32,
    trackingLeftRow: Int32,
    trackingRightRow: Int32,
    totalFrames: Int32
});

const SpriteModel = mongoose.model('Sprite', SpriteSchema);

module.exports = SpriteModel;