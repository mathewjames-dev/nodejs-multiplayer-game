/***
 *
 * Front-end Main Component
 *
 ***/
const constants = require('./constants');

// Authentication
const authentication = require('./components/auth/menu');

// Chat Box
const chat = require('./components/chat/chat');

/*
 * Game Related
 */
const Game = require('./components/game');
var game;

module.exports.gameInitialize = function(player)
{
    // Setup the game instance for the player and start the client game loop.
    game = new Game(player);

    // Add the map.
    game.assetLoader.setMap(player.name);
    game.assetLoader.addSound('TownMusic', '/public/assets/sounds/TownTheme.mp3');

    // Load all assets
    game.assetLoader.loadAssets();

    $('#main-menu').hide();
    game.assetLoader.sounds.TownMusic.play();

    game.startGameLoop();
}