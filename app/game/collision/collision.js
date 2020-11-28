/***
 *
 * Back-end Collision Component File
 *
 ***/
// Import the components required.
const CollisionMathematics = require('./collisionMathematics');
class Collision {
    constructor(param) {
        this.gameWidth = 800;
        this.gameHeight = 608;

        this.spriteRadius = 8;
        this.spriteWidth = this.spriteRadius * 2;
        this.spriteHeight = this.spriteRadius * 2;

        this.globalMapName;
        this.globalNonCollidableObjects = [];

        if (param.globalMapData)
            this.globalMapData = param.globalMapData;
    }

    // Checking the edges of the map with the entities new X and Y position.
    checkEdgeCollision(newX, newY) {
        // Checking the left and right edges first.
        if (newX < 0) {
            this.isColliding = true;
            return;
        } else if (newX > this.gameWidth - (this.spriteRadius * 4)) {
            this.isColliding = true;
            return;
        } else {
            this.isColliding = false;
        }

        // Check for bottom and top edges.
        if (newY < 0) {
            this.isColliding = true;
            return;
        } else if (newY > this.gameHeight - (this.spriteRadius * 4)) {
            this.isColliding = true;
            return;
        } else {
            this.isColliding = false;
        }

        return;
    }

    checkNonCollidableMapObjects(newX, newY) {     
        if (this.globalNonCollidableObjects.length === 0) {
            // Non collidable objects haven't been pushed for this map.
            for (let i = 0; i <= this.globalMapData.layers.length; i++) {
                let layer = this.globalMapData.layers[i];

                if (!layer) continue;

                // If there isn't a layer to check return.
                if (layer.type !== 'objectgroup') continue;

                if (layer.hasOwnProperty('properties')) {
                    for (let p = 0; p <= layer['properties'].length; p++) {
                        let property = layer['properties'][p];

                        if (property.hasOwnProperty('name') && property['name'] === 'Colliding' && property['value'] === true) {
                            // Non-Colliding layer that we need to check for collision
                            for (let d = 0; d <= layer.objects.length; d++) {
                                let object = layer.objects[d];
                                if (!object) return;

                                this.globalNonCollidableObjects.push({
                                    'x': object.x,
                                    'y': object.y,
                                    'w': object.width,
                                    'h': object.height
                                });
                            }
                        }
                    }
                }
            }
        }


        for (let nonCollidingObject in this.globalNonCollidableObjects) {
            if (CollisionMathematics.rectToRect(newX, newY, this.spriteWidth, this.spriteHeight,
                this.globalNonCollidableObjects[nonCollidingObject].x,
                this.globalNonCollidableObjects[nonCollidingObject].y,
                this.globalNonCollidableObjects[nonCollidingObject].w,
                this.globalNonCollidableObjects[nonCollidingObject].h)) {

                this.isColliding = true;
                return;
            }
        }

        return;
    }
}

module.exports = Collision;

