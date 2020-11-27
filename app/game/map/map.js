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
        return new Promise((resolve, reject) => {
            let mapData = JSON.parse(fs.readFileSync('./storage' + this.location, 'utf8'));

            if (mapData) {
                resolve(mapData);
            } else {
                reject("Could not retrieve map data");
            }
        });
    }

    getMapSounds(mapData) {
        return new Promise((resolve, reject) => {
            this.mapDatabase.retrieveMapSounds(this.name, function (sounds) {
                if (sounds) {
                    mapData.sounds = sounds; resolve(mapData);
                } else {
                    reject("Could not retrieve sounds");
                }
            });
        });
    }
}

module.exports = Map;