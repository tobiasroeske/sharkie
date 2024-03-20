class Character extends MovableObject {
    y = 180;
    x_frame = this.x;
    y_frame = this.y + this.height / 2 - 10;
    width_frame = this.width - 5;
    height_frame = this.height / 2 - 15;
    speed = 3;
    otherDirection = false;
    swimmingUp = false;
    swimmingDown = false;
    lifepoints = 100;
    coins = 0;
    poisons = 0;

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

    DEAD_IMAGES = [
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00000.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00001.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00002.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00003.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00004.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00005.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00006.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00007.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00008.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00009.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00010.png',
    ]

    DEAD_SHOCKED_IMAGES = [
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png'
    ];

    HURT_POISONED_IMAGES = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png'
    ]

    HURT_SHOCKED_IMAGES = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png'
    ]

    world;
    swimming_sound = new Audio('audio/swimming.mp3');

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IDLE_IMAGES);
        this.loadImages(this.SWIMMING_IMAGES);
        this.loadImages(this.DEAD_IMAGES);
        this.loadImages(this.DEAD_SHOCKED_IMAGES);
        this.loadImages(this.HURT_SHOCKED_IMAGES);
        this.loadImages(this.HURT_POISONED_IMAGES);
        this.animate();
        this.swimming_sound.volume = 0.7;
    }

    addCoin() {
        this.coins++;
        console.log('collected coins: ', this.coins);
    }

    addPoison() {
        this.poisons++;
        console.log('collected poisons: ', this.poisons);
    }

    deathAnimation(obj) {
        this.stopAllIntervals()
        if (obj instanceof Jellyfish) {
            this.typeOfDeath(this.DEAD_SHOCKED_IMAGES, 3)
        } else {
            this.typeOfDeath(this.DEAD_IMAGES, -3);
        }
    }

    typeOfDeath(images, speed) {
        let deadInterval = setInterval(() => {
            this.animateImages(images);
            this.deadCounter++
            if (this.deadCounter == images.length - 1) {
                clearInterval(deadInterval);
                this.loadImage(images[images.length - 1]);
                setInterval(() => {
                    this.y += speed;
                }, 1000 / 60);
            }
        }, 250);
        this.intervalIDs.push(deadInterval);
    }

    hurtAnimation(obj) {
        setInterval(() => {
            let timePassed = new Date().getTime() - this.lastHit;
            timePassed = timePassed / 1000;
            if (timePassed < 1) {
                if (obj instanceof Jellyfish) {
                    this.animateImages(this.HURT_SHOCKED_IMAGES);
                } else {
                    this.animateImages(this.HURT_POISONED_IMAGES);
                }
            }
        }, 200);
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y + this.height / 2 - 10, this.width - 5, this.height / 2 - 15);
        ctx.stroke();
    }

    isColliding(obj) {
        if (obj instanceof Endboss) {
            return (
                this.x_frame + this.width_frame > obj.x &&
                this.y_frame + this.height_frame > obj.y + obj.height / 3 &&
                this.x_frame < obj.x + obj.width &&
                this.y_frame < obj.y + obj.height / 3 + obj.height / 2
            );
        } else {
            return (
                this.x_frame + this.width_frame >= obj.x &&
                this.y_frame + this.height_frame > obj.y &&
                this.x_frame < obj.x + obj.width &&
                this.y_frame < obj.y + obj.height
            )
        }
    }

    animate() {
        this.move();
        let idleInterval = setInterval(() => {
            if (this.world.keyboard.NO_KEY_PRESSED) {
                this.animateImages(this.IDLE_IMAGES);
            }
        }, 220)
        this.intervalIDs.push(idleInterval);
        let swimInterval = setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.animateImages(this.SWIMMING_IMAGES);
            }
        }, 150)
        this.intervalIDs.push(swimInterval);
    }

    move() {
        let moveInterval = setInterval(() => {
            this.swimming_sound.pause();
            this.moveRight();
            this.moveLeft();
            this.moveUp();
            this.moveDown();
            this.world.camera_x = -this.x + 220;
            if (this.world.level.inEndSection) {
                this.world.camera_x = -2000;
                this.world.level.level_end_x_left = 2000
            }
        }, 1000 / 60);
        this.intervalIDs.push(moveInterval);
    }



    checkIfInEndSection() {
        if (this.x >= 2220) {
            this.world.level.inEndSection = true;
        }
    }

    moveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.otherDirection = false;
            this.x += this.speed;
            this.x_frame += this.speed
            this.checkIfInEndSection();
            this.swimming_sound.play();
        }
    }

    moveLeft() {
        if (this.world.keyboard.LEFT && this.x > this.world.level.level_end_x_left) {
            this.otherDirection = true;
            this.x -= this.speed;
            this.x_frame -= this.speed;
            this.swimming_sound.play();
        }
    }

    moveUp() {
        if (this.world.keyboard.UP && this.y > -65) {
            this.swimmingUp = true;
            this.y -= this.speed;
            this.y_frame -= this.speed;
            this.swimming_sound.play();
        } else {
            this.swimmingUp = false;
        }
    }

    moveDown() {
        if (this.world.keyboard.DOWN && this.y < this.world.level.level_end_y) {
            this.swimmingDown = true;
            this.y += this.speed;
            this.y_frame += this.speed;
            this.swimming_sound.play();
        } else {
            this.swimmingDown = false;
        }
    }
}