/***
 *
 * Game Front-end File
 * This will be utilized to house the main game files and structure.
 *
 ***/
const GameSockets = require('./sockets/gameSockets');
const AssetManager = require("./classes/assetManager");
const SoundManager = require("./classes/soundManager");
const Canvas = require("./canvas/canvas");
const Input = require("./input/input");

class Game {
    constructor() {
        // Will be utilized for all real time functionality.
        this.gameSockets = new GameSockets;

        // Will be utilized for all asset loading.
        this.assetLoader = new AssetManager;

        // Will be utilized for all sound functionality.
        this.soundManager = new SoundManager;

        // Will be utilized to house the game canvas and respective functions.
        this.canvas = new Canvas;

        // Will be utilized for all input functionality.
        this.input = new Input;

        this.loaded = 0;
    }

    // Function that is called upon authenticating.
    async gameInit(initPackage) {
        initPackage = JSON.parse(initPackage);

        // Load the player sprite/s.
        await this.loadPlayerSprites(initPackage.players);

        // Load the map and add the map sounds.
        await this.canvas.mapRender.loadMap(initPackage.player.mapData);

        // Draw the player inventory.
        await this.canvas.drawPlayerInventory(initPackage.player.inventory);

        // Load all the assets in the asset loader.
        await this.assetLoader.loadAssets();

        // Start the game loop.
        this.startGameLoop();
    }

    // Function to load the players sprites.
    async loadPlayerSprites(players) {
        for (let player in players) {
            if (this.assetLoader.images[players[player].sprite.name]) continue;
            // We need to add a check to see if the players image has already been loaded
            // If not we can then add that image.
            this.assetLoader.addImage(players[player].sprite.name,
                players[player].sprite.location);
        }

        await this.assetLoader.loadAssets();
    }

    // Function to start the game loop on the client side.
    startGameLoop() {
        game.loaded = 1;

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
                volume: 0.1
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