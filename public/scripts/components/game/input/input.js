/***
 *
 * Input Front-end File
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

    // Adding the key down listeners within this function.
    addKeyDownListener() {
        // Key down event listener.
        document.addEventListener('keydown', function (event) {
            event.preventDefault();
            switch (event.keyCode) {
                case 65: // A
                    game.input.left = true;
                    break;
                case 37: // Left arrow.
                    game.input.left = true;
                    break;

                case 87: // W
                    game.input.up = true;
                    break;
                case 38: // Up arrow.
                    game.input.up = true;
                    break;

                case 68: // D
                    game.input.right = true;
                    break;
                case 39: // Right arrow.
                    game.input.right = true;
                    break;

                case 83: //S
                    game.input.down = true;
                    break;
                case 40: // Down arrow.
                    game.input.down = true;
                    break;
            }
        });
    }

    // Adding the key up listeners within this function.
    addKeyUpListener() {
        // Key up event listener.
        document.addEventListener('keyup', function (event) {
            event.preventDefault();
            switch (event.keyCode) {
                case 65: // A
                    game.input.left = false;
                    break;
                case 37: // Left arrow.
                    game.input.left = false;
                    break;

                case 87: // W
                    game.input.up = false;
                    break;
                case 38: // Up arrow.
                    game.input.up = false;
                    break;

                case 68: // D
                    game.input.right = false;
                    break;
                case 39: // Right arrow.
                    game.input.right = false;
                    break;

                case 83: //S
                    game.input.down = false;
                    break;
                case 40: // Down arrow.
                    game.input.down = false;
                    break;
            }
        });
    }

    // Function to return all the movement values as an object.
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