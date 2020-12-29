/***
 *
 * Back-end Sprite Class File
 *
 ***/
const AnimationManager = require("./animationManager");

class SpriteManager {
    constructor(spriteRecord) {
        this.name = spriteRecord.name;
        this.location = spriteRecord.location;
            
        this.rows = spriteRecord.numberOfRows;
        this.cols = spriteRecord.numberOfCols;
        this.leftRow = spriteRecord.trackingLeftRow;
        this.upRow = spriteRecord.trackingUpRow;
        this.rightRow = spriteRecord.trackingRightRow;
        this.downRow = spriteRecord.trackingDownRow;
        this.spriteWidth = spriteRecord.sheetWidth / spriteRecord.numberOfCols;
        this.spriteHeight = spriteRecord.sheetHeight / spriteRecord.numberOfRows;

        this.animation = new AnimationManager(spriteRecord);
    }
}

module.exports = SpriteManager;