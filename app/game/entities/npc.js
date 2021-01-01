/***
 *
 * Back-end Player Component File
 *
 ***/
// Import the components required.
const Entity = require("./entity");

class NPC extends Entity {
    constructor(param) {
        super(param);
        this.health = param.health;
        this.maxHealth = param.maxHealth;
    }

    // Function to update the player.
    update() {
        super.update();

        return null;
    }

    // Function to get an update for a player.
    getUpdate() {
        return {
            ...(super.getUpdate()),
            sprite: this.sprite,
        };
    }
}

module.exports = NPC;