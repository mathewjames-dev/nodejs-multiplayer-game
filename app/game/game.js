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

        this.shouldSendUpdate = false;
        // Start the game loop.
        setInterval(this.gameLoop.bind(this), 1000 / 60);
    }

    // Main game loop function.
    gameLoop() {
        // Update Players
        // If there are players logged into the game then this code will need running, otherwise we don't need to.
        if (this.players) {

            // Update each player state.
            Object.keys(this.players).forEach(id => {
                let player = this.players[id];
                player.update();
            });

            // Send a game update to each player every other time
            if (this.shouldSendUpdate) {
                // Emit the states individually to each socket - We loop the logged in sockets to do this.
                Object.keys(gameServer.socketServer.sockets).forEach(id => {
                    let socket = gameServer.socketServer.sockets[id];
                    let player = this.players[id];
                    if (!player) return;
                    socket.emit('gameUpdate', this.createUpdate(player));
                });
                this.shouldSendUpdate = false;
            } else {
                this.shouldSendUpdate = true;
            }
        }
    }

    // Function to add a player to the game upon authentication.
    addPlayer(socketId, user) {
        return new Promise(async (resolve, reject) => {
            // Get all the map data required for the front end.
            let map = new Map(user.map_name, user.map_location);

            // Get the map data from the database.
            let mapData = map.getMapData();

            if (user.firstLogin === 1) {
                // We know we need to get the starting spawn point for players in the particular map.
                var playerSpawn;
                mapData.layers.filter((property, index) => {
                    if (property.name === 'Spawn Points') {
                        let playerSpawnObject = property.objects.filter((object, i) => {
                            if (object.name === 'Player Spawn') {
                                playerSpawn = object;
                            }
                        });
                    }
                });
                
                // Double check the player spawn object has been set.
                if (playerSpawn) {
                    user.x = playerSpawn.x;
                    user.y = playerSpawn.y;
                }
            }

            // Then finally we will setup and add the player.
            // Create the player.
            let player = new Player({
                id: socketId,
                username: user.username,
                health: user.health,
                maxHealth: user.maxHealth,
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

            await player.inventory.setupInventory(player.username);

            // Add the player to the game players object.
            gameServer.game.players[socketId] = player;

            // Setup the player initialization package and resolve.
            let initPackage = gameServer.game.createUpdate(player);
            resolve(initPackage);
        });
    }

    // Function to create an update for the player.
    createUpdate(player) {
        let update = {
            player: player,
            players: {}
        };

        Object.keys(this.players).forEach(id => {
            let player = this.players[id];
            update.players[player.id] = player.getUpdate();
        });

        return JSON.stringify(update);
    }

    // Function to remove the player from the game.
    async removePlayer(socketId) {
        delete this.players[socketId];
    }
}

module.exports = Game;