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
        socket.on('playersState', function (players) {
            if (global.game) {
                let $players = players;
                game.updatePlayersPackage($players)
                    .then(function () {
                        game.canvas.drawPlayerStates($players);
                    });
            }
        });
    }

    increaseHealth(amount) {
        socket.emit('increaseHealth', { id: socket.id, health: amount });
    }
}

module.exports = GameSockets;
