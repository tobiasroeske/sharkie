class MovableObject {
    x = 80;
    y = 250;
    img;
    height = 150;
    width = 100;
    speed = 0.8;
    imageCache = {};
    currentImage = 0;
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

    moveDown() {
        let myInterval = setInterval(() => {
            this.intervalIDs.push(myInterval);
            this.y += this.speed;
            if (this.y >= 410) {
                clearInterval(myInterval);
                this.moveUp();
            }
        }, 1000 / 60);
    }

    moveUp() {
        let myInterval = setInterval(() => {
            this.intervalIDs.push(myInterval);
            this.y -= this.speed;
            if (this.y <= 0) {
                clearInterval(myInterval);
                this.moveDown();
            }
        }, 1000 / 60)
    }

    move() {
        let randomNumber = Math.floor(Math.random() * 11);
        if (randomNumber >= 5) {
            this.moveDown();
        } else {
            this.moveUp();
        }
    }

    moveRight() {
        
    }

    moveLeft() {
    
    }

    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.intervalIDs.push(id);
    }

    stopAllIntervals() {
        this.intervalIDs.forEach(clearInterval);
    }
}