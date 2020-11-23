/***
 *
 * Front-end Asset Loader Component
 *
 ***/
const MapRender = require("./map/render");

class AssetLoader {
    constructor() {
        this.assetsLoaded = 0;

        // Map Loading
        this.mapRender = new MapRender;

        // Libraries
        this.images = [];
        this.sounds = [];
    }


    /*
     * Main Asset Loader Functions
     */
    // Checks an asset to see if it has been loaded.
    assetLoaded(array, name) {
        // Ignore already loaded assets
        if (this[array][name].status !== 'loading') return;

        this[array][name].status = 'loaded';
        this.assetsLoaded++;
    }

    // Loads all the assets.
    loadAssets() {
        this.loadImages();
        this.loadSounds();
    }

    /*
     * Image Related Functions.
     */
    addImage(name, file) {
        this.images[name] = file;
    }

    loadImages() {
        for (image in this.images) {
            if (!this.images[image]) continue;

            let $this = this;
            let src = this.images[image];

            this.images[image] = new Image();
            this.images[image].status = 'loading';
            this.images[image].name = image;
            this.images[image].src = src;
            this.images[image].onload = function () { $this.assetLoaded.call($this, "images", image) };
        }
    }  


    /*
     * Map Related Functions.
     */
    loadMap(mapData) {
        this.loadMapSounds(mapData.sounds);
        this.mapRender.loadMap(mapData);
    }

    loadMapSounds(mapSounds) {
        for (let s = 0; s <= mapSounds.length; s++) {
            let sound = mapSounds[s];
            if (!sound) continue;

            this.addSound(sound.name, sound.location);
        }
    }


    /*
     * Sound Related Functions
     */
    addSound(name, file) {
        this.sounds[name] = file;
    }

    checkAudioState(sound) {
        if (this.sounds[sound].status === 'loading'
            && this.sounds[sound].readyState === 4) {
            this.assetLoaded('sounds', sound);
        }
    }

    loadSounds() {
        for (sound in this.sounds) {
            if (!this.sounds[sound]) continue;

            let $this = this;
            let src = this.sounds[sound];

            this.sounds[sound] = new Audio();
            this.sounds[sound].status = 'loading';
            this.sounds[sound].name = sound;
            this.sounds[sound].addEventListener('canplay', function () {
                $this.checkAudioState(sound);
            });
            this.sounds[sound].src = src;
            this.sounds[sound].preload = 'auto';
            this.sounds[sound].load();
        }
    }  
}

module.exports = AssetLoader;