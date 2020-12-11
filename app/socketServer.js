/***
 *
 * Socket Server File
 * This will be utilized to house the main socket function/s.
 *
 ***/

const GameDatabase = require("./database/game/game");

class SocketServer {
    constructor(io) {
        this.io = io;
        this.sockets = [];
    }

    listen() {
        this.io.sockets.on('connection', (socket) => {
            console.log('*** SERVER: NEW CONNECTION! ***');

            this.sockets[socket.id] = socket;
            var socketId = socket.id;

            /*
             * GAME EVENT LISTENERS
             */
            // Upon disconnection from the socket server, remove the player from the game list and socket list.
            socket.on('disconnect', async () => {
                console.log('*** SERVER: DISCONNECTED USER! ***');

                // Start by removing the player from both the game and socket server.
                let player = gameServer.game.players[socketId];
                if (!player) {
                    gameServer.socketServer.removeSocket(socketId);
                } else {
                    gameServer.game.removePlayer(socketId)
                        .then(gameServer.socketServer.removeSocket(socketId))
                        .then(player.updatePlayerState());
                }
            });

            /*
             * PLAYER EVENT LISTENERS.
             */
            socket.on('playerMovement', (data) => {
                let player = gameServer.game.players[socketId];
                if (player) player.movePlayer(data)
            });

            socket.on('inventoryItemUsed', async (data) => {
                var player = gameServer.game.players[socket.id];
                let gameDatabase = new GameDatabase;

                gameDatabase.getItemById(data.itemId, function (item) {
                    let itemProperties = JSON.parse(item[0].properties);
                    console.log(player.maxHealth);
                    if (itemProperties.type === 'Health Potion' && player.health < player.maxHealth) {
                        player.health += itemProperties.value;
                        player.inventory.removeItemFromInventory(player, data.itemId);
                    }
                })

            });

            /*
             * CHAT EVENT LISTENERS.
             */
            socket.on('sendMsgToServer', (data) => {
                console.log('SERVER: Someone sent a message!');

                gameServer.socketServer.io.emit('broadcastMessage', data);
            });
        });
    }

    // Remove a socket from the list.
    async removeSocket(id) {
        delete this.sockets[id];
    }
}

module.exports = SocketServer;