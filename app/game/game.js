/***
 *
 * Back-end Game File
 *
 ***/

// Import the components required.
const Player = require('../game/entities/player/player');
const Map = require('./map/map');

class Game {
    constructor() {
        this.players = {};
    }

    startGameLoop() {
        // Main Game Loop
        setInterval(async function () {
            // Update States
            if (await gameServer.game.getPlayers()) {
                //Update the player states.
                await gameServer.game.updatePlayers();
                gameServer.io.sockets.emit('playersState', await gameServer.game.getPlayers());
            }

        }, 1000 / 60); // 60 times per second.
    }

    createPlayer(socketId, user) {
        return new Promise((resolve, reject) => {
            // Get all the map data required for the front end.
            let map = new Map(user.map_name, user.map_location);

            map.getMapData()
                .then(mapData => map.getMapSounds(mapData))
                .then(function (mapData) {
                    // Pushing the users socket id into the socket list.
                    gameServer.socketServer.addSocket(socketId);

                    // Create a player with the socket id and the map they will be spawning in
                    let player = new Player({
                        id: socketId,
                        name: user.username,
                        health: user.health,
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
                            spriteWidth: user.sheet_width / user.number_of_cols,
                            spriteHeight: user.sheet_height / user.number_of_rows,
                            animation: {
                                currentFrame: 0,
                                totalFrames: user.total_frames,
                                srcX: 0,
                                srcY: 0
                            }
                        },
                        globalMapData: mapData
                    });
                    gameServer.game.addPlayer(socketId, player);
                    player.initPackage = gameServer.game.getPlayerInitPackage();

                    resolve(player);
                });
        });
    }

    addPlayer(socketId, player) {
        this.players[socketId] = player;
    }

    // Function to remove the player from the game.
    removePlayer(socket) {
        delete this.players[socket.id];
    }

    // Function to get a player by socket id.
    getPlayer(socketId) {
        return this.players[socketId];
    }

    // Function to get all players.
    async getPlayers() {
        return this.players;
    }

    // Function to update players.
    async updatePlayers(){
        for (let player in this.players) {
            let p = this.players[player];
            p.updateEntityAnimation(p);
        }
    }

    // Get a new players initialization package.
    getPlayerInitPackage() {
        let initPackage = {};
        for (let player in this.players) {
            let p = this.players[player];
            initPackage[p.id] = {
                // We're only allowing the front end user access to the sprite object within each player
                // As opposed to all the values of the players where they could change them and modify the game easier.
                sprite: p.sprite
            }
        }

        return initPackage;
    }
}

module.exports = Game;