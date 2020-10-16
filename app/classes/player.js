/***
 *
 * Backend Player Class
 *
 ***/

// Set up the players object
const players = {};

// Function that we can globally access and use to add a player to the game.
module.exports.addPlayer = function(socketId)
{
    players[socketId] = {
        // Each player has their own respective object. This is going to be the defaults for a new player.
        x: 300,
        y: 300
    };
}

// Function that we can globally access and use to remove a player from the game.
module.exports.removePlayer = function (socketId) {
    delete players[socketId];
}

// Another export function that we will be able to call to move the player from other classes.
module.exports.movePlayer = function(socketId, data)
{
    let player = players[socketId];

    if(data.left){
        player.x -= 5;
    }

    if(data.up){
        player.y -= 5;
    }

    if(data.right){
        player.x += 5;
    }

    if(data.down){
        player.y += 5;
    }
}

module.exports.getPlayers = function(){
    return players;
}