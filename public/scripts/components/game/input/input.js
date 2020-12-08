/***
 *
 * Movement Front-end File
 * This will be utilized to house the main game input functions.
 *
 ***/
class Input {
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
                    game.input.left = true;
                    break;

                case 87: // W
                    game.input.up = true;
                    break;

                case 68: // D
                    game.input.right = true;
                    break;

                case 83: //S
                    game.input.down = true;
                    break;
            }
        });
    }

    addKeyUpListener() {
        // Key up event listener.
        document.addEventListener('keyup', function (event) {
            switch (event.keyCode) {
                case 65: // A
                    game.input.left = false;
                    break;

                case 87: // W
                    game.input.up = false;
                    break;

                case 68: // D
                    game.input.right = false;
                    break;

                case 83: //S
                    game.input.down = false;
                    break;
            }
        });
    }

    getMovement() {
        return {
            up: game.input.up,
            down: game.input.down,
            left: game.input.left,
            right: game.input.right
        }
    }
}

module.exports = Input;