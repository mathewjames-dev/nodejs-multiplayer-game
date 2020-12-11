/***
 *
 * Back-end Player Component File
 *
 ***/
// Import the components required.
const Entity = require('../entity');
const PlayerDatabase = require('../../../database/player/player');
const Inventory = require('./inventory');

class Player extends Entity {
    constructor(param) {
        super(param);
        this.username = param.username;
        this.health = param.health;
        this.maxHealth = param.maxHealth;

        this.inventory = new Inventory(this);
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
            inventory: this.inventory,
            sprite: this.sprite,
            //direction: this.direction,
            //hp: this.hp,
        };
    }

    movePlayer(data) {
        this.movement = data;
        this.updatePosition(data);
    }

    async updatePlayerState() {
        let playerDatabase = new PlayerDatabase;
        playerDatabase.updatePlayerState(this);
    }
}

module.exports = Player;