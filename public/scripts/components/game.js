/***
 *
 * Front-end Game Component
 *
 ***/
// Setting up the components.
const AssetLoader = require('./game/assets/assetLoader');
const assetLoader = new AssetLoader();

const player = require('./player/player');
const input = require('./input');

/*
 * Main client game loop
 */
setInterval(function () {
    if (playerIsAuthenticated) {
        /*
         * Player events.
         */
        socket.emit('playerMovement', input.getMovement());
    }
}, 1000 / 30); // 30 Times per second


/*
 * Player event listeners for the main game.
 */
module.exports.playerInitialize = function(player){
    // Once player is authenticated we need to set everything up.

    // Add the map.
    assetLoader.setMap(player.name);
    assetLoader.addSound('TownMusic', '/public/assets/sounds/TownTheme.mp3');

    // Load all assets
    assetLoader.loadAssets();

    $('#main-menu').hide();
    playerIsAuthenticated = true;
    assetLoader.sounds.TownMusic.play();
}

socket.on('playersState', function (players) {
    player.updatePlayersState(playerContext, players);
});