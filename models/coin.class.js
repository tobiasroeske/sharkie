class Coin extends CollectableObject {
    sound = new Audio('audio/coin_collected.mp3');

    IMAGES = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.animate();
    }
}