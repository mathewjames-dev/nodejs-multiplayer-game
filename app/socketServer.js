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
        this.io.sockets.on('connection', (socket) => {
            console.log('*** SERVER: NEW CONNECTION! ***');

            var socketId = socket.id;

            /*
             * GAME EVENT LISTENERS
             */
            // Upon disconnection from the socket server, remove the player from the game list and socket list.
            socket.on('disconnect', async () => {
                console.log('*** SERVER: DISCONNECTED USER! ***');

                // Start by removing the player from both the game and socket server.
                let player = gameServer.game.getPlayer(socketId);

                gameServer.game.removePlayer(socketId)
                    .then(gameServer.socketServer.removeSocket(socketId))
                    .then(player.updatePlayerState());
            });

            /*
             * PLAYER EVENT LISTENERS.
             */
            socket.on('playerMovement', (data) => {
                let player = gameServer.game.getPlayer(socketId);
                if (player) {
                    player.movePlayer(data)
                }
            });

            socket.on('increaseHealth', (data) => {
                let player = gameServer.game.getPlayer(data.id);
                if (player) player.health += data.health;
            });

            socket.on('removeItemFromInventory', (data) => {
                let player = gameServer.game.getPlayer(data.id);
                player.removeItemFromInventory(data);
            })

            /*
             * CHAT EVENT LISTENERS.
             */
            socket.on('sendMsgToServer', (data) => {
                console.log('SERVER: Someone sent a message!');

                gameServer.socketServer.io.emit('broadcastMessage', data);
            });
        });
    }

    // Add a socket to the list.
    addSocket(id) {
        this.sockets.push(id);
    }

    // Remove a socket from the list.
    async removeSocket(id) {
        delete this.sockets[id];
    }

    // Function to get all sockets.
    getSocketList() {
        return this.sockets;
    }
}

module.exports = SocketServer;