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

        this.inventoryDrawn = 0;
    }

    async drawPlayerStates(updatePackage) {
        playerContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);

        // Loop the players within the update package object that we're passed to then draw the player states
        for (let id in updatePackage.players) {
            let player = updatePackage.players[id];
            this.playerRender.drawSprite(player);

            // SOUND RELATED
           /* let playerX = Math.round(player.x / 16),
                playerY = Math.round(player.y / 16),
                tile = player.mapData.layers[0].data[playerY * player.mapData.width + playerX];
            if (player.movement.up || player.movement.down || player.movement.right || player.movement.left) {
                console.log(tile);
                if (game.assetLoader.sounds[tile]) {
                    game.assetLoader.sounds[tile].play();
                    game.lastPlayedTileSound = tile;
                }
            } else {
                if (game.assetLoader.sounds[game.lastPlayedTileSound]) {
                    game.assetLoader.sounds[game.lastPlayedTileSound].pause();
                }
            }*/
        }
    }

    // Function to do all the current player rendering / drawing.
    async drawPlayerUpdate(player) {
        // Utilize the player object within the update package to draw the current players health.
        let hpWidth = 30 * player.health / 100;

        playerContext.fillStyle = 'red';
        playerContext.fillRect(player.x - hpWidth / 2, player.y - 30, hpWidth, 4); //Draw the health bar
    }

    async drawPlayerInventory(inventory) {
        //WE NEED TO LOAD THE IMAGES IF THEY HAVENT BEEN LOADED ALREADY
        let inventoryList = $('#inventory-list');
        inventoryList.html();

        if (this.inventoryDrawn == 0) {
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
                    game.assetLoader.addSound(item.item_name, item.item_properties.sound);

                    // Implement the item
                    inventoryList.append("<li>" +
                        "<div data-id='" + item.item_id + "'  data-name='" + item.item_name + "' class= 'item'> " +
                        "<img src='" + item.item_image + "'/>" +
                        "</div> " +
                        "</li>");
                }
            }
        }

        this.inventoryDrawn = 1;
    }
}

module.exports = Canvas;