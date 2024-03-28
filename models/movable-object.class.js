class MovableObject extends DrawableObject {
    
    speed = 0.8;
    deadCounter = 0;
    attackCounter = 0;
    lastHit = 0;
    lastAttack = 0;
    gotHit = false;
    speedY = 0;
    acceleration = 1;
    isAttacking = false;

    /**
     * 
     * @returns true when the lifepoints are 0, false if not
     */
    isDead() {
        return this.lifepoints == 0;
    }

    /**
     * applies gravity to the canvas so obejects can fall down
     * increases the y speed by each run 
     */
    applyGravity() {
        setInterval(() => {
            this.y -= this.speedY;
            this.y_frame -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25)
    }

    /**
     * sets gotHit to true to not get hit more
     * plays the hit sound, decreases the lifepoints by 5 
     * sets a new timestap to the lastHit attribute
     */
    hit() {
        this.gotHit = true;
        sounds[4].play();
        this.lifepoints -= 5;
        if (this.lifepoints < 0) {
            this.lifepoints = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * attacks the desired object and calls the hit method
     * 
     * @param {object} obj enemy object
     */
    attack(obj) {
        let isJellyfish = obj instanceof Jellyfish;
        if (!isJellyfish) {
            obj.hit();
        }
    }
    
    /**
     * method to only display the attack animation for one round of invervals
     * 
     * @param {array} images array of paths as strings
     */
    attackAnimation(images) {
        let path = images[this.attackCounter];
        this.img = this.imageCache[path];
        this.attackCounter++;
    }

    /**
     * once the object isHurt it gets hit and starts the hurtAnimation 
     * when the character gets hit by a jellyfish it playes the shocked sound
     * 
     * @param {object} obj enemy object
     */
    isHurt(obj) {
        this.hit();
        this.hurtAnimation(obj);
        if (obj instanceof Jellyfish) {
            sounds[3].play();
        }
    }
}