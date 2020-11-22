/***
 *
 * Back-end Entity Component File
 *
 ***/
// Import the components required.
const Collision = require('../collision/collision');

class Entity extends Collision {
    constructor(param) {
        super(param);

        this.x = 320;
        this.y = 320;

        this.movement = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.movementSpeed = 2;

        this.isColliding = false;
        // If we don't want our object to be based off of the defaults above, 
        // we can pass an object which we've named param and set the defaults to what we would like them to be.
        if (param) {
            if (param.x)
                this.x = param.x;
            if (param.y)
                this.y = param.y;
            if (param.name)
                this.name = param.name;
            if (param.id)
                this.id = param.id;
        }
    }

    updatePosition(data) {
        if (data.left) {
            var entityX = this.x - this.movementSpeed;
        } else if (data.right) {
            var entityX = this.x + this.movementSpeed;
        } else {
            var entityX = this.x
        }

        if (data.up) {
            var entityY = this.y - this.movementSpeed;
        } else if (data.down) {
            var entityY = this.y + this.movementSpeed;
        } else {
            var entityY = this.y;
        }

        this.checkEdgeCollision(entityX, entityY);

        if (!this.isColliding) {
            this.checkNonCollidableMapObjects(entityX, entityY);
        }

        if (!this.isColliding) {
            this.x = entityX;
            this.y = entityY;
        }

        this.isColliding = false;
    }

    getDistance(pt) { //Pass a point (x and y) and it will return the distance with a square root
        return Math.sqrt(Math.pow(this.x - pt.x, 2) + Math.pow(this.y - pt.y, 2));
    }
}

module.exports = Entity;