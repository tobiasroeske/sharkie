class Statusbar extends DrawableObject {
    x = 20;
    y = 0;
    width = 200;
    height = 50;

    getPercentage(percentage) {
        let index = Math.round(percentage / 20);
        if (index >= 5) {
            index = 5;
        }
        let path = this.IMAGES[index];
        this.img = this.imageCache[path];
    }
}