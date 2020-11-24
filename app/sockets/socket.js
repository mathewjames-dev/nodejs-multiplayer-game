/***
 *
 * Back-end Socket Component File
 *
 ***/
const constants = require('../game/constants');

// Function to setup socket.io listening messaging.
module.exports.listen = function(io, game) {
    io.sockets.on('connection', function (socket) {
        console.log('SERVER: NEW CONNECTION!');
        var socketId = socket.id;

        /*
         * PLAYER EVENT LISTENERS.
         */
        socket.on('playerMovement', function (data) {
            let player = game.getPlayer(socketId); 
            if (player) {
                player.movePlayer(data)
            }
        });


        /*
         * CHAT EVENT LISTENERS.
         */
        socket.on('sendMsgToServer', function (data) {
            console.log('SERVER: Someone sent a message!');
            // Loop all the connected socket connections and emit the add to chat signal.
            for (var i in game.getSocketList()) {
                game.getSocketList()[i].emit('addToChat', data);
            }
        });

        // Upon disconnection from the socket server, remove the socket id from the socket list.
        socket.on('disconnect', function () {
            console.log('SERVER: DISCONNECTED USER!');
            game.removePlayer(socket);
        });
    });

    return io;
}

// Basic function to return the constant SOCKET_LIST object.
module.exports.getSocketList = function() {
    return SOCKET_LIST;
}