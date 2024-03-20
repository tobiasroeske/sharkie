class Coinbar extends Statusbar {

    COIN_IMAGES = [
        'img/4. Marcadores/Purple/0_ _1.png',
        'img/4. Marcadores/Purple/20_ .png',
        'img/4. Marcadores/Purple/40_ _1.png',
        'img/4. Marcadores/Purple/60_ _1.png',
        'img/4. Marcadores/Purple/80_ _1.png',
        'img/4. Marcadores/Purple/100__1.png'
    ]

    constructor() {
        super();
        this.loadImage(this.COIN_IMAGES[0]);
        this.y = 40;
        this.height = 45;
    }
}