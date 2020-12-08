const Game = require("./game/game");
const SocketServer = require("./socketServer");

/***
 *
 * Game Server File
 * This will be utilized to house the main server function/s.
 *
 ***/
class GameServer {
    constructor(server) {
        this.server = server;
        this.server.listen(8000, this.start(this))
    }

    start(gameServer) {
        gameServer.game = new Game;
        console.log('*** GAME SERVER HAS STARTED PORT: 8000 ***');

        console.log('*** SERVER: STARTING SOCKET SERVER ***');

        gameServer.io = require('socket.io')(gameServer.server);
        gameServer.socketServer = new SocketServer(gameServer.io);
        gameServer.socketServer.listen();

        console.log('*** SERVER: SOCKET SERVER STARTED ***');
    }
}

module.exports = GameServer;