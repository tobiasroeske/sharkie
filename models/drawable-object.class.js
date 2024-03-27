class DrawableObject {
    x = 80;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    lifepoints = 100;
    intervalIDs = [];

    /**
     * creates a new Image obect and sets its path to the desired path
     * 
     * @param {string} path path of the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * draws the image on the context
     * 
     * @param {object} ctx the context of the canvas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * creates for every path in the array an image Object and saves it in the imageCache Object
     * 
     * @param {array} arr array of paths as strings 
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    /**
     * changes the img of the instance to the img with the matching path
     * after that increments i. Once it reaches the end of the arry it starts again
     * 
     * @param {array} images array of paths as strings 
     */
    animateImages(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * stops all saved intervals of the invervalIDs array
     */
    stopAllIntervals() {
        this.intervalIDs.forEach(clearInterval);
    }
}