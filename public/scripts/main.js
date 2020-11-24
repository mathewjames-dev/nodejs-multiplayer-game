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

// Game Initialization.
module.exports.gameInitialize = function(players, mapData)
{
    // Setup the game instance. Pass the player and the current mapData for setup.
    global.game = new Game(players, mapData);

    // Load all assets
    game.assetLoader.loadAssets();

    $('#main-menu').hide();
    game.assetLoader.sounds.background.volume = 0;
    game.assetLoader.sounds.background.currentTime = 0;
    game.assetLoader.sounds.background.loop = true;
    game.assetLoader.sounds.background.play();
    $(game.assetLoader.sounds.background).animate({
        volume: 0.3
    }, 2000);
    console.log(game.players);
    game.startGameLoop();
}