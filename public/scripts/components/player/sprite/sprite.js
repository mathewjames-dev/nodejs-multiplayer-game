/***
 *
 * Front-end Sprite Class
 *
 ***/

// Setting the sprite variable.
var sprite;

var spriteWidth;
var spriteHeight;

// Set the rows and columns for the sprite sheet.
var spriteSheetRows = 4;
var spriteSheetCols = 3;

// Set which rows are tracking left and right within the sprite sheet.
var trackingDownRow = 0;
var trackingLeftRow = 1;
var trackingRightRow = 2;
var trackingUpRow = 3;

var currentFrame = 0;
var totalFrames = 3;

var srcX = 0;
var srcY = 0;

var speed = 12;

// Function that we will utilize to load the image for the player.
module.exports.loadSpriteSheet = function () {
    if (!sprite) {
        // If the sprite image isn't already setup.
        sprite = new Image();

        sprite.onload = function () {
            // Once the sprite has loaded we will then set the frameWidth and frameHeight.
            // Set the sprite width and height by doing simple calculation on the sprite sheet.
            spriteWidth = sprite.width / spriteSheetCols;
            spriteHeight = sprite.height / spriteSheetRows;
        }

        // Load the image.
        sprite.src = './public/images/characters/male-01-1.png';
    }
}

// Function to draw the player.
module.exports.drawPlayer = function(context, player) {
    //Updating the frame
    module.exports.updateSpriteFrame(context, player);

    //Drawing the image 
    context.drawImage(sprite, srcX, srcY, spriteWidth, spriteHeight, player.x, player.y, spriteWidth, spriteHeight);
    context.fill();
}

// Function to update the sprite frame.
module.exports.updateSpriteFrame = function (context, player) {
    // We need to update the current frame.
    if (!player.movement.left && !player.movement.right && !player.movement.up && !player.movement.down) {
        currentFrame = 0;
    } else {
        currentFrame = ++currentFrame % totalFrames;
    }
    srcX = currentFrame * spriteWidth; 


    // Calculate the new X co ordinate for the sprite sheet.
    if (player.movement.up) {
        srcY = trackingUpRow * spriteHeight;
    }

    if (player.movement.down) {
        srcY = trackingDownRow * spriteHeight;
    }

    // Calculate the new Y co ordinate for the sprite sheet.
    if (player.movement.left) {
        srcY = trackingLeftRow * spriteHeight;
    }

    if (player.movement.right) {
        srcY = trackingRightRow * spriteHeight;
    }

    //Clearing the drawn frame 
    context.clearRect(player.x, player.y, spriteWidth, spriteHeight);
}