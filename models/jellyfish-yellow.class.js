class JellyfishYellow extends Jellyfish{
    
    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ]

    DEAD_IMAGES = [
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png'
    ]

    DANGEROUS_IMAGES = [
        'img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 4.png'
    ]

    constructor(x) {
        super().loadImage(this.IMAGES_SWIMMING[0]);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.DEAD_IMAGES);
        this.loadImages(this.DANGEROUS_IMAGES);
        this.speed = this.speed + Math.random() * 0.5;
        this.animate();
        this.x = x; 
        this.x = x;
        this.x_frame = this.x + 5;
        this.y_frame = this.y + 12;
        this.width_frame = this.width - 10;
        this.height_frame = this.height - 30;
    }
}