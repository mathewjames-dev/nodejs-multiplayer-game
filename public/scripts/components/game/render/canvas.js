/***
 *
 * Front-end Canvas Component
 *
 ***/
// Setup the relevant requirements for the file.
const PlayerRender = require('./drawing/entities/playerRender');
const Animation = require('./animation/animation');

class Canvas {
    constructor() {
        this.playerRender = new PlayerRender;
        this.animation = new Animation;
    }

    drawPlayerStates(players) {
        playerContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);

        // Loop the player object that we're passed.
        for (let id in players) {
            if (!game.players[id]) continue;

            let player = players[id];

            this.playerRender.drawSprite(player);

            // Draw Health only for current player.
            if (id === game.player.id) {
                // Health Related (divided by max health)
                let hpWidth = 30 * player.health / 100;

                playerContext.fillStyle = 'red';
                playerContext.fillRect(player.x - hpWidth / 2, player.y - 30, hpWidth, 4); //Draw the health bar
            }
        
            // SOUND RELATED
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
}

module.exports = Canvas;