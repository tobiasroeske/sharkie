class Background extends MovableObject{
    x = 0;
    y = 0;
    width = 1440;
    height = 480;
    constructor(src, x) {
        super().loadImage(src);
        this.x = x;
    }
}