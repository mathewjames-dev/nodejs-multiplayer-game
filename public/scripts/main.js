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
global.game;

// Game Initialization.
module.exports.gameInitialize = function(player, mapData)
{
    // Setup the game instance. Pass the player and the current mapData for setup.
    game = new Game(player, mapData);

    // Load all assets
    game.assetLoader.loadAssets();

    $('#main-menu').hide();
    game.assetLoader.sounds.background.volume = 0.5;
    game.assetLoader.sounds.background.loop = true;
    game.assetLoader.sounds.background.play();

    game.startGameLoop();
}