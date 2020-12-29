/***
 *
 * Sound Manager Class File.
 * This will be utilized to house the main game sound functions.
 *
 ***/
class SoundManager {
    constructor() {
        // Last Played Tiled Sound
        this.lastPlayedTileSound = 0;
    }

    // Function to update the games sounds.
    async updateSounds(updatePackage) {
        for (let id in updatePackage.players) {
            // Set our variables.
            let player = updatePackage.players[id],
                playerX = Math.round(player.x / 16),
                playerY = Math.round(player.y / 16);

            // Set the sound variable.
            let sound = '';

            // Loop the map data layers for the player and see which layers are sound related.
            // Whichever are and if the tile is greater than 0 on that layer, we can set the sound to that value.
            for (let l in player.mapData.data.layers) {
                let layer = player.mapData.data.layers[l];
                let properties = layer.properties;
                for (let p in properties) {
                    let prop = properties[p];
                    if (prop.name === 'sound' && layer.data[playerY * player.mapData.data.width + playerX] > 0) {
                        sound = prop.value;
                    }
                }
            }

            // If the player is moving we can then play the sound and set the last played tile sound.
            if (player.movement.up || player.movement.down || player.movement.right || player.movement.left) {
                if (game.assetLoader.sounds[sound]) {
                    game.assetLoader.sounds[sound].play();
                    game.lastPlayedTileSound = sound;
                }
            }
            // Otherwise we pause the last played tiled sound for the player.
            else {
                if (game.assetLoader.sounds[game.lastPlayedTileSound]) {
                    game.assetLoader.sounds[game.lastPlayedTileSound].pause();
                }
            }
        }
    }
}

module.exports = SoundManager;