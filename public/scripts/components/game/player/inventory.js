/***
 *
 * Inventory Front-end File
 * This will be utilized to house the player inventory functions.
 *
 ***/
class Inventory {
    constructor(player) {
        this.takenSlots = 0;
        this.maxSlots = 0;
        this.items;

        this.setupInventory(player.username);
    }

    async setupInventory(username) {
        routes.getPlayerInventory(username, async function (r) {
            if (r.status == 200) {
                game.player.inventory.takenSlots = r.data.inventory.items.length;
                game.player.inventory.maxSlots = r.data.inventory.max_size;

                game.player.inventory.items = r.data.inventory.items;

                //WE NEED TO LOAD THE IMAGES IF THEY HAVENT BEEN LOADED ALREADY
                let inventoryList = $('#inventory-list');
                inventoryList.html();

                for (let i = 0; i < game.player.inventory.maxSlots; i++) {
                    let item = game.player.inventory.items[i];

                    if (!item) {
                        inventoryList.append("<li>" +
                            "<div class='item'>" +
                            "</div> " +
                            "</li>");
                    } else {
                        item.item_properties = JSON.parse(item.item_properties);

                        inventoryList.append("<li>" +
                            "<div data-value='" + item.item_properties.value + "'  data-name='" + item.item_name + "' " +
                            "data-type='" + item.item_properties.type + "' class= 'item' > " +
                            "<img src='" + item.item_image + "'/>" +
                            "</div> " +
                            "</li>");
                    }
                }
            }
        })
    }

    async potionUsed(type, value) {
        // Emit the appropriate call based on potion type.
        switch (type) {
            case 'Health Potion':
                game.gameSockets.increaseHealth(value);
                break;
        }
    }
}

module.exports = Inventory;