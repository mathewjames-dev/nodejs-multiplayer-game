/***
 *
 * Front-end Game Component
 *
 ***/

// Setting up the variables.
const mapCanvas = document.getElementById('mapContainer');
const mapContext = mapCanvas.getContext("2d");
const playerCanvas = document.getElementById('playerContainer');
const playerContext = playerCanvas.getContext("2d");
const uiCanvas = document.getElementById('uiContainer');
const uiContext = uiCanvas.getContext("2d");

// Setting up the components.
const render = require('./map/render');
const player = require('./player/player');

// Setup the Map Rendering
render.map.context = mapContext;
render.map.loadMap('map1');

/*
 * Player event listeners for the main game.
 */
// This is emitted from the server 60 times a second. This is so that we can update the players at 60fps.
socket.on('playersState', function (players) {
    player.updatePlayersState(playerContext, players);
});