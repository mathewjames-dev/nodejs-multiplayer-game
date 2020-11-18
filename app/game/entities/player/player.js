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

        this.username = param.username
    }

    movePlayer(data) {
        this.movement = data;
        this.updatePosition(data);
    }
}

module.exports = Player;