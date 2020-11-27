/***
 *
 * Socket Server File
 * This will be utilized to house the main socket function/s.
 *
 ***/

class SocketServer {
    constructor(io) {
        this.io = io;
        this.sockets = [];
    }

    listen() {
        this.io.sockets.on('connection', function (socket) {
            console.log('*** SERVER: NEW CONNECTION! ***');

            var socketId = socket.id;

            /*
             * GAME EVENT LISTENERS
             */
            // Upon disconnection from the socket server, remove the player from the game list and socket list.
            socket.on('disconnect', function () {
                console.log('*** SERVER: DISCONNECTED USER! ***');
                gameServer.game.removePlayer(socketId);
                gameServer.socketServer.removeSocket(socketId);
            });

            /*
             * PLAYER EVENT LISTENERS.
             */
            socket.on('playerMovement', function (data) {
                let player = gameServer.game.getPlayer(socketId);
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
                for (let i in gameServer.socketServer.getSocketList()) {
                    gameServer.socketServer.getSocketList()[i].emit('addToChat', data);
                }
            });
        });
    }

    // Add a socket to the list.
    addSocket(id) {
        this.sockets.push(id);
    }

    // Remove a socket from the list.
    removeSocket(id) {
        delete this.sockets[id];
    }

    // Function to get all sockets.
    getSocketList() {
        return this.sockets;
    }
}

module.exports = SocketServer;