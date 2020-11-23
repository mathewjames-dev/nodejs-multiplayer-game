/***
 *
 * Front-end Game Sockets Component
 *
 ***/

/*
 * Player Socket Listeners
 */
socket.on('playersState', function (players) {
    if (global.game) {
        game.canvas.drawPlayerStates(players);
    }
});
