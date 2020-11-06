/***
 *
 * Back-end Collision Component File
 *
 ***/
// Import the components required.
const fs = require('fs');

// Canvas related variables.
const gameWidth = 800;
const gameHeight = 608;

// Sprite related variables. !!! EVENTUALLY UPDATE TO BE ENTITY DYNAMIC VARIABLES
const spriteRadius = 8;
const spriteWidth = spriteRadius * 2;

// Map related variables.
var globalMapName;
var globalMapData;
var globalNonCollidableObjects = [];

module.exports.checkEdgeCollision = function (entity, x, y) {
    // Checking the left and right edges first.
    if (x < 0) {
        entity.isColliding = true;
    } else if (x > gameWidth - (spriteRadius * 4)) {
        entity.isColliding = true;
    } else {
        entity.isColliding = false;
    }

    // Check for bottom and top edges.
    if (y < 0) {
        entity.isColliding = true;
    } else if (y > gameHeight - (spriteRadius * 4)) {
        entity.isColliding = true;
    } else {
        entity.isColliding = false;
    }

    return entity;
}

module.exports.checkNonCollidableMapObjects = function (entity, x, y) {
    // Future proofing for when we put in dynamic maps. We want to make sure we're not reading the file every time.
    if (!globalMapName) globalMapName = 'map1.json';

    if (!globalMapData) {
        var mapData = JSON.parse(fs.readFileSync('./public/maps/' + globalMapName
            //+ self.map
            , 'utf8'));
        globalMapData = mapData;
    } else {
        var mapData = globalMapData;
    }

    let entityX = Math.round(x / spriteWidth),
        entityY = Math.round(y / spriteWidth);

    if (globalNonCollidableObjects.length === 0) {
        // Non collidable objects haven't been pushed for this map.
        for (let i = 0; i <= mapData.layers.length; i++) {
            let layer = mapData.layers[i];

            // If there isn't a layer to check return.
            if (!layer) return;

            let rows = mapData.height,
                columns = mapData.width,
                size = mapData.tilewidth;


            if (layer.hasOwnProperty('properties')) {
                for (p = 0; p < layer['properties'].length; p++) {
                    let property = layer['properties'][p];

                    if (property.hasOwnProperty('name') && property['name'] === 'Colliding' && property['value'] === true) {
                        // Non-Colliding layer that we need to check for collision

                        for (let c = 0; c < columns; c++) {
                            for (let r = 0; r < rows; r++) {
                                let tile = layer.data[r * columns + c];
                               
                                if (tile !== 0) { // 0 => empty tile
                                   globalNonCollidableObjects.push([c, r]);
                                }
                            }
                        }

                    }
                }
            }
        }
    }
    console.log(entityY);

    for (nonCollidingObject in globalNonCollidableObjects) {
        if (globalNonCollidableObjects[nonCollidingObject][0] === entityX && globalNonCollidableObjects[nonCollidingObject][1] === entityY) {
            entity.isColliding = true;
            return entity;
        }
    }

    entity.isColliding = false;
    return entity;
}



