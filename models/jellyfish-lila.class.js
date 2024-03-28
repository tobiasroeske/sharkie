class JellyfishLila  extends Jellyfish{
    
    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    DEAD_IMAGES = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ]

    DANGEROUS_IMAGES = [
        'img/2.Enemy/2 Jelly fish/S｣per dangerous/Pink 1.png',
        'img/2.Enemy/2 Jelly fish/S｣per dangerous/Pink 2.png',
        'img/2.Enemy/2 Jelly fish/S｣per dangerous/Pink 3.png',
        'img/2.Enemy/2 Jelly fish/S｣per dangerous/Pink 4.png'
    ]

    constructor(x) {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.DEAD_IMAGES);
        this.loadImages(this.DANGEROUS_IMAGES);
        this.speed = this.speed + Math.random() * 0.5;
        this.animate();
        this.x = x;
        this.x_frame = this.x + 5;
        this.y_frame = this.y + 12;
        this.width_frame = this.width - 10;
        this.height_frame = this.height - 30;
    }
}