class Character extends MovableObject {
    y = 180;
    speed = 3;
    IDLE_IMAGES = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ]
    SWIMMING_IMAGES = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    world;
    swimming_sound = new Audio('audio/swimming.mp3');

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IDLE_IMAGES);
        this.loadImages(this.SWIMMING_IMAGES);
        this.animate();
        this.swimming_sound.volume = 0.7;
    }

    animate() {
        this.move();

        setInterval(() => {
            if (this.world.keyboard.NO_KEY_PRESSED) {
                this.animateImages(this.IDLE_IMAGES);
            }
        }, 220)
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.animateImages(this.SWIMMING_IMAGES);
            }
        }, 150)
        //this.world.camera_x = -this.x;
    }

    move() {
        setInterval(() => {
            this.swimming_sound.pause();
            this.moveRight();
            this.moveLeft();
            this.moveUp();
            this.moveDown();
            this.world.camera_x = -this.x + 80;
        }, 1000 / 60);
    }

    moveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.otherDirection = false;
            this.x += this.speed;
            this.swimming_sound.play();
        }
    }

    moveLeft() {
        if (this.world.keyboard.LEFT && this.x > -80) {
            this.otherDirection = true;
            this.x -= this.speed;
            this.swimming_sound.play();
        }
    }

    moveUp() {
        if (this.world.keyboard.UP && this.y > -65) {
            this.swimmingUp = true;
            this.y -= this.speed;
            this.swimming_sound.play();
        } else {
            this.swimmingUp = false;
        }
    }

    moveDown() {
        if (this.world.keyboard.DOWN && this.y < this.world.level.level_end_y) {
            this.swimmingDown = true;
            this.y += this.speed;
            this.swimming_sound.play();
        } else {
            this.swimmingDown = false;
        }
    }

}