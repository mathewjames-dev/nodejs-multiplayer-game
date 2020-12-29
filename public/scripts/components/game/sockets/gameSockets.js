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

                    // Then do sound related stuff.
                    .then(() => {
                        for (let id in updatePackage.players) {
                            let player = updatePackage.players[id],
                                playerX = Math.round(player.x / 16),
                                playerY = Math.round(player.y / 16);

                            // SOUND RELATED
                            let sound = '';
                           /* for (let l in player.mapData.data.layers) {
                                let layer = player.mapData.data.layers[l];
                                let properties = layer.properties;
                                console.log(properties);
                                for (let p in properties) {
                                    let prop = properties[p];
                                    if (prop.name === 'sound' && layer.data[playerY * player.mapData.width + playerX] > 0) {
                                        sound = prop.value;
                                    }
                                }
                            }

                            if (player.movement.up || player.movement.down || player.movement.right || player.movement.left) {
                                if (game.assetLoader.sounds[sound]) {
                                    game.assetLoader.sounds[sound].play();
                                    game.lastPlayedTileSound = sound;
                                }
                            } else {
                                if (game.assetLoader.sounds[game.lastPlayedTileSound]) {
                                    game.assetLoader.sounds[game.lastPlayedTileSound].pause();
                                }
                            }*/
                        }
                    });
            }
        });
    }

    // Function to increase the players health by the selected amount.
    inventoryItemUsed(itemId) {
        socket.emit('inventoryItemUsed', { itemId: itemId });
    }
}

module.exports = GameSockets;
