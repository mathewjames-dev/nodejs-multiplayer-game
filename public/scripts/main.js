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
const game = require('./components/game');
const input = require('./components/input');

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
}, 1000 / 60); // 60 Times per second
