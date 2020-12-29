/***
 *
 * Back-end Auth Database Component File
 *
 ***/
const bcrypt = require('bcrypt');
const Database = require('./database');
const UserModel = require('./models/user');
const InventoryModel = require('./models/inventory');

const saltRounds = 10;

class AuthQueries extends Database {
    constructor() {
        super();
    }

    async retrieveUser(username) {
        try {
            const user = UserModel.findOne({ 'username': username }).exec();
            return user;
        } catch (err) {
            throw Error;
        }
    }

    async createUser(data, callback) {
        bcrypt.hash(data.password, saltRounds, (err, hash) => {
            var userModel = new UserModel({
                username: data.username,
                password: hash,
                firstLogin: true,
                health: 100,
                maxHealth: 100,
                mapId: 2,
                spriteId: 1
            });

            userModel.save((err, user) => {
                if (err) callback(false);

                var inventoryModel = new InventoryModel({
                    userId: user._id,
                    maxSize: 8
                }).save((err, inventory) => {
                    if (err) throw Error;

                    callback(user);
                })
            })
        });
    }

    async authenticateUser(data, callback) {
        let user = await this.retrieveUser(data.username);

        if (user) {
            bcrypt.compare(data.password, user.password, (error, response) => {
                if (response) {
                    callback(user);
                } else {
                    throw Error;
                }
            });
        } else {
            throw Error;
        }
    }
}

module.exports = AuthQueries;