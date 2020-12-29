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
const UserSchema = new Schema({
    username: String,
    password: String,
    firstLogin: Boolean,
    health: Int32,
    maxHealth: Int32,
    x: Int32,
    y: Int32,
    mapId: Int32,
    spriteId: Int32,
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;