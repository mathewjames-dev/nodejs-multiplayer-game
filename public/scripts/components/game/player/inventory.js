/***
 *
 * Inventory Front-end File
 * This will be utilized to house the player inventory functions.
 *
 ***/
class Inventory {
    // Function to remove and item from the inventory.
    async removeItemFromInventory(itemId) {
        socket.emit('removeItemFromInventory', { itemId: itemId });
    }


    // Function for when a potion is utilised, using type and value as the parameter.
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