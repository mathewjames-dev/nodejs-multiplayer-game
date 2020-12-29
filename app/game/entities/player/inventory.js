/***
 *
 * Inventory Front-end File
 * This will be utilized to house the player inventory functions.
 *
 ***/
const InventoryModel = require("../../../database/models/inventory");
const InventoryItemModel = require("../../../database/models/inventoryItem");
const ItemModel = require("../../../database/models/item");

class Inventory {
    constructor() {
        this.items = [];
        this.takenSlots = 0;
        this.maxSlots = 0;
        this.redraw = 0;
    }

    async setupInventory(dbId) {
        try {
            let playerInventory = await InventoryModel.findOne({ "userId": dbId }).exec();
            if (playerInventory) {
                this.maxSlots = playerInventory.maxSize;

                let playerInventoryItems = await InventoryItemModel.find({
                    "inventoryId": playerInventory._id
                });

                if (playerInventoryItems) {
                    for (let i = 0; i < playerInventoryItems.length; i++) {
                        let itemRecord = playerInventoryItems[i];
                        let item = await ItemModel.findById(itemRecord.itemId).exec();
                        if (!item) continue;

                        this.items.push({
                            id: item._id,
                            name: item.name,
                            image: item.image,
                            properties: item.properties
                        });
                    }
                }
            }
        } catch{
            throw Error;
        }        
    }

    async removeItemFromInventory(dbId, itemId) {
        try {
            var $this = this;
            this.items.some(await function (property, index) {
                try {
                    if (property.id == itemId) {
                        delete $this.items[index]
                        return true;
                    }
                } catch{
                    throw Error;
                }
            });

            let playerInventory = await InventoryModel.findOne({ "userId": dbId }).exec();
            if (playerInventory) {
                await InventoryItemModel.deleteOne({
                    "inventoryId": playerInventory._id,
                    "itemId": itemId
                });
            }

            this.redraw = 1;
        } catch{
            throw Error;
        } 
  
    }
}

module.exports = Inventory;