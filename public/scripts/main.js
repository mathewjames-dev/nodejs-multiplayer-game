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
const Game = require('./components/game/game');
var game;

// Game Initialization.
module.exports.gameInitialize = function(player, mapData)
{
    // Setup the game instance. Pass the player and the current mapData for setup.
    game = new Game(player, mapData);

    game.assetLoader.addSound('TownMusic', '/public/assets/sounds/TownTheme.mp3');

    // Load all assets
    game.assetLoader.loadAssets();

    $('#main-menu').hide();
    game.assetLoader.sounds.TownMusic.play();

    game.startGameLoop();
}