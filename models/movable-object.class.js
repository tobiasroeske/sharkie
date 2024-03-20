class MovableObject extends DrawableObject {
    speed = 0.8;
    deadCounter = 0;
    lastHit = 0;

    isDead() {
        return this.lifepoints == 0;
    }

    hit() {
        this.lifepoints -= 5;
        if (this.lifepoints < 0) {
            this.lifepoints = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(obj) {
        this.hit();
        this.hurtAnimation(obj);
    }

    isColliding(obj) {
        return this.x + this.width >= obj.x &&
            this.y + this.height > obj.y &&
            this.x < obj.x + obj.width &&
            this.y < obj.y + obj.height
    }


    //Junus Version
    // isColliding(obj) {
    //     return (this.x + this.width) >= obj.x &&
    //         this.x <= (obj.x + obj.width) &&
    //         (this.y + this.offsetY + this.height) >= obj.y &&
    //         (this.y + this.offsetY) <= (obj.y + obj.height)
    // }
}