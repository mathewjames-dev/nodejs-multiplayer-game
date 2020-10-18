/***
 *
 * Backend Socket Class
 *
 ***/
// Import the classes required.
const player = require('./player');

// Setting up an empty object for the socket list.
const SOCKET_LIST = {};

// Function to setup socket.io listening messaging.
module.exports.listen = function(io) {
    io.sockets.on('connection', function (socket) {
        console.log('SERVER: NEW CONNECTION!');

        // Setting the user up with a socket id.
        var socketId = Math.random();

        // Pushing that users socket id into the socket list.
        SOCKET_LIST[socketId] = socket;

        // Setup the new player through the player class.
        player.addPlayer(socketId);

        /*
         * PLAYER EVENT LISTENERS.
         */
        socket.on('playerMovement', function(data){
            player.movePlayer(socketId, data)
        });


        /*
         * CHAT EVENT LISTENERS.
         */
        socket.on('sendMsgToServer', function (data) {
            console.log('SERVER: Someone sent a message!');
            // Loop all the connected socket connections and emit the add to chat signal.
            for (var i in SOCKET_LIST) {
                SOCKET_LIST[i].emit('addToChat', data);
            }
        });

        // Upon disconnection from the socket server, remove the socket id from the socket list.
        socket.on('disconnect', function () {
            console.log('SERVER: DISCONNECTED USER!');
            delete SOCKET_LIST[socketId];
            player.removePlayer(socketId);
        });
    });

    return io;
}

// Basic function to return the constant SOCKET_LIST object.
module.exports.getSocketList = function() {
    return SOCKET_LIST;
}