/***
 *
 * Front-end Sprite Component
 *
 ***/

class SpriteRender {
    constructor(entity) {
        // Set the rows and columns for the sprite sheet.
        this.spriteSheetRows = entity.sprite.rows;
        this.spriteSheetCols = entity.sprite.cols;
        this.spriteWidth = game.assetLoader.images[entity.sprite.name].width / this.spriteSheetCols;
        this.spriteHeight = game.assetLoader.images[entity.sprite.name].height / this.spriteSheetRows;

        // Set which rows are tracking left and right within the sprite sheet.
        this.trackingDownRow = entity.sprite.downRow;
        this.trackingLeftRow = entity.sprite.leftRow;
        this.trackingRightRow = entity.sprite.rightRow;
        this.trackingUpRow = entity.sprite.upRow;

        this.currentFrame = 0;
        this.totalFrames = entity.sprite.frames;

        this.srcX = 0;
        this.srcY = 0;
    }

    drawSprite(entity) {
        if (!game.assetLoader.images[entity.sprite.name]) return;

        playerContext.beginPath();

        //Updating the frame
        this.updateSpriteFrame(entity);

        //Drawing the image
        playerContext.drawImage(game.assetLoader.images[entity.sprite.name], this.srcX, this.srcY,
            this.spriteWidth, this.spriteHeight,
            entity.x - this.spriteWidth / 2, entity.y - this.spriteHeight / 2,
            this.spriteWidth, this.spriteHeight);
    }

    updateSpriteFrame(entity) {
        // We need to update the current frame.
        if (!entity.movement.left && !entity.movement.right
            && !entity.movement.up && !entity.movement.down) {
            this.currentFrame = 0;
        } else {
            this.currentFrame = ++this.currentFrame % this.totalFrames;
        }

        this.srcX = this.currentFrame * this.spriteWidth;


        // Calculate the new X co ordinate for the sprite sheet.
        if (entity.movement.up) {
            this.srcY = this.trackingUpRow * this.spriteHeight;
        }

        if (entity.movement.down) {
            this.srcY = this.trackingDownRow * this.spriteHeight;
        }

        // Calculate the new Y co ordinate for the sprite sheet.
        if (entity.movement.left) {
            this.srcY = this.trackingLeftRow * this.spriteHeight;
        }

        if (entity.movement.right) {
            this.srcY = this.trackingRightRow * this.spriteHeight;
        }

        //Clearing the drawn frame 
        playerContext.clearRect(entity.x, entity.y, this.spriteWidth, this.spriteHeight);
    }
}

module.exports = SpriteRender;