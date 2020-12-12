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

    // Function to get the players user record by username.
    async getPlayer(username, callback) {
        let sql = "SELECT * from users WHERE username = ?";
        this.connection.query(sql, [username], function (err, result, fields) {
            if (err) callback(false);
            callback(result);
        });
    }

    // Function to get the players inventory record.
    async getPlayerInventory(username, callback) {
        let sql = "SELECT inv.* FROM users " +
            "INNER JOIN inventory inv ON users.id = inv.id " +
            "WHERE username = ?";
        this.connection.query(sql, [username], function (err, result, fields) {
            if (err) callback(false);
            callback(result);
        });
    }

    // Function to get the items within the players inventory.
    async getPlayerInventoryItems(inventoryId, callback) {
        let sql = "SELECT items.* FROM items " +
            "INNER JOIN inventory_items invItems ON items.id = invItems.item_id " +
            "WHERE invItems.inventory_id = ?";
        this.connection.query(sql, [inventoryId], function (err, result, fields) {
            if (err) callback(false);
            callback(result);
        });
    }
   // "LEFT JOIN inventory_items itemPivot on inv.id = itemPivot.inventory_id " +
        //"LEFT JOIN items item on itemPivot.item_id = item.id " +

    // Function to remove an item from a players inventory by item id (First instance)
    async removeItemFromInventory(player, itemId) {
        let $this = this;
        this.getPlayerInventory(player.username, (inventory) => {
            let sql = "DELETE from inventory_items WHERE item_id = ? AND inventory_id = ? LIMIT 1";
            $this.connection.query(sql, [itemId, inventory[0].id], function (err, result, fields) {
                if (err) console.log(err);
            });
        });
    }

    // Function to update the players state in the database.
    async updatePlayerState(player) {
        let sql = "UPDATE users SET health = ?, x = ?, y = ? " +
            "WHERE username = ?";
        this.connection.query(sql, [player.health, player.x, player.y, player.username], function (err, result, fields) {
        });
    }
}

module.exports = PlayerDatabase;