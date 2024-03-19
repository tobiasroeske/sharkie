class Statusbar extends MovableObject {
    x = 20;
    y = 20;
    width = 200;
    height = 50;
    lifepoints = 100;

    LIFE_IMAGES = [
        'img/4. Marcadores/orange/0_  copia.png',
        'img/4. Marcadores/orange/20_ copia 2.png',
        'img/4. Marcadores/orange/40_  copia.png',
        'img/4. Marcadores/orange/60_  copia.png',
        'img/4. Marcadores/orange/80_  copia.png',
        'img/4. Marcadores/orange/100_  copia.png'
    ]

    constructor(y) {
        super().loadImage(this.LIFE_IMAGES[5]);
        this.loadImages(this.LIFE_IMAGES);
        this.y = y;
    }

    loseLife() {
        this.lifepoints -= 5;
        let index = Math.round(this.lifepoints / 20) 
        this.loadImage(this.LIFE_IMAGES[index]);
    }
}