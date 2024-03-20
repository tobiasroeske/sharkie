class CollectableObject extends DrawableObject {
    x = 300 + Math.random() * 2000;
    y = 20 + Math.random() * 400;
    width = 40;
    height = 40;

    animate() {
        setInterval(() => {
            this.animateImages(this.IMAGES);
        }, 220);
    }
}