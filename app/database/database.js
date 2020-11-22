/***
 *
 * Back-end Database Component File
 *
 ***/
const mysql = require('mysql');

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
}

module.exports = Database;