/***
 *
 * Back-end Collision Component File
 *
 ***/
const gameWidth = 800;
const gameHeight = 608;
const spriteRadius = 8;

module.exports.checkEdgeCollision = function (player) {
    // Checking the left and right edges first.
    if (player.x < 0) {
        player.x = 0;
        player.isColliding = true;
    } else if (player.x > gameWidth - (spriteRadius * 4)) {
        player.x = gameWidth - (spriteRadius * 4);
        player.isColliding = true;
    } else {
        player.isColliding = false;
    }

    // Check for bottom and top
    if (player.y < 0) {
        player.y = 0;
        player.isColliding = true;
    } else if (player.y > gameHeight - (spriteRadius * 4)) {
        player.y = gameHeight - (spriteRadius * 4);
        player.isColliding = true;
    } else {
        player.isColliding = false;
    }

    return player;
}
