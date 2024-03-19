class Jellyfish extends MovableObject {
    x = 200 + Math.random() * 400;
    y = Math.random() * 300
    width = 50;
    height = 75;
    speed = 0.8;
    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];


    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.speed = this.speed + Math.random() * 0.25;
        this.animate();
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
            this.animateImages(this.IMAGES_SWIMMING);
        }, 220)
    }
}