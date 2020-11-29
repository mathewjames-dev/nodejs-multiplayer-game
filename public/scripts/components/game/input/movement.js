/***
 *
 * Movement Front-end File
 * This will be utilized to house the main game input functions.
 *
 ***/
class Movement {
    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.addKeyDownListener();
        this.addKeyUpListener();
    }

    addKeyDownListener() {
        // Key down event listener.
        document.addEventListener('keydown', function (event) {
            switch (event.keyCode) {
                case 65: // A
                    game.movement.left = true;
                    break;

                case 87: // W
                    game.movement.up = true;
                    break;

                case 68: // D
                    game.movement.right = true;
                    break;

                case 83: //S
                    game.movement.down = true;
                    break;
            }
        });
    }

    addKeyUpListener() {
        // Key up event listener.
        document.addEventListener('keyup', function (event) {
            switch (event.keyCode) {
                case 65: // A
                    game.movement.left = false;
                    break;

                case 87: // W
                    game.movement.up = false;
                    break;

                case 68: // D
                    game.movement.right = false;
                    break;

                case 83: //S
                    game.movement.down = false;
                    break;
            }
        });
    }

    getMovement() {
        return {
            up: game.movement.up,
            down: game.movement.down,
            left: game.movement.left,
            right: game.movement.right
        }
    }
}

module.exports = Movement;