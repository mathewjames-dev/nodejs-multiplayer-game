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
    constructor(players, mapData) {
        // All asset loading.
        this.assetLoader = new AssetLoader;

        // All rendering / drawing.
        this.canvas = new Canvas;

        this.players = players;

        for (player in this.players) {
            // Instantly load all the players sprites
            this.assetLoader.addImage(this.players[player].sprite.name, this.players[player].sprite.location);
        }

        // Instantly load the map and render it on game setup.
        this.assetLoader.loadMap(mapData);

        // Sound Related Values ( Eventually include a sound manager? )
        this.lastPlayedTileSound;
    }

    startGameLoop() {
        setInterval(function () {
            /*
             * Player events.
             */
            socket.emit('playerMovement', input.getMovement());
        }, 1000 / 60); // 30 Times per second
    }
}

module.exports = Game;