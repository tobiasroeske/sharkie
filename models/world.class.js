class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    energybar = new Energybar();
    coinbar = new Coinbar();
    poisonbar = new Poisonbar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        let collisionInterval = setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy)) {
                    this.character.isHurt(enemy);
                    this.energybar.getPercentage(this.character.lifepoints);
                    if (this.character.isDead()) {
                        clearInterval(collisionInterval);
                        this.character.lifepoints = 0;
                        this.character.deathAnimation(enemy);
                    }
                }
            })
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.addToMap(this.character);
        
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);

        // Objects which are static and don't move with camera
        this.addToMap(this.energybar);
        this.addToMap(this.coinbar);
        this.addToMap(this.poisonbar);
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
            obj.draw(this.ctx);
            obj.drawFrame(this.ctx);
        }
    }

    flipCharacter(obj) {
        this.ctx.save();
        obj.drawFrame(this.ctx);
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(obj.img, obj.x * -1, obj.y, obj.width, obj.height);
        this.ctx.restore();
    }

    rotateCharacter(obj, degrees) {
        this.ctx.save();
        obj.drawFrame(this.ctx);
        this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
        this.ctx.rotate(degrees * Math.PI / 180);
        this.ctx.drawImage(obj.img, -obj.width / 2, -obj.height / 2, obj.width, obj.height);
        this.ctx.restore();
    }

    rotateFlippedCharacter(obj, degrees) {
        this.ctx.save();
        obj.drawFrame(this.ctx);
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