/***
 *
 * Map Render Front-end File
 * This will be utilized to house the map rendering for the game.
 *
 ***/
class MapRender {
    constructor() {
        this.context = mapContext;
        this.mapLayers = [];
    }

    async loadMap(mapData) {
        await this.loadMapSounds(mapData.sounds)
            .then(this.renderMap(mapData));
    }

    async loadMapSounds(mapSounds) {
        for (let s = 0; s <= mapSounds.length; s++) {
            let sound = mapSounds[s];
            if (!sound) continue;

            game.assetLoader.addSound(sound.name, sound.location);
        }
    }

    renderMap(json) {
        this.mapData = json;
        this.loadMapTileset(json);
    }

    loadMapTileset(json) {
        let $this = this;

        this.mapTileSet = new Image();
        this.mapTileSet.src = '/public/assets/maps/tilesets/' + json.tilesets[0].image;
        this.mapTileSet.onload = function () {
            $this.renderMapLayers();
        }
    }

    renderMapLayers(layers) {
        let $this = this;
        layers = $.isArray(layers) ? layers : this.mapData.layers;
        $.each(layers, function (index, value) {
            $this.renderMapLayer($(this)[0]);
        });
    }

    renderMapLayer(layer) {
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

                        let img_x = (tile % (this.mapData.tilesets[0].imagewidth / size)) * size;
                        let img_y = ~~(tile / (this.mapData.tilesets[0].imagewidth / size)) * size;

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
    }
}

module.exports = MapRender;
