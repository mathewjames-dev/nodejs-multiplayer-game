/***
 *
 * Back-end Entity Component File
 *
 ***/
// Import the components required.
const collision = require('../collision/collision');

// Every movable object like players, bullets, npcs will all be based off the base entity.
exports.Entity = function (param) {
    var self = {
        // Co-ordinates
        x: 320,
        y: 320,

        // Movement object
        movement: {
            up: false,
            down: false,
            left: false,
            right: false
        },

        // Movement Speed
        movementSpeed: 5,

        // Colliding flag against the entity
        isColliding: false,
    };


    //If we don't want our object to be based off of the defaults above, 
    //we can pass an object which we've named param and set the defaults to what we would like them to be.
    if (param) {
        if (param.x)
            self.x = param.x;
        if (param.y)
            self.y = param.y;
        if (param.map)
            self.map = param.map;
        if (param.name)
            self.name = param.name;
        if (param.id)
            self.id = param.id;
    }

    self.updatePosition = function (data) {
        if (data.left) {
            var entityX = self.x - self.movementSpeed;
        } else if (data.right) {
            var entityX = self.x + self.movementSpeed;
        } else {
            var entityX = self.x
        }

        if (data.up) {
            var entityY = self.y - self.movementSpeed;
        } else if (data.down) {
            var entityY = self.y + self.movementSpeed;
        } else {
            var entityY = self.y;
        }

        collision.checkEdgeCollision(self, entityX, entityY);
           
        collision.checkNonCollidableMapObjects(self, entityX, entityY);

        if (!self.isColliding) {
            self.x = entityX;
            self.y = entityY;
        } else {
            self.x = self.x;
            self.y = self.y;
        }

        self.isColliding = false;
    };

    self.getDistance = function (pt) { //Pass a point (x and y) and it will return the distance with a square root
        return Math.sqrt(Math.pow(self.x - pt.x, 2) + Math.pow(self.y - pt.y, 2));
    };

    return self;
};