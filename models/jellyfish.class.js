class Jellyfish extends Enemy {
    
    y = Math.random() * 300
    width = 50;
    height = 75;
    speed = 0.8;
    lifepoints = 5;
    acceleration = 0.2;
    closeToCharacter = false;

    /**
     * moves the jellyfish downwards and once it reaches the canvas bottom it stops the interval
     * and moves it upwards
     */
    moveDown() {
        let myInterval = setInterval(() => {
            this.y += this.speed;
            if (this.y >= 410) {
                clearInterval(myInterval);
                this.moveUp();
            }
        }, 1000 / 60);
    }

    /**
     * moves the jellyfish upwards and once it reaches the canvas bottom it stops the interval
     * and moves it downwards
     */
    moveUp() {
        let myInterval = setInterval(() => {
            this.y -= this.speed;
            if (this.y <= 0) {
                clearInterval(myInterval);
                this.moveDown();
            }
        }, 1000 / 60)
    }

    /**
     * gets a random number between 0 and 10 and depending on that number the 
     * Jellyfish starts moving upwards or downwards
     */
    move() {
        let randomNumber = Math.floor(Math.random() * 11);
        if (randomNumber >= 5) {
            this.moveDown();
        } else {
            this.moveUp();
        }
    }

    /**
     * animates all the movents and applies gravity to the jellyfish once it has died
     * to move it out of the canvas
     */
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