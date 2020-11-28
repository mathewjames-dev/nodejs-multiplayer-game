/***
 *
 * Constants Front-end File
 * This file will be utilized to house top level global variables.
 *
 ***/
const Routing = require("./components/routes/routes");

// Routing
global.routes = new Routing();


// Element Related Constants
global.mapCanvas = document.getElementById('mapContainer');
global.mapContext = mapCanvas.getContext("2d");
global.playerCanvas = document.getElementById('playerContainer');
global.playerContext = playerCanvas.getContext("2d");