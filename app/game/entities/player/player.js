/***
 *
 * Back-end Player Component File
 *
 ***/
// Import the components required.
const Entity = require('../entity');
const PlayerQueries = require('../../../database/playerQueries');
const Inventory = require('./inventory');

class Player extends Entity {
    constructor(param) {
        super(param);
        this.username = param.username;
        this.health = param.health;
        this.maxHealth = param.maxHealth;
        this.inventory = new Inventory();
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
            health: this.health,
            inventory: this.inventory,
            sprite: this.sprite,
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