/***
 *
 * Back-end Player Component File
 *
 ***/
// Import the components required.
const entity = require('../entity');
const collision = require('../../collision/collision');

// Set up the players object
const players = {};

exports.Player = function (param) {
    let self = entity.Entity(param);

    // Function to update the players movement object.
    self.updateMovement = function (data) {
        collision.checkEdgeCollision(self);

        if (!self.isColliding) {
            if (data.left) {
                self.x -= 5;
            }

            if (data.up) {
                self.y -= 5;
            }

            if (data.right) {
                self.x += 5;
            }

            if (data.down) {
                self.y += 5;
            }
        }
        players[self.id].movement = data;
    }

    return self;
};

// Function that we can globally access and use to add a player to the game.
module.exports.addPlayer = function(socketId)
{
     // Create a player with the socket id and the map they will be spawning in
    let player = exports.Player({
        id: socketId
    });
    players[socketId] = player;
}

// Function that we can globally access and use to remove a player from the game.
module.exports.removePlayer = function (socketId) {
    delete players[socketId];
}

// Another export function that we will be able to call to move the player from other classes.
module.exports.movePlayer = function(socketId, data)
{
    let player = players[socketId];
    player.updateMovement(data);
}

// Function to get the player object.
module.exports.getPlayers = function(){
    return players;
}