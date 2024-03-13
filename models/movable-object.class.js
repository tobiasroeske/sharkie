class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight(event) {
        if (event.key === 'd') {
            event.preventDefault();
            this.x += 10;
        }
        if (event.key === 'a') {
            event.preventDefault();
            this.x -= 10;
        }
        
        if (event.key === 'w') {
            event.preventDefault();
            this.y -= 10
        }
        if (event.key === 's') {
            event.preventDefault();
            this.y += 10
        }
    }

    moveLeft() {

    }
}