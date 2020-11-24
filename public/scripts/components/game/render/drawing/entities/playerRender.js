/***
 *
 * Front-end Sprite Render Component
 *
 ***/
class PlayerRender {
    drawSprite(entity) {
        // Set the rows and columns for the sprite sheet.
        this.spriteSheetRows = entity.sprite.rows;
        this.spriteSheetCols = entity.sprite.cols;
        this.spriteWidth = entity.sprite.spriteWidth;
        this.spriteHeight = entity.sprite.spriteHeight;

        // Set which rows are tracking left and right within the sprite sheet.
        this.trackingDownRow = entity.sprite.downRow;
        this.trackingLeftRow = entity.sprite.leftRow;
        this.trackingRightRow = entity.sprite.rightRow;
        this.trackingUpRow = entity.sprite.upRow;
        this.currentFrame = game.players[entity.id].sprite.animation.currentFrame;
        this.totalFrames = game.players[entity.id].sprite.animation.totalFrames;
        this.srcX = game.players[entity.id].sprite.animation.srcX;
        this.srcY = game.players[entity.id].sprite.animation.srcY;

        if (!game.assetLoader.images[entity.sprite.name]) return;

        playerContext.beginPath();

        this.updateEntitySpriteFrames(entity);

        //Drawing the image
        playerContext.drawImage(game.assetLoader.images[entity.sprite.name],
            this.srcX, this.srcY,
            this.spriteWidth, this.spriteHeight,
            entity.x - this.spriteWidth / 2, entity.y - this.spriteHeight / 2,
            this.spriteWidth, this.spriteHeight);
    }

    updateEntitySpriteFrames(entity) {
        // We need to update the current frame.
        if (!entity.movement.left && !entity.movement.right
            && !entity.movement.up && !entity.movement.down) {
            game.players[entity.id].sprite.animation.currentFrame = 0;
        } else {
            game.players[entity.id].sprite.animation.currentFrame =
                ++game.players[entity.id].sprite.animation.currentFrame % game.players[entity.id].sprite.animation.totalFrames;
        }
        game.players[entity.id].sprite.animation.srcX = game.players[entity.id].sprite.animation.currentFrame * entity.sprite.spriteWidth;


        // Calculate the new X co ordinate for the sprite sheet.
        if (entity.movement.up) {
            game.players[entity.id].sprite.animation.srcY = entity.sprite.upRow * entity.sprite.spriteHeight;
        }

        if (entity.movement.down) {
            game.players[entity.id].sprite.animation.srcY = entity.sprite.downRow * entity.sprite.spriteHeight;
        }

        // Calculate the new Y co ordinate for the sprite sheet.
        if (entity.movement.left) {
            game.players[entity.id].sprite.animation.srcY = entity.sprite.leftRow * entity.sprite.spriteHeight;
        }

        if (entity.movement.right) {
            game.players[entity.id].sprite.animation.srcY = entity.sprite.rightRow * entity.sprite.spriteHeight;
        }

        //Clearing the drawn frame 
        playerContext.clearRect(entity.x, entity.y, this.spriteWidth, this.spriteHeight);
    }
}

module.exports = PlayerRender;