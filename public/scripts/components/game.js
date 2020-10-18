/***
 *
 * Front-end Game Class
 *
 ***/

// Setting up the variables.
const canvas = document.getElementById('gameContainer');
canvas.width = 950;
canvas.height = 750;
const context = canvas.getContext("2d");

// Setting up the classes.
const player = require('./player/player');

/*
 * Player event listeners for the main game.
 */
// This is emitted from the server 60 times a second. This is so that we can update the players at 60fps.
socket.on('playersState', function (players) {
    player.updatePlayersState(context, players);
});