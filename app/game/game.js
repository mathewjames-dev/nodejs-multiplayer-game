/***
 *
 * Back-end Game Component File
 *
 ***/

// Import the components required.
const Player = require('../game/entities/player/player');

class Game {
    constructor() {
        this.sockets = [];
        this.players = {};
    }

    addPlayer(socketId, user, mapData) {
        // Pushing the users socket id into the socket list.
        this.sockets.push(socketId);

        // Create a player with the socket id and the map they will be spawning in
        let player = new Player({
            id: socketId,
            name: user.username,
            x: user.x,
            y: user.y,
            sprite: {
                name: user.sprite_name,
                location: user.sprite_location,
                rows: user.number_of_rows,
                cols: user.number_of_cols,
                leftRow: user.tracking_left_row,
                upRow: user.tracking_up_row,
                rightRow: user.tracking_right_row,
                downRow: user.tracking_down_row,
                frames: user.total_frames,
            },
            globalMapData: mapData
        });

        this.players[socketId] = player;
    }

    // Function to remove the player from the game.
    removePlayer(socket) {
        delete this.sockets[socket.id];
        delete this.players[socket.id];
    }

    // Function to get a player by socket id.
    getPlayer(socketId) {
        return this.players[socketId];
    }

    // Function to get all players.
    getPlayers() {
        return this.players;
    }

    // Function to get all sockets.
    getSocketList() {
        return this.sockets;
    }
}

module.exports = Game;