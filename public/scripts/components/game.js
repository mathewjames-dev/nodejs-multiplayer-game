/***
 *
 * Front-end Game Component
 *
 ***/
// Setting up the components.
const render = require('./map/render');
const player = require('./player/player');

// Setup the Map Rendering
render.map.context = mapContext;
render.map.loadMap('map1');

/*
 * Player event listeners for the main game.
 */
// This is emitted from the server 30 times a second. 
// This is so that we can update the players at 30fps.
socket.on('playersState', function (players) {
    player.updatePlayersState(playerContext, players);
});