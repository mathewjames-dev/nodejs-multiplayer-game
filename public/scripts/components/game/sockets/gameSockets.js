/***
 *
 * Front-end Game Sockets Component
 *
 ***/
const player = require('../player/player');

/*
 * Player Socket Listeners
 */
socket.on('playersState', function (players) {
    player.updatePlayersState(playerContext, players);
});
