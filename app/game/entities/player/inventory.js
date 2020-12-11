/***
 *
 * Inventory Front-end File
 * This will be utilized to house the player inventory functions.
 *
 ***/
const PlayerDatabase = require("../../../database/player/player");

class Inventory {
    constructor(player) {
        this.takenSlots = 0;
        this.maxSlots = 0;
        this.items = [];

        this.setupInventory(player);
    }

    setupInventory(player) {
        let inventoryObj = this;
        let playerDatabase = new PlayerDatabase;
        playerDatabase.getPlayerInventory(player.username, function (inventory) {
            if (inventory) {
                inventoryObj.takenSlots = inventory.length;
                for (let i = 0; i < inventory.length; i++) {
                    let item = inventory[i];
                    if (!item) continue;
                    if (inventoryObj.maxSlots == 0) inventoryObj.maxSlots = item.max_size;

                    inventoryObj.items.push({
                        item_id: item.id,
                        item_name: item.name,
                        item_image: item.image,
                        item_properties: item.properties
                    });
                }
            }
        });
    }

    removeItemFromInventory(player, itemId) {
        this.items.some(function (property, index) {
            if (property.item_id === itemId) {
                delete player.inventory.items[index]
                return true;
            }
        });
        let playerDatabase = new PlayerDatabase;
        playerDatabase.removeItemFromInventory(player, itemId);
    }
}

module.exports = Inventory;