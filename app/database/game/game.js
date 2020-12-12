/***
 *
 * Back-end Player Database Component File
 *
 ***/
const Database = require('../database');

class GameDatabase extends Database {
    constructor() {
        super();
    }

    async getItemById(itemId, callback) {
        let sql = "SELECT * FROM items WHERE id = ? ";
        this.connection.query(sql, [itemId], function (err, result, fields) {
            if (err) callback(false);
            callback(result);
        });
    }
}

module.exports = GameDatabase;