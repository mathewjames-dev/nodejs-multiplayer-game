/***
 *
 * Front-end Player Component
 *
 ***/

// Setup the relevant requirements for the file.
const sprite = require('./sprite/sprite');

// Load the sprite sheet.
sprite.loadSpriteSheet();

module.exports.updatePlayersState = function (context, players) {
    context.clearRect(0, 0, 800, 608);
    context.fillStyle = 'green';
    for (let id in players) {
        let player = players[id];
        context.beginPath();
        sprite.drawPlayer(context, player);
    }
}

