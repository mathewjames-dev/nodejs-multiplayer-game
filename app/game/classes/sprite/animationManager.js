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
}

module.exports = AnimationManager;