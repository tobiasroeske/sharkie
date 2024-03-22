class MovableObject extends DrawableObject {
    speed = 0.8;
    deadCounter = 0;
    attackCounter = 0;
    lastHit = 0;
    gotHit = false;
    speedY = 0;
    acceleration = 1;

    isDead() {
        return this.lifepoints == 0;
    }

    applyGravity() {
        setInterval(() => {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25)
    }

    hit() {
        this.gotHit = true;
        this.lifepoints -= 5;
        if (this.lifepoints < 0) {
            this.lifepoints = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
 
    attackAnimation(images) {
        let path = images[this.attackCounter];
        this.img = this.imageCache[path];
        this.attackCounter++;
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
}