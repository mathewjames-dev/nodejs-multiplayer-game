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

        /*
         * When we update the player state we can play the tile sounds.
         * This can eventually be managed by a sound manager potentially or other function
         * We get the player grid x and y by dividing by the sprite size (needs to be a constant eventually)
         * then we get the tile by doing a calculation and more specifically base layer
         * if the player is moving we play the current tile, else we stop the last played tile.
         */
        let playerX = Math.round(player.x / 16),
            playerY = Math.round(player.y / 16),
            tile = player.globalMapData.layers[0].data[playerY * player.globalMapData.width + playerX];
        if (player.movement.up || player.movement.down || player.movement.right || player.movement.left) {
            if (game.assetLoader.sounds[tile]) {
                game.assetLoader.sounds[tile].play();
                game.lastPlayedTileSound = tile;
                
            }
        } else {
            if (game.assetLoader.sounds[game.lastPlayedTileSound]) {
                game.assetLoader.sounds[game.lastPlayedTileSound].pause();
            }
        }
    }
}

