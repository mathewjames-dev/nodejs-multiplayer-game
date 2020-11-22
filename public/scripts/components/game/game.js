/***
 *
 * Front-end Game Component
 *
 ***/
const AssetLoader = require('./assets/assetLoader');
const input = require('./input');

class Game {
    constructor(player, mapData) {
        this.gameSockets = require('./sockets/gameSockets');
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