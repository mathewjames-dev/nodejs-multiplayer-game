/***
 *
 * Back-end Player Component File
 *
 ***/
// Import the components required.
const entity = require('../entity');

// Set up the players object
const players = {};

exports.Player = function (param) {
    let self = entity.Entity(param);

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
    player.movement = data;
    player.updatePosition(data);
}

// Function to get the player object.
module.exports.getPlayers = function(){
    return players;
}