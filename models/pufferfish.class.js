class Pufferfish extends Enemy {
    
    y = Math.random() * 400;
    height = 58;
    width = 75;
    speed = 0.8 + Math.random() * 0.35;
    isTransforming = false;
    closeToCharacter = false;
    lifepoints = 5;
    
    /**
     * Moving the pufferfish to the left
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }

    /**
     * starts the animation of all the movements
     */
    animate() {
        this.moveLeft();
        setInterval(() => {
            if (this.isDead()) {
                this.animateImages(this.DEAD_IMAGES);
                this.applyGravity();
            } else {
                if (this.isTransforming) {
                    this.animateImages(this.TRANSFORM_IMAGES);
                } else if (this.closeToCharacter) {
                    this.animateImages(this.BUBBLESWIM_IMAGES);
                } else {
                    this.animateImages(this.IMAGES_SWIMMING);
                }
            }
        }, 220)
    }
}