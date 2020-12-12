/***
 *
 * Canvas Front-end File
 * This will be utilized to house the canvas related elements for the game.
 *
 ***/
const PlayerRender = require('./entities/player/playerRender');
const MapRender = require('./map/render');

class Canvas {
    constructor() {
        this.mapRender = new MapRender;
        this.playerRender = new PlayerRender;

        this.inventoryDrawn = false;
    }

    // Function to draw the player states / sprites.
    async drawPlayerStates(updatePackage) {
        playerContext.clearRect(0, 0, mapCanvasBelow.width, mapCanvasBelow.height);

        // Loop the players within the update package object that we're passed to then draw the player states
        for (let id in updatePackage.players) {
            let player = updatePackage.players[id],
                playerX = Math.round(player.x / 16),
                playerY = Math.round(player.y / 16);

            this.playerRender.drawSprite(player);

            // SOUND RELATED
            let sound = '';
            for (let l in player.mapData.layers) {
                let layer = player.mapData.layers[l];
                let properties = layer.properties;
                for (let p in properties) {
                    let prop = properties[p];
                    if (prop.name === 'sound' && layer.data[playerY * player.mapData.width + playerX] > 0) {
                        sound = prop.value;
                    }
                }
            }
            if (player.movement.up || player.movement.down || player.movement.right || player.movement.left) {
                if (game.assetLoader.sounds[sound]) {
                    game.assetLoader.sounds[sound].play();
                    game.lastPlayedTileSound = sound;
                }
            } else {
                if (game.assetLoader.sounds[game.lastPlayedTileSound]) {
                    game.assetLoader.sounds[game.lastPlayedTileSound].pause();
                }
            }
        }
    }

    // Function to do all the current player rendering / drawing.
    async drawPlayerUpdate(player) {
        // Utilize the player object within the update package to draw the current players health.
        let hpWidth = 30 * player.health / 100;

        playerContext.fillStyle = 'red';
        playerContext.fillRect(player.x - hpWidth / 2, player.y - 30, hpWidth, 4); //Draw the health bar
    }

    // Function to draw the player inventory. (We only draw the inventory once).
    async drawPlayerInventory(inventory) {
        //WE NEED TO LOAD THE IMAGES IF THEY HAVENT BEEN LOADED ALREADY
        let inventoryList = $('#inventory-list');
        inventoryList.html("");
        for (let i = 0; i < inventory.maxSlots; i++) {
            let item = inventory.items[i];
            if (!item) {
                // Implement an empty item slot
                inventoryList.append("<li>" +
                    "<div class='item'>" +
                    "</div> " +
                    "</li>");
            } else {
                item.item_properties = JSON.parse(item.item_properties);

                // Load the item sound.
                if (!game.assetLoader.sounds[item.item_name] && item.item_properties.sound) {
                    game.assetLoader.addSound(item.item_name, item.item_properties.sound);
                    await game.assetLoader.loadSounds();
                }

                // Implement the item
                inventoryList.append("<li>" +
                    "<div data-id='" + item.item_id + "' data-name='" + item.item_name + "' class= 'item'> " +
                    "<img src='" + item.item_image + "'/>" +
                    "</div> " +
                    "</li>");
            }
        }
    }
}

module.exports = Canvas;