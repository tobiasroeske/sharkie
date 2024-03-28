class Bubble extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 40;
        this.speed = 12;
        this.shoot();
        this.x_frame = this.x;
        this.y_frame = this.y;
        this.height_frame = this.height;
        this.width_frame = this.width;
    }
    /**
     * applies gravity to the Bubble Object and sends it up and forward
     */
    shoot() {
        this.applyGravity();
        setInterval(() => {
            this.y -= 10;
            this.y_frame -= 10;
            this.x += this.speed;
            this.x_frame += this.speed;
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
            this.x_frame + this.width_frame > obj.x_frame &&
            this.y_frame + this.height_frame > obj.y_frame &&
            this.x_frame < obj.x_frame + obj.width_frame &&
            this.y_frame < obj.y_frame + obj.height_frame
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
            this.x_frame + this.width_frame >= obj.x_frame &&
            this.y_frame + this.height > obj.y_frame &&
            this.x_frame < obj.x_frame + obj.width_frame &&
            this.y_frame < obj.y_frame + obj.height_frame
        )
    }
}

