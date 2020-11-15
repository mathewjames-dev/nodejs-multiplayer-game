/***
 *
 * Front-end Render Component
 *
 ***/
module.exports.map = {
    context: null,
    mapData: null,
    mapTileSet: null,
    mapLayers: [],

    renderMapLayer: function (layer) {
        if (layer.type !== 'tilelayer' || !layer.opacity) {
            return;
        }

        let contextDuplication = this.context.canvas.cloneNode();
        contextDuplication = contextDuplication.getContext("2d");

        let rows = this.mapData.height,
            columns = this.mapData.width,
            size = this.mapData.tilewidth;

        // If the map hasn't been rendered already - We need to render it.
        if (this.mapLayers.length < this.mapData.layers.length) {
            for (let c = 0; c < columns; c++) {
                for (let r = 0; r < rows; r++) {
                    let tile = layer.data[r * columns + c];
                  
                    if (tile !== 0) { // 0 => empty tile
                        tile--;

                        img_x = (tile % (this.mapData.tilesets[0].imagewidth / size)) * size;
                        img_y = ~~(tile / (this.mapData.tilesets[0].imagewidth / size)) * size;

                        contextDuplication.drawImage(
                            this.mapTileSet,
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
            this.context.drawImage(contextDuplication.canvas, 0, 0);
        } else {
            for (i = 0; i <= this.mapLayers.length; i++) {
                var image = $("<img />", { src: this.mapLayers[i] })[0];
                this.context.drawImage(image, 0, 0);
            }
        }
    },

    renderMapLayers: function (layers) {
        layers = $.isArray(layers) ? layers : this.mapData.layers;
        $.each(layers, function (index, value) {
            module.exports.map.renderMapLayer($(this)[0]);
        });
    },

    loadMapTileset: function (json) {
        this.mapData = json;    
        this.mapTileSet = new Image();
        this.mapTileSet.src = '/public/maps/tilesets/' + json.tilesets[0].image;
        this.mapTileSet.onload = function () {
            module.exports.map.renderMapLayers(module.exports.map);
        }
    },

    loadMap: function (name) {
        // Utilize the name of the map to get the JSON from the maps folder.
        $.getJSON("/public/maps/" + name + ".json", function (json) {
            module.exports.map.loadMapTileset(json);
        });
    }
}

