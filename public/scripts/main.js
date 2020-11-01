/***
 *
 * Front-end Main Component
 *
 ***/

// Setting the socket to global as opposed to variables. This is to combat socket not being defined within other scripts / files.
global.socket = io();

// Setting the chat file to a constant variable -> Just incase we expand and include functions within this that we need to access.
const chat = require('./components/chat/chat');

// Setting the input file to a constant variable -> We will use this for our users input on the front end.
const input = require('./components/player/input');

// Setting the game file / component to a variable so that we can utilise.
const game = require('./components/game');

/*
 * Main client game loop
 */
setInterval(function () {   
    /*
     * Player events.
     */
    socket.emit('playerMovement', input.getMovement());

}, 1000 / 60); // 60 Times per second