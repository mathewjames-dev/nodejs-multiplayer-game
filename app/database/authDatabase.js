/***
 *
 * Back-end Database Component File
 *
 ***/
const bcrypt = require('bcrypt');
const Database = require('./database');
const mysql = require('mysql');

const saltRounds = 10;

class AuthDatabase extends Database {
    constructor() {
        super();
    }

    retrieveUser(username, callback) {
        let sql = "SELECT * FROM users INNER JOIN maps ON users.map_id = maps.id WHERE username = ? LIMIT 1"
        this.connection.query(sql, [username], function (err, result, fields) {
            if (err) callback(false);

            callback(result);
        });
    }

    createUser(data, callback) {
        bcrypt.hash(data.password, saltRounds, (err, hash) => {
            let sql = "INSERT INTO users (username, password) VALUES ('?', '?')";
            this.connection.query(sql, [data.username, hash] , function (err, result) {
                if (err) callback(err);

                callback(result);
            });
        });
    }

    authenticateUser(data, callback) {
        this.retrieveUser(data.username, function (user) {
            bcrypt.compare(data.password, user[0].password, function (error, response) {
                if (response) {
                    callback(user[0]);
                } else {
                    callback(false);
                }
            });
        }) 
    }
}

module.exports = AuthDatabase;