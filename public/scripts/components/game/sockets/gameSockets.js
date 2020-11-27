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
        let $players = players;
        game.updatePlayersPackage($players)
            .then(function(){
            game.canvas.drawPlayerStates($players);
        });
    }
});
