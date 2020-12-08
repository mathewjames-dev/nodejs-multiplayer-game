/***
 *
 * Player Render Front-end File
 * This will be utilized to house the player rendering for the game.
 *
 ***/
class PlayerRender {
    drawSprite(entity) {
        if (!game.assetLoader.images[entity.sprite.name]) return;

        playerContext.beginPath();

        //Clearing the drawn frame 
        playerContext.clearRect(entity.x, entity.y, entity.sprite.spriteWidth, entity.sprite.spriteHeight);

        //Drawing the image
        playerContext.drawImage(game.assetLoader.images[entity.sprite.name],
            entity.sprite.animation.srcX, entity.sprite.animation.srcY,
            entity.sprite.spriteWidth, entity.sprite.spriteHeight,
            entity.x - entity.sprite.spriteWidth / 2, entity.y - entity.sprite.spriteHeight / 2,
            entity.sprite.spriteWidth, entity.sprite.spriteHeight);
    }
}

module.exports = PlayerRender;