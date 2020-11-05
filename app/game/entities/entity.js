/***
 *
 * Back-end Entity Component File
 *
 ***/

// Every movable object like players, bullets, npcs will all be based off the base entity.
exports.Entity = function (param) {
    var self = {
        // Co-ordinates
        x: 320,
        y: 320,

        // Movement object
        movement: {
            up: false,
            down: false,
            left: false,
            right: false
        },

        // Colliding flag against the entity
        isColliding: false,
    };

    
    //If we don't want our object to be based off of the defaults above, 
    //we can pass an object which we've named param and set the defaults to what we would like them to be.
    if (param) {
        if (param.x)
            self.x = param.x;
        if (param.y)
            self.y = param.y;
        if (param.map)
            self.map = param.map;
        if (param.name)
            self.name = param.name;
        if (param.id)
            self.id = param.id;
    }

    self.updatePosition = function () {
        /*var x = self.x + self.spdX;
        var y = self.y + self.spdY;
        
         Check the y and x with the check move function which will return either collision or move depending whether there is a collision
         If collision we then get the x and y of the collided object and continuously set the players x and y to this until they move away
         
        var check = self.checkMove(y, x);
        if (check == 'move') {
            self.x += self.spdX;
            self.y += self.spdY;
        } else {
            self.toRemove = true;
        }*/
    };

    self.checkMove = function (x, y) {
        /*
         Loop through properties in mapObject. If Collidable is true then we will loop the layer.
         Loop the layer and then the inner layer arrays. If the tile is not equal to 0
         AND that tile is not already in the notCollidableTiles array then push it to the array.
         */
        /*var mapData = JSON.parse(fs.readFileSync('./client/maps/' + self.map + '.json', 'utf8'));

        var mapDataObject = {
            mapName: self.map,
            cols: mapData.width,
            rows: mapData.height,
            tsize: mapData.tilewidth,
            layers: [
                mapData.layers[0].data, mapData.layers[1].data
            ],
            properties: [
                mapData.layers[0].properties,
                mapData.layers[1].properties
            ]
        };

        var notCollidableTiles = [];
        var properties = mapDataObject.properties;
        var collidableLayer;*/


        /*
         Loop through the not collidable layer and push the tiles which aren't empty to the not collidable array.
         */
       /* for (p = 0; p < properties.length; p++) {
            if (properties[p]) {
                if (properties[p].Collidable == true) {
                    collidableLayer = mapDataObject.layers[p];
                    for (m = 0; m < mapDataObject.layers[p].length; m++) {
                        for (t = 0; t < mapDataObject.layers[p][m].length; t++) {
                            if (mapDataObject.layers[p][m][t] !== 0) {
                                if (notCollidableTiles.indexOf(mapDataObject.layers[p][m][t]) >= 0) {
                                } else {
                                    notCollidableTiles.push(mapDataObject.layers[p][m][t]);
                                }
                            }
                        }
                    }
                }
            }
        }

        var xpos = 0;
        var ypos = 0;


        if (Math.round(x / 32) >= 20) {
            // xpos = Math.round(x / 32) - 1;
        } else {
            xpos = Math.round(x / 32);
        }

        if (Math.round(y / 32) >= 32) {
            // ypos = Math.round(y / 32) - 1;
        } else {
            ypos = Math.round(y / 32);
        }


        /*
         Look at the collidableLayer and if the tile that the player will move to is in the not collidable tiles then return collision.
         */
        /*if (xpos in collidableLayer == true) {
            if (ypos in collidableLayer[xpos] == true) {
                if (xpos == 0 || xpos == 19 || ypos == 0 || ypos == 32) {
                    //Collision if edge of map
                    return 'collision';
                }
                else if (notCollidableTiles.indexOf(collidableLayer[xpos][ypos]) > -1) {
                    //Collision hit a not collidable tile
                    return 'collision';
                }
                else {
                    //Move Player
                    return 'move';
                }
            }
        }*/
    };

    self.getDistance = function (pt) { //Pass a point (x and y) and it will return the distance with a square root
        return Math.sqrt(Math.pow(self.x - pt.x, 2) + Math.pow(self.y - pt.y, 2));
    };

    return self;
};