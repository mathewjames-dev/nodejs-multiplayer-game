/***
 *
 * Game Front-end File
 * This will be utilized to house the main game files and structure.
 *
 ***/
const GameSockets = require('./sockets/gameSockets');
const AssetLoader = require("./assets/assetLoader");
const Canvas = require("./canvas/canvas");
const Movement = require("./input/movement");
const Inventory = require('./player/inventory');

class Game {
    constructor(player) {
        //  be utilized for all real time functionality.
        this.gameSockets = new GameSockets;

        // Will be utilized for all asset loading.
        this.assetLoader = new AssetLoader;

        // Will be utilized to house the game canvas and respective functions.
        this.canvas = new Canvas;

        // Will be utilized for all movement functionality.
        this.movement = new Movement;

        // Sound Related Values ( Eventually include a sound manager? )
        this.lastPlayedTileSound = 0;

        // Logged In Player
        this.player = player;
        this.player.inventory = new Inventory(this.player);
    }

    async gameInit() {
        await this.loadPlayerSprites(this.player.initPackage)
            .then(this.canvas.mapRender.loadMap(this.player.globalMapData))
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

            socket.emit('playerMovement', game.movement.getMovement());
        }, 1000 / 60); // 30 Times per second
    }

    async updatePlayersPackage(players) {
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