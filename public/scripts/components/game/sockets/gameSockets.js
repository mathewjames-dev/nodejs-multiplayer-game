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
            if (global.game) {
                game.canvas.drawPlayerStates(updatePackage)
                    .then(async () => {
                        // Draw Player Related Elements
                        game.canvas.drawPlayerUpdate(updatePackage.player)
                    })
                    .then(game.canvas.drawPlayerInventory(updatePackage.player.inventory));
            }
        });
    }

    // Function to increase the players health by the selected amount.
    increaseHealth(amount) {
        socket.emit('increaseHealth', { id: socket.id, health: amount });
    }
}

module.exports = GameSockets;
