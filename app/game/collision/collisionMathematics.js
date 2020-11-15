/***
 *
 * Back-end Collision Mathematics Component File
 *
 ***/

module.exports.rectToRect = function (rect1X, rect1Y, rect1W, rect1H,
    rect2X, rect2Y, rect2W, rect2H){
    if (rect1X + rect1W >= rect2X &&    // r1 right edge past r2 left
        rect1X <= rect2X + rect2W &&    // r1 left edge past r2 right
        rect1Y + rect1H >= rect2Y &&    // r1 top edge past r2 bottom
        rect1Y <= rect2Y + rect2H) {    // r1 bottom edge past r2 top
        return true;
    }
    return false;
}