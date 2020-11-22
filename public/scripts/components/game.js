/***
 *
 * Front-end Game Component
 *
 ***/
const AssetLoader = require('./game/assets/assetLoader');
const player = require('./player/player');
const input = require('./input');

class Game {
    constructor(player, mapData) {
        this.assetLoader = new AssetLoader();

        // Instantly load the map and render it on game setup.
        this.assetLoader.loadMap(mapData);

        // Set the player up.
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