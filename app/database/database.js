/***
 *
 * Back-end Database Component File
 *
 ***/
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Database {
    constructor() {
        this.host = "localhost";
        this.user = "root";
        this.password = "";

        // Setup the connection to the database.
        this.connection = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: "mathewjamesdev_nodegame"
        });
        this.connection.connect();
    }

    retrieveUser(username, callback) {
        this.connection.query("SELECT * FROM users WHERE username = '" + username + "' LIMIT 1", function (err, result, fields) {
            if (err) callback(false);

            callback(result);
        });
    }

    createUser(data, callback) {
        bcrypt.hash(data.password, saltRounds, (err, hash) => {
            let sql = "INSERT INTO users (username, password) VALUES ('" + data.username + "', '" + hash + "')";
            this.connection.query(sql, function (err, result) {
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

module.exports = Database;