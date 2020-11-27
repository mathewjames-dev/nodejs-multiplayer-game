/***
 *
 * Back-end Player Component File
 *
 ***/
// Import the components required.
const Entity = require('../entity');

class Player extends Entity {
    constructor(param) {
        super(param);

        this.name = param.username;
        this.health = param.health;
    }

    movePlayer(data) {
        this.movement = data;
        this.updatePosition(data);
    }
}

module.exports = Player;