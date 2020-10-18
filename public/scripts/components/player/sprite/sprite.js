// Set the width and height of the sprite sheet.
var spriteSheetWidth = 96;
var spriteSheetHeight = 128;

// Set the rows and columns for the sprite sheet.
var spriteSheetRows = 4;
var spriteSheetCols = 3;

// Set which rows are tracking left and right within the sprite sheet.
var trackingLeftRow = 1;
var trackingRightRow = 2;

// Set the sprite width and height by doing simple calculation on the sprite sheet.
var spriteWidth = spriteSheetWidth / spriteSheetCols;
var spriteHeight = spriteSheetHeight / spriteSheetRows;

var currentFrame = 0;
var totalFrames = 3;

var srcX = 0;
var srcY = 0;

var left = false;
var right = false;

var speed = 12;

var character = new Image();
character.src = './public/images/characters/male-01-1.png';

// Function to draw the player.
module.exports.drawPlayer = function(context, player) {
    //Updating the frame 
    module.exports.updateSpriteFrame(context, player);

    //Drawing the image 
    context.drawImage(character, srcX, srcY, spriteWidth, spriteHeight, player.x, player.y, spriteWidth, spriteHeight);
    context.fill();
}

// Function to update the sprite frame.
module.exports.updateSpriteFrame = function(context, player) {
    // We need to update the current frame.
    currentFrame = ++currentFrame % totalFrames;

    // Calculate the new X co ordinate for the sprite sheet.
    srcX = currentFrame * spriteWidth;

    //Clearing the drawn frame 
    context.clearRect(player.x, player.y, spriteWidth, spriteHeight);
}