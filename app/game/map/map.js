/***
 *
 * Back-end Map Component File
 *
 ***/
const fs = require('fs');
const MapDatabase = require('../../database/mapDatabase');

class Map {
    constructor(mapName, mapLocation) {
        this.name = mapName;
        this.location = mapLocation;

        this.mapDatabase = new MapDatabase();
    }

    getMapData() {
        return JSON.parse(fs.readFileSync('./storage' + this.location, 'utf8'));
    }
}

module.exports = Map;