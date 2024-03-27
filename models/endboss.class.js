class Endboss extends MovableObject {
    x = 4000 //2350;
    y = -50;
    speed = 5;
    width = 350;
    height = 450;
    firstContact = false;
    introDone = false;
    movingUp = true;
    movingLeft = true;
    lifepoints = 30;

    FLOATING_IMAGES = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ]

    INTRO_IMAGES = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ]

    ATTACK_IMAGES = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png',
    ]

    HURT_IMAGES = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
    ]

    DEAD_IMAGES = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
    ]

    constructor() {
        super().loadImage(this.FLOATING_IMAGES[0]);
        this.loadImages(this.FLOATING_IMAGES);
        this.loadImages(this.INTRO_IMAGES);
        this.loadImages(this.ATTACK_IMAGES);
        this.loadImages(this.HURT_IMAGES);
        this.loadImages(this.DEAD_IMAGES);
        this.speed = this.speed + Math.random() * 1.25;
        this.animate();
    }

    /**
     * animates either the intro, the movement, the hurt or death animation
     * once the character is close to the endsection it restarts the intro animation
     */
    animate() {
        let i;
        setInterval(() => {
            if (i < 10) {
                this.animateIntro();
                i++;
            } else if (i >= 10 && this.introDone) {
                this.move();
                this.hurtAnimation();
                this.deadAnmation();
            }
            if (this.firstContact && !this.introDone) {
                i = 0;
                this.restartIntro();
            }
        }, 125)
    }

    /**
     * show the dead animation, once the animation ran once it moves the endboss out of the canvas
     */
    deadAnmation() {
        if (this.isDead()) {
            if (this.deadCounter < this.DEAD_IMAGES.length) {
                this.animateImages(this.DEAD_IMAGES);
                this.deadCounter++;
            } else {
                this.loadImage(this.DEAD_IMAGES[4]);
                this.y -= 20;
            }
        } 
    }

    /**
     * displays the hurt animation, after 1 second it stops
     */
    hurtAnimation() {
        let timePassed = (new Date().getTime() - this.lastHit) / 1000;
        if (timePassed < 1) {
            this.animateImages(this.HURT_IMAGES);
        }
    }

    /**
     * checks which direction the endboss is moving and changes the depending on that the direction. 
     * to have the movements more random it sets a random y coordinate. So the character moves left more randomly
     */
    move() {
        if (!this.isDead()) {
            let y_end = this.y + Math.random() * -140
            if (this.movingUp && this.movingLeft) {
                this.moveUp(y_end);
            } else if (this.movingLeft) {
                this.moveLeft()
            } else if (!this.movingUp) {
                this.moveDown();
            } else if (!this.movingLeft) {
                this.moveRight();
            }
        }
    }

    /**
     * moves the endboss to the left
     */
    moveLeft() {
        this.x -= this.speed + 10;
        this.animateImages(this.ATTACK_IMAGES);
        if (this.x <= 2050) {
            this.movingLeft = false;
        }
    }

    /**
     * moves the endboss to the right
     */
    moveRight() {
        this.x += this.speed + 10;
        if (this.x >= 2350) {
            this.movingLeft = true;
        }
    }

    /**
     * moves the endboss up
     */
    moveUp(y_end) {
        this.y -= this.speed
        this.animateImages(this.FLOATING_IMAGES);
        if (this.y <= -140 || this.y <= y_end) {
            this.movingUp = false;
        }
    }

    /**
     * moves the endboss down
     */
    moveDown() {
        this.y += this.speed;
        this.animateImages(this.FLOATING_IMAGES);
        if (this.y >= 90) {
            this.movingUp = true;
        }
    }

    /**
     * animates the intro sequence
     */
    animateIntro() {
        this.x = 2350;
        this.animateImages(this.INTRO_IMAGES)
    }

    /**
     * restarts the intro once the character is close
     */
    restartIntro() {
        this.firstContact = false;
        this.introDone = true;
    }

}