class World {
    character = new Character();
    enemies = [
        new Jellyfish(),
        new Jellyfish(),
        new Jellyfish(),
    ];
    backgrounds = [
        new Background('img/3. Background/Layers/5. Water/D1.png'),
        new Background('img/3. Background/Layers/3.Fondo 1/D1.png'),
        new Background('img/3. Background/Layers/2. Floor/D1.png'),
        new Background('img/3. Background/Layers/1. Light/1.png')
    ];
    ctx;
    canvas;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.addObjectsToMap(this.backgrounds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        // draw() wird immer wieder aufgrufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addToMap(obj) {
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    }

    addObjectsToMap(objects) {
        objects.forEach(object => this.addToMap(object))
    }
}