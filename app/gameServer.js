const Game = require("./game/game");
const SocketServer = require("./socketServer");
const Database = require("./database/database");

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

    async start(gameServer) {
        gameServer.game = new Game;
        let database = new Database();

        await gameServer.game.loadMaps()
            .catch((err) => {
                console.log(err);
                return;
            });

        console.log('*** GAME SERVER HAS STARTED PORT: 8000 ***');

        console.log('*** SERVER: STARTING SOCKET SERVER ***');

        gameServer.io = require('socket.io')(gameServer.server);
        gameServer.socketServer = new SocketServer(gameServer.io);
        gameServer.socketServer.listen();

        gameServer.game.startGameLoop();

        console.log('*** SERVER: SOCKET SERVER STARTED ***');
    }
}

module.exports = GameServer;