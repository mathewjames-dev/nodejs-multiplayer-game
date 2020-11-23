/***
 *
 * Front-end Game Component
 *
 ***/
const GameSockets = require('./sockets/gameSockets');
const AssetLoader = require('./assets/assetLoader');
const Canvas = require('./render/canvas');
const input = require('./input');

class Game {
    constructor(player, mapData) {
        this.assetLoader = new AssetLoader;

        // Instantly load the player sprite
        this.assetLoader.addImage(player.sprite_name, player.sprite_location);

        // Instantly load the map and render it on game setup.
        this.assetLoader.loadMap(mapData);

        // Setup the canvas class - This will be used for our rendering.
        this.canvas = new Canvas;

        // Temporary?
        this.player = player;

        // Sound Related Values ( Eventually include a sound manager? )
        this.lastPlayedTileSound;
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