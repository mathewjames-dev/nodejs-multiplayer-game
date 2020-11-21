/***
 *
 * Front-end Asset Loader Component
 *
 ***/
class AssetLoader {
    constructor() {
        this.assetsLoaded = 0;

        // Map Loading
        this.mapRender = require('./map/render');
        this.map;

        // Sounds Library
        this.sounds = [];
    }

    // Main Functions
    assetLoaded(array, name) {
        // Ignore already loaded assets
        if (this[array][name].status !== 'loading') return;

        this[array][name].status = 'loaded';
        this.assetsLoaded++;
    }

    loadAssets() {
        this.loadMap();
        this.loadSounds();
    }


    // Map Related
    setMap(name) {
        this.map = name;
    }

    loadMap() {
        this.mapRender.map.loadMap(this.map);
    }


    // Sound Related
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