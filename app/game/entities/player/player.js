/***
 *
 * Back-end Player Component File
 *
 ***/
// Import the components required.
const Entity = require('../entity');


exports.Player = function (param) {
    let self = new Entity(param);

    return self;
};

// Another export function that we will be able to call to move the player from other classes.
module.exports.movePlayer = function(player, data)
{
    player.movement = data;
    player.updatePosition(data);
}

// Function to get the player object.
module.exports.getPlayers = function(){
    return players;
}