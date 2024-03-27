class Bubble extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 40;
        this.speed = 12;
        this.shoot();
    }
    /**
     * applies gravity to the Bubble Object and sends it up and forward
     */
    shoot() {
        this.applyGravity();
        setInterval(() => {
            this.y -= 10;
            this.x += this.speed;
        }, 1000 / 25)
    }

    /**
     * chekcs is the bubble is colliding with the endboss or 
     * with a jellyfish
     * 
     * @param {object} obj Enemy object
     * @returns true if bubble is colling and false if not
     */
    isColliding(obj) {
        if (obj instanceof Endboss) {
            let isEndboss = this.isEndboss(obj);
            return isEndboss;
        } else {
            let isJellyfish = this.isJellyfish(obj);
            return isJellyfish;
        }
    }

    /**
     * checks the collisions of the bubble when the object is the endboss
     * 
     * @param {object} obj enemy object
     * @returns true if the bubble collides or false if not
     */
    isEndboss(obj) {
        return (
            this.x + this.width > obj.x &&
            this.y + this.height > obj.y + obj.height / 3 &&
            this.x < obj.x + obj.width &&
            this.y < obj.y + obj.height / 3 + obj.height / 2
        );
    }

    /**
     * hecks the collisions of the bubble when the object is the jellyfish
     * 
     * @param {object} obj enemy object
     * @returns true if the bubble collides or false if not
     */
    isJellyfish(obj) {
        return (
            this.x + this.width >= obj.x &&
            this.y + this.height > obj.y &&
            this.x < obj.x + obj.width &&
            this.y < obj.y + obj.height
        )
    }
}

