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
global.mapCanvasBelow = document.getElementById('mapContainerBelow');
global.mapContextBelow = mapCanvasBelow.getContext("2d");
global.mapCanvasAbove = document.getElementById('mapContainerAbove');
global.mapContextAbove = mapCanvasAbove.getContext("2d");
global.playerCanvas = document.getElementById('playerContainer');
global.playerContext = playerCanvas.getContext("2d");