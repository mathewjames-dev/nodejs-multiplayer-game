/***
 *
 * Back-end Sprite Class File
 *
 ***/
class AnimationManager {
    constructor(spriteRecord) {
        this.currentFrame = 0;
        this.totalFrames = spriteRecord.totalFrames;
        this.srcX = 0;
        this.srcY = 0;
        this.play = false;
    }

    // Function to update the entity sprite animation.
    updateEntityAnimation(entity, simpleAnimation = false) {
        if (simpleAnimation) {
            this.currentFrame =
                ++this.currentFrame % this.totalFrames;
            this.srcX = this.currentFrame * entity.sprite.spriteWidth;
            if (this.currentFrame === this.totalFrames) this.play = false;
        } else {
            // We need to update the current frame.
            if (!entity.movement.left && !entity.movement.right
                && !entity.movement.up && !entity.movement.down) {
                this.currentFrame = 0;
            } else {
                this.currentFrame =
                    ++this.currentFrame % this.totalFrames;
            }
            this.srcX = this.currentFrame * entity.sprite.spriteWidth;


            // Calculate the new X co ordinate for the sprite sheet.
            if (entity.movement.up) {
                this.srcY = entity.sprite.upRow * entity.sprite.spriteHeight;
            }

            if (entity.movement.down) {
                this.srcY = entity.sprite.downRow * entity.sprite.spriteHeight;
            }

            // Calculate the new Y co ordinate for the sprite sheet.
            if (entity.movement.left) {
                this.srcY = entity.sprite.leftRow * entity.sprite.spriteHeight;
            }

            if (entity.movement.right) {
                this.srcY = entity.sprite.rightRow * entity.sprite.spriteHeight;
            }
        }
    }
}

module.exports = AnimationManager;