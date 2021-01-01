/***
 *
 * Back-end Database User Model
 *
 ***/
const mongoose = require('mongoose');

// Defining schema.
const Schema = mongoose.Schema,
    Int32 = require('mongoose-int32');

// Defining the user schema.
const NPCSchema = new Schema({
    name: String,
    health: Int32,
    maxHealth: Int32,
    x: Int32,
    y: Int32,
    mapId: Int32,
    spriteId: Int32,
});

const NPCModel = mongoose.model('Npc', NPCSchema);

module.exports = NPCModel;