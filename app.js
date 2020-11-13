/***
 *
 * Main Game / App File.
 *  
 ***/
// Including express and storing it against a variable.
const express = require('express');

// Setting up the instance of the app
const app = express();

// Setting up the server
const server = require('http').createServer(app);

// Setting up real time with socket.io
const io = require('socket.io')(server);

/*
 * Component Files
 */
// Will be used for all socket.io communications
const socket = require('./app/sockets/socket');

// File utilized for routing.
const routes = require('./app/routes/routes')(app, express, __dirname);

// Game Component
const Game = require('./app/game/game');
const game = new Game();

// Start the server and make it listen on selected port.
server.listen(8000, () => {
    console.log('*** GAME SERVER HAS STARTED PORT: 8000 ***');

    console.log('*** SERVER: STARTING SOCKET SERVER ***');

    socket.listen(io, game);

    setInterval(function(){
        io.sockets.emit('playersState', game.getPlayers());
    }, 1000 / 60); // 60 times per second.
});
