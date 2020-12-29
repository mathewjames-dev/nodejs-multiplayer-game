/***
 *
 * Game Sockets Front-end File
 * This will be utilized to house the game sockets.
 *
 ***/
class GameSockets {
    constructor() {
        this.playerSockets();
    }

    // Function that will house all the player related socket functions.
    playerSockets() {
        // Listening for the game update package from the server side game loop.
        socket.on('gameUpdate', async (updatePackage) => {
            updatePackage = JSON.parse(updatePackage);
            if (global.game && game.loaded == 1) {
                // First we will draw the states -> This includes players, and other entities.
                await game.canvas.drawStates(updatePackage)
                    // Then we will draw the player related updates.
                    .then(game.canvas.drawPlayerUpdate(updatePackage.player))

                    // Then we will draw the players inventory.
                    .then(async () => {
                        // Check if the inventory needs to be redrawn.
                        if (updatePackage.player.inventory.redraw === 1) {
                            await game.canvas.drawPlayerInventory(updatePackage.player.inventory)
                                .then(() => {
                                    socket.emit('inventoryRedrawn');
                                });
                        }
                    })

                    // Then we can do all the sound updating.
                    .then(game.soundManager.updateSounds(updatePackage))
            }
        });
    }

    // Function to increase the players health by the selected amount.
    inventoryItemUsed(itemId) {
        socket.emit('inventoryItemUsed', { itemId: itemId });
    }
}

module.exports = GameSockets;
