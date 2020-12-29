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

    async drawStates(updatePackage) {
        // Duplicate the player canvas.
        // Draw the players - DONE
        // Draw npcs - DONE
        // Write the duplicated canvas to the main canvas. (Should prevent any mis-timings and missing images for 1 second during animation)
      //  var contextDuplication = playerContext.canvas.cloneNode();
        playerContext.clearRect(0, 0, mapCanvasBelow.width, mapCanvasBelow.height);

        this.drawNPCStates(updatePackage.player.mapData.npcs);

        this.drawPlayerStates(updatePackage.players); 
    }

    // Function to draw the player states / sprites.
    async drawPlayerStates(players) {
        // Draw the players first and foremost.
        for (let id in players) {
            let player = players[id];
            if (!player) continue;
            this.playerRender.drawSprite(player);
        }
    }

    // Function to draw the npc states / sprites.
    async drawNPCStates(npcs) {
        // Loop the players within the update package object that we're passed to then draw the player states
        for (let name in npcs) {
            let npc = npcs[name];
            if (!npc) continue;
            this.playerRender.drawSprite(npc, true);
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
                // Load the item sound.
                if (!game.assetLoader.sounds[item.name] && item.properties.sound) {
                    game.assetLoader.addSound(item.name, item.properties.sound);
                    await game.assetLoader.loadSounds();
                }

                // Implement the item
                inventoryList.append("<li>" +
                    "<div data-id='" + item.id + "' data-name='" + item.name + "' class= 'item'> " +
                    "<img src='" + item.image + "'/>" +
                    "</div> " +
                    "</li>");
            }
        }
    }
}

module.exports = Canvas;