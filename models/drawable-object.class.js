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

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.intervalIDs.push(id);
    }

    stopAllIntervals() {
        this.intervalIDs.forEach(clearInterval);
    }
}