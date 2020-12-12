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
        socket.on('gameUpdate', async function (updatePackage) {
            updatePackage = JSON.parse(updatePackage);
            if (global.game && game.loaded == 1) {
                await game.canvas.drawPlayerStates(updatePackage)
                    .then(async () => {
                        // Draw Player Related Elements
                        await game.canvas.drawPlayerUpdate(updatePackage.player)
                    }).then(async () => {
                        if (updatePackage.player.inventory.redraw === 1) {
                            await game.canvas.drawPlayerInventory(updatePackage.player.inventory)
                                .then(() => {
                                    socket.emit('inventoryRedrawn');
                                });
                        }
                    });
            }
        });
    }

    // Function to increase the players health by the selected amount.
    inventoryItemUsed(itemId) {
        socket.emit('inventoryItemUsed', { itemId: itemId});
    }
}

module.exports = GameSockets;
