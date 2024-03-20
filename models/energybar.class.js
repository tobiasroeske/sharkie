class Energybar extends Statusbar {
    
    LIFE_IMAGES = [
        'img/4. Marcadores/orange/0_  copia.png',
        'img/4. Marcadores/orange/20_ copia 2.png',
        'img/4. Marcadores/orange/40_  copia.png',
        'img/4. Marcadores/orange/60_  copia.png',
        'img/4. Marcadores/orange/80_  copia.png',
        'img/4. Marcadores/orange/100_  copia.png'
    ]

    constructor() {
        super().loadImage(this.LIFE_IMAGES[5]);
        this.loadImages(this.LIFE_IMAGES);
        this.y = 0;
    }

    getPercentage(percentage) {
        let index = Math.round(percentage / 20);
        let path = this.LIFE_IMAGES[index];
        this.img = this.imageCache[path];
    }
}