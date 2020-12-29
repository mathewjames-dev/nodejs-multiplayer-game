/***
 *
 * Back-end Player Database Component File
 *
 ***/
const Database = require('./database');

class PlayerQueries extends Database {
    constructor() {
        super();
    }
  
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

module.exports = PlayerQueries;