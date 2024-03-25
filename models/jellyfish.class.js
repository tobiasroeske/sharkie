class Jellyfish extends Enemy {
    y = Math.random() * 300
    width = 50;
    height = 75;
    speed = 0.8;
    lifepoints = 5;
    acceleration = 0.2;
    closeToCharacter = false;

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
        this.speed = this.speed + Math.random() * 0.25;
        this.animate();
        this.x = x + 300 + Math.random() * 300; 
    }

    moveDown() {
        let myInterval = setInterval(() => {
            this.y += this.speed;
            if (this.y >= 410) {
                clearInterval(myInterval);
                this.moveUp();
            }
        }, 1000 / 60);
    }

    moveUp() {
        let myInterval = setInterval(() => {
            this.y -= this.speed;
            if (this.y <= 0) {
                clearInterval(myInterval);
                this.moveDown();
            }
        }, 1000 / 60)
    }

    move() {
        let randomNumber = Math.floor(Math.random() * 11);
        if (randomNumber >= 5) {
            this.moveDown();
        } else {
            this.moveUp();
        }
    }

    animate() {
        this.move();
        setInterval(() => {
            if (this.isDead()) {
                this.animateImages(this.DEAD_IMAGES);
                this.applyGravity();
            } else if (this.closeToCharacter) {
                this.animateImages(this.DANGEROUS_IMAGES);
            } else {
                this.animateImages(this.IMAGES_SWIMMING);
            }
        }, 220)
    }
}