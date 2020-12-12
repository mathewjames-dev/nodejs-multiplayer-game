/***
 *
 * Asset Loader Front-end File
 * This will be utilized to house the assets for the game.
 *
 ***/
class AssetLoader {
    constructor() {
        this.assetsLoaded = 0;

        // Libraries
        this.images = [];
        this.sounds = [];
    }

    // Checks an asset to see if it has been loaded.
    assetLoaded(array, name) {
        // Ignore already loaded assets
        if (this[array][name].status !== 'loading') return;

        this[array][name].status = 'loaded';

        this.assetsLoaded++;
    }

    // Loads all the assets.
    async loadAssets() {
        await game.assetLoader.loadImages();
        await game.assetLoader.loadSounds();
    }

    /*
     * Image Related Functions.
     */
    addImage(name, file) {
        this.images[name] = file;
    }

    async loadImages() {
        for (var image in this.images) {
            if (!this.images[image]) continue;
            if (this.images[image].status == 'loaded') continue;

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

    async loadSounds() {
        for (var sound in this.sounds) {
            if (!this.sounds[sound]) continue;
            if (this.sounds[sound].readyState === 0) continue;
           
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