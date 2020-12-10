/***
 *
 * Map Render Front-end File
 * This will be utilized to house the map rendering for the game.
 *
 ***/
class MapRender {
    constructor() {
        this.contextBelow = mapContextBelow;
        this.contextAbove = mapContextAbove;
        this.mapLayers = [];
        this.mapTilesets = [];
        this.loadedTilesets = 0;
    }

    // Function to load the map data (Sounds and tilesets).
    async loadMap(mapData) {
        let $this = this;
        await this.loadMapSounds(mapData.sounds)
            .then(this.loadMapTileset(mapData));
    }

    // Function to load the map sounds.
    async loadMapSounds(mapSounds) {
        return true;
        /* for (let s = 0; s <= mapSounds.length; s++) {
             let sound = mapSounds[s];
             if (!sound) continue;
 
             game.assetLoader.addSound(sound.name, sound.location);
         }*/
    }

    // Function to load the map tilesets.
    async loadMapTileset(json) {
        this.mapData = json;

        for (let t = 0; t <= json.tilesets.length; t++) {
            let tileset = json.tilesets[t];
            if (!tileset) continue;

            let $this = this;
            let src = tileset.image;

            this.mapTilesets[tileset.name] = new Image();
            this.mapTilesets[tileset.name].name = tileset.name;
            this.mapTilesets[tileset.name].src = '/public/assets/maps/tilesets/' + src;
            this.mapTilesets[tileset.name].gid = tileset.firstgid;
            this.mapTilesets[tileset.name].onload = function () {
                $this.loadedTileset();
            }
        }
    }

    // Function that gets fired upon finished loading of a tileset.
    loadedTileset() {
        this.loadedTilesets++;

        // If all the tilesets have been loaded - We can begin to render the map layers.
        if (this.loadedTilesets === this.mapData.tilesets.length) {
            this.renderMapLayers();
        }
    }


    // Function to render the map layers - The layer parameter is optional.
    renderMapLayers(layers) {
        let $this = this;

        layers = $.isArray(layers) ? layers : this.mapData.layers;

        $.each(layers, function (index, value) {
            $this.renderMapLayer($(this)[0]);
        });
    }

    // Function to render the actual map layer.
    renderMapLayer(layer) {
        if (layer.type !== 'tilelayer' || !layer.opacity) {
            return;
        }

        var layerAbove = false;

        // Determine if the layer is above or below utilising the layer properties.
        if (layer.properties) {
            for (let p in layer.properties) {
                let property = layer.properties[p];
                if (property.hasOwnProperty('name') && property['name'] === 'player' && property['value'] === 1) {
                    layerAbove = true;
                }
            }
        }

        // Check layer above variable to determine what canvas context we use.
        if (layerAbove) {
            var contextDuplication = this.contextAbove.canvas.cloneNode();
        } else {
            var contextDuplication = this.contextBelow.canvas.cloneNode();
        }

        // Setup the variables - Also find the tileset we need to utilise based on the properties.
        let tileset = layer.properties.find(function (property, index) {
            if (property.name == 'tileset')
                return true;
        }),
            rows = this.mapData.height,
            columns = this.mapData.width,
            size = this.mapData.tilewidth,
            tilesetGid = this.mapTilesets[tileset.value].gid;

        contextDuplication = contextDuplication.getContext("2d");

        // If the map hasn't been rendered already - We need to render it.
        // if (this.mapLayers.length < this.mapData.layers.length) {
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows; r++) {
                let tile = layer.data[r * columns + c];

                if (tile !== 0) { // 0 => empty tile
                    tile--;

                    tile = tile - (tilesetGid - 1);

                    let img_x = (tile % (this.mapTilesets[tileset.value].width / size)) * size;
                    let img_y = ~~(tile / (this.mapTilesets[tileset.value].width / size)) * size;

                    contextDuplication.drawImage(
                        this.mapTilesets[tileset.value],
                        img_x,
                        img_y,
                        size,
                        size,
                        (c * size),
                        (r * size),
                        size,
                        size);
                }
            }
        }

        // Store the map so we can render faster next time, then draw to canvas.
        this.mapLayers.push(contextDuplication.canvas.toDataURL());

        if (layerAbove) {
            this.contextAbove.drawImage(contextDuplication.canvas, 0, 0);
        } else {
            this.contextBelow.drawImage(contextDuplication.canvas, 0, 0);
        }
        // }
        //else {
        //  for (let i = 0; i <= this.mapLayers.length; i++) {
        //    var image = $("<img />", { src: this.mapLayers[i] })[0];
        //  this.context.drawImage(image, 0, 0);
        //  }
        // }
    }
}

module.exports = MapRender;
