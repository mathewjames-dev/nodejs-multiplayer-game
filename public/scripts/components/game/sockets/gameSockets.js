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

    playerSockets() {
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

    increaseHealth(amount) {
        socket.emit('increaseHealth', { id: socket.id, health: amount });
    }
}

module.exports = GameSockets;
