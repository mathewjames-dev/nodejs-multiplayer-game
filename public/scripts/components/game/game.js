/***
 *
 * Game Front-end File
 * This will be utilized to house the main game files and structure.
 *
 ***/
const GameSockets = require('./sockets/gameSockets');
const AssetLoader = require("./assets/assetLoader");
const Canvas = require("./canvas/canvas");
const Input = require("./input/input");

class Game {
    constructor() {
        // Will be utilized for all real time functionality.
        this.gameSockets = new GameSockets;

        // Will be utilized for all asset loading.
        this.assetLoader = new AssetLoader;

        // Will be utilized to house the game canvas and respective functions.
        this.canvas = new Canvas;

        // Will be utilized for all input functionality.
        this.input = new Input;

        // Sound Related Values ( Eventually include a sound manager? )
        this.lastPlayedTileSound = 0;
    }

    async gameInit(initPackage) {
        initPackage = JSON.parse(initPackage);
        await this.loadPlayerSprites(initPackage.players)
            .then(this.canvas.mapRender.loadMap(initPackage.player.globalMapData))
            .then(this.assetLoader.loadAssets)
            .then(this.startGameLoop);
    }

    async loadPlayerSprites(players) {
        for (let player in players) {
            if (this.assetLoader.images[players[player].sprite.name]) continue;
            // We need to add a check to see if the players image has already been loaded
            // If not we can then add that image.
            this.assetLoader.addImage(players[player].sprite.name,
                players[player].sprite.location);
        }
    }

    startGameLoop() {
        /*
         * Temporary Code
         */
        $('#main-menu').hide();
        $('#inventory').show();
        $('.chatContainer').show();

        if (game.assetLoader.sounds.background) {
            game.assetLoader.sounds.background.volume = 0;
            game.assetLoader.sounds.background.currentTime = 0;
            game.assetLoader.sounds.background.loop = true;
            game.assetLoader.sounds.background.play();
            $(game.assetLoader.sounds.background).animate({
                volume: 0.3
            }, 2000);
        }

        setInterval(function () {
            /*
             * Player events.
             */

            socket.emit('playerMovement', game.input.getMovement());
        }, 1000 / 60); // 30 Times per second
    }
}

module.exports = Game;