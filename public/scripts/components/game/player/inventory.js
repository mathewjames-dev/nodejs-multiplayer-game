/***
 *
 * Inventory Front-end File
 * This will be utilized to house the player inventory functions.
 *
 ***/
class Inventory {
    constructor(player) {
           }

    async removeItemFromInventory(itemId) {
        socket.emit('removeItemFromInventory', { itemId: itemId });
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