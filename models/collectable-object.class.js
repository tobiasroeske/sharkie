class CollectableObject extends DrawableObject {
    y = 20 + Math.random() * 400;
    width = 40;
    height = 40;
    
    /**
     * to animate the collectables
     */
    animate() {
        setInterval(() => {
            this.animateImages(this.IMAGES);
        }, 220);
    }
}