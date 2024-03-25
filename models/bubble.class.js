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

    shoot() {
        this.applyGravity();
        setInterval(() => {
            this.y -= 10;
            this.x += this.speed;
        }, 1000 / 25)
    }

    isColliding(obj) {
        if (obj instanceof Endboss) {
            return (
                this.x + this.width > obj.x &&
                this.y + this.height > obj.y + obj.height / 3 &&
                this.x < obj.x + obj.width &&
                this.y < obj.y + obj.height / 3 + obj.height / 2
            );
        } else {
            return (
                this.x + this.width >= obj.x &&
                this.y + this.height > obj.y &&
                this.x < obj.x + obj.width &&
                this.y < obj.y + obj.height
            )
        }

    }
}