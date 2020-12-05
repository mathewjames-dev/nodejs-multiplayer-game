/***
 *
 * Back-end Player Component File
 *
 ***/
// Import the components required.
const Entity = require('../entity');
const PlayerDatabase = require('../../../database/player/player');

class Player extends Entity {
    constructor(param) {
        super(param);
        this.username = param.username;
        this.health = param.health;
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