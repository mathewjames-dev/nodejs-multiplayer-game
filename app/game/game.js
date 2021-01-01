/***
 *
 * Back-end Game File
 *
 ***/

// Import the components required.
const Player = require('../game/entities/player/player');
const MapModel = require('../database/models/map');
const SpriteModel = require('../database/models/sprite');
const SpriteManager = require('./classes/sprite/spriteManager');
const MapManager = require('./classes/sprite/mapManager');

class Game {
    constructor() {
        this.maps = {};
        this.players = {};

        this.shouldSendUpdate = false;
        this.loop;
    }

    // Function to load the games maps.
    async loadMaps() {
        try {
            var $this = this;
            await MapModel.find((err, maps) => {
                for (let m = 0; m < maps.length; m++) {
                    let map = maps[m];
                    // Setup the map for first time storing.
                    let mapManager = new MapManager(map);

                    // Load up the map NPCs.
                    mapManager.getNPCs()
                        .then((npcs) => mapManager.setupNPCS(npcs))
                        .then((mapData) => {
                            return;
                        }).catch((err) => {
                            console.log(err);
                        })
                    $this.maps[map.id] = mapManager;
                }
            });
        } catch{
            throw Error;
        }

    }

    // Function to start the game loops.
    startGameLoop() {
        // Start the game loop.
        this.loop = setInterval(this.gameLoop.bind(this), 1000 / 60);
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

    // Function to create an update for the player.
    createUpdate(player) {
        let update = {
            player: player.getUpdate(),
            players: {}
        };

        Object.keys(this.players).forEach(id => {
            let player = this.players[id];
            update.players[player.id] = player.getUpdate();
        });

        return JSON.stringify(update);
    }

    // Function to add a player to the game upon authentication.
    async addPlayer(socketId, user) {
        var map = this.maps[user.mapId];

        if (user.firstLogin) {
            // We know we need to get the starting spawn point for players in the particular map.
            var playerSpawn;
            map.data.layers.filter((property, index) => {
                if (property.name === 'Spawn Points') {
                    let playerSpawnObject = property.objects.filter((object, i) => {
                        if (object.type === 'playerspawn') {
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

        // Get the users sprite from the database.
        let spriteRecord = await SpriteModel.findOne({ "id": user.spriteId }).exec();

        // Then finally we will setup and add the player.
        let player = new Player({
            id: socketId,
            dbId: user.id,
            username: user.username,
            health: user.health,
            maxHealth: user.maxHealth,
            x: user.x,
            y: user.y,
            sprite: new SpriteManager(spriteRecord),
            globalMapData: map
        });

        await player.inventory.setupInventory(user.id);

        // Add the player to the game players object.
        this.players[socketId] = player;

        // Setup the player initialization package and resolve.
        let initPackage = gameServer.game.createUpdate(player);
        return initPackage;
    }

    // Function to remove the player from the game.
    async removePlayer(socketId) {
        delete this.players[socketId];
    }

}

module.exports = Game;