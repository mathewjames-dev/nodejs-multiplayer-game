/***
 *
 * Back-end Player Database Component File
 *
 ***/
const Database = require('../database');

class PlayerDatabase extends Database {
    constructor() {
        super();
    }

    async getPlayerInventory(username, callback) {
        let sql = "SELECT inv.max_size, item.* FROM users " +
            "INNER JOIN inventory inv ON users.id = inv.id " +
            "LEFT JOIN inventory_items itemPivot on inv.id = itemPivot.inventory_id " +
            "LEFT JOIN items item on itemPivot.item_id = item.id " +
            "WHERE username = ?"
        this.connection.query(sql, [username], function (err, result, fields) {
            if (err) callback(false);
            callback(result);
        });
    }
}

module.exports = PlayerDatabase;