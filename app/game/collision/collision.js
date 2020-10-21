/***
 *
 * Back-end Collision Component File
 *
 ***/
const gameWidth = 950;
const gameHeight = 750;

module.exports.checkEdgeCollision = function (value, direction) {
    switch (direction) {
        case 'left':
            return (value <= 0 ? true : false);
            break;
        case 'right':
            return (value >= gameWidth - 30 ? true : false)
            break;
        case 'up':
            return (value <= 0 ? true : false)
            break;
        case 'down':
            return (value >= gameHeight - 30 ? true : false)
            break;
    }
    return;
}
