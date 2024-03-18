class Pufferfish extends MovableObject {
    x = 630;
    y = Math.random() * 400;
    height = 58;
    width = 75;
    speed = 0.8 + Math.random() * 0.25;
    IMAGES_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
    ];

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            this.animateImages(this.IMAGES_SWIMMING);
        }, 220)
    }
}