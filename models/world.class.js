class World {
    character = new Character();
    enemies = [
        new Jellyfish(),
        new Jellyfish(),
        new Jellyfish(),
        new Pufferfish(),
        new Pufferfish()
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
        if (obj.otherDirection && obj.swimmingUp) {
            this.rotateFlippedCharacter(obj, 30);
        } else if (obj.otherDirection && obj.swimmingDown) {
            this.rotateFlippedCharacter(obj, -30);
        } else if (obj.otherDirection) {
            this.flipCharacter(obj)
        } else if (obj.swimmingUp) {
            this.rotateCharacter(obj, -30);
        } else if (obj.swimmingDown) {
            this.rotateCharacter(obj, 30);
        } else {
            this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        }
    }

    flipCharacter(obj) {
        this.ctx.save();
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(obj.img, obj.x * -1, obj.y, obj.width, obj.height);
        this.ctx.restore();
    }

    rotateCharacter(obj, degrees) {
        this.ctx.save();
        this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
        this.ctx.rotate(degrees * Math.PI / 180); 
        this.ctx.drawImage(obj.img, -obj.width / 2, -obj.height / 2, obj.width, obj.height);
        this.ctx.restore();
    }

    rotateFlippedCharacter(obj, degrees) {
        this.ctx.save();
        this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
        this.ctx.rotate(degrees * Math.PI / 180); 
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(obj.img, -obj.width / 2, -obj.height / 2, obj.width, obj.height);
        this.ctx.restore();
    }

    addObjectsToMap(objects) {
        objects.forEach(object => this.addToMap(object))
    }
}