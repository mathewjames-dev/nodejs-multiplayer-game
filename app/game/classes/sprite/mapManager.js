/***
 *
 * Back-end Map Component File
 *
 ***/
const fs = require('fs');
const Entity = require('../../entities/entity');
const SpriteModel = require('../../../database/models/sprite');
const SpriteManager = require('./spriteManager');

class MapManager {
    constructor(mapName, mapLocation) {
        this.name = mapName;
        this.location = mapLocation;

        this.data = this.getMapData();

        this.npcs = {};
    }

    getMapData() {
        return JSON.parse(fs.readFileSync('./storage' + this.location, 'utf8'));
    }

    async getNPCs() {
        try {
            var npcs;

            this.data.layers.filter((property, index) => {
                if (property.name === 'Spawn Points') {
                    let npcObjects = property.objects.filter((layer, i) => {
                        if (layer.type === 'npc') return true;
                    });

                    if (npcObjects) {
                        npcs = npcObjects;
                    }
                }
            });

            return npcs;
        } catch{
            return false;
        }
    }

    async setupNPCS(npcs) {
        if (!npcs) return;

        try {
            // There are npcs that we can load up for this map.
            for (let e = 0; e < npcs.length; e++) {
                let entity = npcs[e];
                if (!entity) continue;
                if (this.npcs[entity.name]) continue;

                let spriteRecord = await SpriteModel.findOne({ "name": entity.name }).exec();
                let entitySprite = new SpriteManager(spriteRecord);

                let npc = new Entity({
                    name: entity.name,
                    x: entity.x,
                    y: entity.y,
                    sprite: entitySprite,
                });

                this.npcs[entity.name] = npc;
            }

            return this;
        } catch{
            throw Error;
        }
    }

    async createUpdate() {
        let update = {
            mapData: this.data,
            npcs: this.npcs
        };

        return JSON.stringify(update);
    }
}

module.exports = MapManager;