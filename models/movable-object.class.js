class MovableObject extends DrawableObject{
    speed = 0.8;
    deadCounter = 0;

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Background == false) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    animateImages(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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