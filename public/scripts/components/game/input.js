/***
 *
 * Front-end Input Class
 *
 ***/

// Setting up the players movement object.
const movement = {
    up: false,
    down: false,
    left: false,
    right: false
};

// Key down event listener.
document.addEventListener('keydown', function(event){
    switch(event.keyCode){
        case 65: // A
        module.exports.updateMovement('left', true);
        break;

        case 87: // W
        module.exports.updateMovement('up', true);
        break;

        case 68: // D
        module.exports.updateMovement('right', true);
        break;

        case 83: //S
        module.exports.updateMovement('down', true);
        break;
    }
});

// Key up event listener.
document.addEventListener('keyup', function(event){
    switch(event.keyCode){
        case 65: // A
        module.exports.updateMovement('left', false);
        break;

        case 87: // W
        module.exports.updateMovement('up', false);
        break;

        case 68: // D
        module.exports.updateMovement('right', false);
        break;

        case 83: //S
        module.exports.updateMovement('down', false);
        break;
    }
});

// Function that we will export as well so we can call it elsewhere. This will be utilised to easily update the players movement.
module.exports.updateMovement = function(key, value){
    movement[key] = value;
}

// Function to return the movement object.
module.exports.getMovement = function()
{
    return movement;
}