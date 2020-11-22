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
        this.mapData = {};
        this.mapSounds = [];
    }

    getMapData() {
        this.mapData = JSON.parse(fs.readFileSync('./storage' + this.location, 'utf8'));
        return this.mapData;
    }

    getMapSounds() {
        return new Promise((resolve, reject) => {
            this.mapDatabase.retrieveMapSounds(this.name, function (sounds) {
                if (sounds) resolve(sounds);
                else reject("Could not retrieve sounds");
            });
        });
    }
}

module.exports = Map;