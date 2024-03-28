class Coin extends CollectableObject {


    IMAGES = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];

    constructor(x) {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.animate();
        this.x = x;
        this.x_frame = this.x + 5;
        this.y_frame = this.y + 5;
        this.width_frame = this.width - 10;
        this.height_frame = this.height - 10;
    }
}