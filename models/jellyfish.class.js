class Jellyfish extends MovableObject {
    x = 200 + Math.random() * 400;
    y = Math.random() * 300
    width = 50;
    height = 75;
    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];
    currentImage = 0;

    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.move();
        this.animate();
    }

    moveDown() {
        let myInterval = setInterval(() => {
            this.y += 1;
            if (this.y >= 410) {
                clearInterval(myInterval);
                this.moveUp();
            }
        }, 1000 / 60);


    }

    moveUp() {
        let myInterval = setInterval(() => {
            this.y -= 1;
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
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING.length;
            this.img.src = this.IMAGES_SWIMMING[i];
            this.currentImage++;
        }, 220)
    }
}