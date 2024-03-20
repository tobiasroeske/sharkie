class Poisonbar extends Statusbar {

    POISON_IMAGES = [
        'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png'
    ]

    constructor() {
        super();
        this.loadImage(this.POISON_IMAGES[0]);
        this.loadImages(this.POISON_IMAGES);
        this.y = 75
        this.height = 45;
    }
}