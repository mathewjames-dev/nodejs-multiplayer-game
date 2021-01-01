/***
 *
 * Back-end      Component File
 *
 ***/
const fs = require('fs');
const SpriteModel = require('../../../database/models/sprite');
const SpriteManager = require('./spriteManager');
const NPC = require('../../entities/npc');
const NPCModel = require('../../../database/models/npc');

class MapManager {
    constructor(map) {
        this.id = map.id
        this.name = map.name;
        this.location = map.location;
        this.data = this.getMapData();
        this.npcs = {};
    }

    getMapData() {
        return JSON.parse(fs.readFileSync('./storage' + this.location, 'utf8'));
    }

    async getNPCs() {
        try {
            const mapNpcs = await NPCModel.find({ 'mapId': this.id }).exec();
            return mapNpcs;
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

                const npcSprite = new SpriteManager(await SpriteModel.findOne({ "id": entity.spriteId }).exec());

                let npc = new NPC({
                    name: entity.name,
                    x: entity.x,
                    y: entity.y,
                    sprite: npcSprite,
                    health: entity.health,
                    maxHealth: entity.maxHealth
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