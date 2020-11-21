/***
 *
 * Front-end Constants Component
 *
 ***/

// Socket IO.
global.socket = io();

// Element Related Constants
global.mapCanvas = document.getElementById('mapContainer');
global.mapContext = mapCanvas.getContext("2d");
global.playerCanvas = document.getElementById('playerContainer');
global.playerContext = playerCanvas.getContext("2d");

// Player Related Constants.
global.playerIsAuthenticated = false;
global.playerUsername = '';
