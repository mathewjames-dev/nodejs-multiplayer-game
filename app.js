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
 * CLASSES
 */
const socket = require('./app/classes/socket');
const game = require('./app/classes/game');
const player = require('./app/classes/player');


/*
 * Application Routing (This can go into it's own file eventually!!!!!)
 */
// Main route for homepage.
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// Telling the server what folder to use for the client front end / static files.
app.use('/public', express.static(__dirname + '/public'));


// Start the server and make it listen on selected port.
server.listen(8000, () => {
    console.log('*** GAME SERVER HAS STARTED PORT: 8000 ***');

    console.log('*** SERVER: STARTING SOCKET SERVER ***');

    socket.listen(io);

    setInterval(function(){
        io.sockets.emit('playersState', player.getPlayers());
    }, 1000 / 60); // 60 times per second.
});
