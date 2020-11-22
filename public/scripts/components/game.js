/***
 *
 * Front-end Game Component
 *
 ***/
const AssetLoader = require('./game/assets/assetLoader');
const player = require('./player/player');
const input = require('./input');

class Game {
    constructor(player) {
        this.assetLoader = new AssetLoader();

        this.player = player;
    }

    startGameLoop() {
        setInterval(function () {
            /*
             * Player events.
             */
            socket.emit('playerMovement', input.getMovement());
        }, 1000 / 30); // 30 Times per second
    }
}

module.exports = Game;

socket.on('playersState', function (players) {
    player.updatePlayersState(playerContext, players);
});