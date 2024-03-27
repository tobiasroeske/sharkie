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
    amountCoins = this.level.coins.length;
    amountPoisons = this.level.poisons.length;
    bubbles = [new Bubble()];
    lastShot = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        this.lastShot = new Date().getTime();
        let collisionInterval = setInterval(() => {
            this.getCollisionsWithEnemy(collisionInterval);
            this.getCollisionsWithCollectables(this.level.coins, this.amountCoins, this.coinbar);
            this.getCollisionsWithCollectables(this.level.poisons, this.amountPoisons, this.poisonbar);
            this.checkShootBubble();
            this.getCollisionWithBubble();
            this.checkIfGameIsOver();
        }, 200);
    }

    getCollisionWithBubble() {
        this.level.enemies.forEach(enemy => {
            let isPufferfish = enemy instanceof Pufferfish;
            this.bubbles.forEach(bubble => {
                if (bubble.isColliding(enemy) && !isPufferfish) {
                    enemy.hit();
                    let i = this.bubbles.indexOf(bubble);
                    this.bubbles.splice(i, 1);
                }
            })
        })
    }

    checkShootBubble() {
        let currentTime = Date.now();
        if (currentTime - this.lastShootTime < 1000) {
            return;
        }
        if (this.keyboard.SPACE && !this.character.otherDirection && this.character.poisons > 0) {
            let bubble = new Bubble(this.character.x_frame + 60, this.character.y_frame);
            this.updateStatusBar(this.poisonbar);
            this.bubbles.push(bubble);
            this.lastShootTime = currentTime;
        }
    }

    updateStatusBar(bar) {
        if (this.keyboard.SPACE) {
            this.character.poisons--;
            let percentage = 100 / this.amountPoisons * this.character.poisons;
            bar.getPercentage(percentage);
        }
    }

    getCollisionsWithEnemy(interval) {
        this.level.enemies.forEach(enemy => {
            let isJellyfish = enemy instanceof Jellyfish;
            if (this.character.isColliding(enemy)) {
                if (this.character.isAttacking && !isJellyfish) {
                    this.character.attack(enemy)
                } else {
                    this.character.isHurt(enemy);
                    this.energybar.getPercentage(this.character.lifepoints);
                    if (this.character.isDead()) {
                        clearInterval(interval);
                        this.character.lifepoints = 0;
                        this.character.deathAnimation(enemy);
                    }
                }
            }
        })
    }

    checkIfGameIsOver() {
        if (this.character.isDead()) {
            setTimeout(() => {
                document.getElementById('gameOver').classList.remove('d-none');
                document.querySelector('main').classList.add('d-none');
            }, 5000);
        } else if (this.level.enemies[this.level.enemies.length - 1].isDead()) {
            setTimeout(() => {
                console.log('Im dead!')
                document.getElementById('youWon').classList.remove('d-none');
                document.querySelector('main').classList.add('d-none');
            }, 5000);
        }
    }

    getCollisionsWithCollectables(arr, amount, bar) {
        arr.forEach(item => {
            if (this.character.isColliding(item)) {
                let i = arr.indexOf(item);
                arr.splice(i, 1)
                if (item instanceof Coin) {
                    this.character.addCoin();
                    let percentage = 100 / amount * this.character.coins
                    bar.getPercentage(percentage);
                } else {
                    this.character.addPoison();
                    let percentage = 100 / amount * this.character.poisons
                    bar.getPercentage(percentage);
                }
            }
        })
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgrounds);
        // Objects which are static and don't move with camera
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.energybar);
        this.addToMap(this.coinbar);
        this.addToMap(this.poisonbar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.bubbles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisons);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);

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