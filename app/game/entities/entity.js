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
        this.movementSpeed = 0.6;

        this.movement = {
            up: false,
            down: false,
            left: false,
            right: false
        };

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
            if (param.dbId)
                this.dbId = param.dbId;
            if (param.sprite)
                this.sprite = param.sprite;
        }
    }

    // Function to update the entity.
    update() {
        this.sprite.currentFrameCount++;
        if (this.sprite.currentFrameCount < this.movementSpeed * 15) return;
        this.sprite.currentFrameCount = 0;

        // Update the entity animation.
        this.updateEntityAnimation();

        // Update the NPCs animation.
        for (let index in this.globalMapData.npcs) {
            let npc = this.globalMapData.npcs[index];
            if (!npc) return;

            let durationFrames = (1000 / 60) * npc.sprite.animation.duration;
            let playFrameEvery = durationFrames / npc.sprite.animation.totalFrames;
            if (!npc.sprite.animation.play && npc.sprite.animation.currentFrame === 0) {
                    npc.sprite.animation.durationCount = 0;
                    npc.sprite.animation.play = true;
            } else if (Math.floor(npc.sprite.animation.durationCount % playFrameEvery) === 0) {
                npc.sprite.animation.play = true;
            } else {
                npc.sprite.animation.play = false;
            }

            if (npc.sprite.animation.play) {
                npc.updateEntityAnimation(true);
            }

            npc.sprite.animation.durationCount++;
        }
    }

    // Function to update the entity sprite animation.
    updateEntityAnimation(simpleAnimation = false) {
        if (simpleAnimation) {
            this.sprite.animation.currentFrame =
                ++this.sprite.animation.currentFrame % this.sprite.animation.totalFrames;
            this.sprite.animation.srcX = this.sprite.animation.currentFrame * this.sprite.spriteWidth;
            if (this.sprite.animation.currentFrame === this.sprite.animation.totalFrames) this.sprite.animation.play = false;
        } else {
            // We need to update the current frame.
            if (!this.movement.left && !this.movement.right
                && !this.movement.up && !this.movement.down) {
                this.sprite.animation.currentFrame = 0;
            } else {
                this.sprite.animation.currentFrame =
                    ++this.sprite.animation.currentFrame % this.sprite.animation.totalFrames;
            }
            this.sprite.animation.srcX = this.sprite.animation.currentFrame * this.sprite.spriteWidth;


            // Calculate the new X co ordinate for the sprite sheet.
            if (this.movement.up) {
                this.sprite.animation.srcY = this.sprite.upRow * this.sprite.spriteHeight;
            }

            if (this.movement.down) {
                this.sprite.animation.srcY = this.sprite.downRow * this.sprite.spriteHeight;
            }

            // Calculate the new Y co ordinate for the sprite sheet.
            if (this.movement.left) {
                this.sprite.animation.srcY = this.sprite.leftRow * this.sprite.spriteHeight;
            }

            if (this.movement.right) {
                this.sprite.animation.srcY = this.sprite.rightRow * this.sprite.spriteHeight;
            }
        }
    }

    // Function to get update for the entity.
    getUpdate() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            movement: this.movement,
            mapData: this.globalMapData,
        };
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