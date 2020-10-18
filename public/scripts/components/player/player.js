/***
 *
 * Front-end Player Class
 *
 ***/

const sprite = require('./sprite/sprite');
sprite.loadSpriteSheet();

module.exports.updatePlayersState = function (context, players) {
    context.clearRect(0, 0, 950, 750);
    context.fillStyle = 'green';
    for (var id in players) {
        var player = players[id];
        context.beginPath();
        sprite.drawPlayer(context, player);
    }
}

