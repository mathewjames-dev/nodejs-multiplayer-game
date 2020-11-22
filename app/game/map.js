/***
 *
 * Back-end Map Component File
 *
 ***/
var fs = require('fs'),
    path = require('path');

class Map {
    constructor() {
    }

    getMapData(mapLocation) {
        let mapData = fs.readFileSync('./storage' + mapLocation, 'utf8');
        return JSON.parse(mapData);
    }
}

module.exports = Map;