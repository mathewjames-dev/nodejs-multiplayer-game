/***
 *
 * Inventory Front-end File
 * This will be utilized to house the player inventory functions.
 *
 ***/
const PlayerDatabase = require("../../../database/player/player");

class Inventory {
    constructor() {
        this.items = [];
        this.takenSlots = 0;
        this.maxSlots = 0;
        this.redraw = 0;
    }

    setupInventory(playerUsername) {
        return new Promise(async (resolve, reject) => {
            let inventoryObj = this;
            let playerDatabase = new PlayerDatabase;
            await playerDatabase.getPlayerInventory(playerUsername, async function (inventoryRecord) {
                if (inventoryRecord) {
                    inventoryObj.maxSlots = inventoryRecord[0].max_size;

                    await playerDatabase.getPlayerInventoryItems(inventoryRecord[0].id, async function (inventoryItems) {
                        if (inventoryItems) {
                            for (let i = 0; i < inventoryItems.length; i++) {
                                let item = inventoryItems[i];
                                if (!item) continue;

                                inventoryObj.items.push({
                                    item_id: item.id,
                                    item_name: item.name,
                                    item_image: item.image,
                                    item_properties: item.properties
                                });
                            }

                            resolve(inventoryObj);
                        }
                    });
                } else {
                    resolve(false);
                }

            });
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

        this.redraw = 1;
    }
}

module.exports = Inventory;