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
    constructor(player) {
        // All asset loading.
        this.assetLoader = new AssetLoader;

        // All rendering / drawing.
        this.canvas = new Canvas;

        this.player = player;
        this.players = player.initPackage;

        for (player in this.players) {
            // Instantly load all the players sprites
            this.assetLoader.addImage(this.players[player].sprite.name, this.players[player].sprite.location);
        }

        // Instantly load the map and render it on game setup.
        this.assetLoader.loadMap(this.player.globalMapData);

        // Sound Related Values ( Eventually include a sound manager? )
        this.lastPlayedTileSound = 0;
    }

    startGameLoop() {
        setInterval(function () {
            /*
             * Player events.
             */
            socket.emit('playerMovement', input.getMovement());
        }, 1000 / 60); // 30 Times per second
    }

    async updatePlayersPackage(players){
        let updatedPlayersPackage = {};
        for (let p in players) {
            // Instantly load all the players sprites
            // this.assetLoader.addImage(this.players[player].sprite.name, this.players[player].sprite.location);

            let player = players[p];
            updatedPlayersPackage[player.id] = {
                // We're only allowing the front end user access to the sprite object within each player
                // As opposed to all the values of the players where they could change them and modify the game easier.
                sprite: player.sprite
            }
        }
        game.players = updatedPlayersPackage;
    }
}

module.exports = Game;