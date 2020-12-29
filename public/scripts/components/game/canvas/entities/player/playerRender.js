/***
 *
 * Player Render Front-end File
 * This will be utilized to house the player rendering for the game.
 *
 ***/
class PlayerRender {
    // Function to draw the players sprite.
    drawSprite(entity, npc = false) {

        // Ensure the sprite image has been fully loaded.
        if (!game.assetLoader.images[entity.sprite.name] || !game.assetLoader.images[entity.sprite.name].status == 'loaded') return;
        playerContext.beginPath();

        //Drawing the image
        playerContext.drawImage(game.assetLoader.images[entity.sprite.name],
            entity.sprite.animation.srcX,
            entity.sprite.animation.srcY,
            entity.sprite.spriteWidth,
            entity.sprite.spriteHeight,
            entity.x - entity.sprite.spriteWidth / 2,
            entity.y - entity.sprite.spriteHeight / 2,
            entity.sprite.spriteWidth,
            entity.sprite.spriteHeight);
    }
}

module.exports = PlayerRender;