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

    async getPlayer(username, callback) {
        let sql = "SELECT * from users WHERE username = ?";
        this.connection.query(sql, [username], function (err, result, fields) {
            if (err) callback(false);
            callback(result);
        });
    }

    async getPlayerInventoryId(username, callback) {
        await this.getPlayer(username, (player) => {
            let sql = "SELECT inventory.id FROM inventory " +
                "WHERE user_id = ? ";
            this.connection.query(sql, [player[0].id], function (err, result, fields) {
                if (err) callback(false);
                callback(result);
            })
        })
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

    async updatePlayerState(player) {
        let sql = "UPDATE users SET health = ?, x = ?, y = ? " +
            "WHERE username = ?";
        this.connection.query(sql, [player.health, player.x, player.y, player.username], function (err, result, fields) {
        });
    }

    async removeItemFromInventory(player, itemId) {
        let $this = this;
        this.getPlayerInventoryId(player.username, (inventory) => {
            let sql = "DELETE from inventory_items WHERE item_id = ? AND inventory_id = ? LIMIT 1";
            $this.connection.query(sql, [itemId, inventory[0].id], function (err, result, fields) {
                if (err) console.log(err);
            });
        });
    }
}

module.exports = PlayerDatabase;