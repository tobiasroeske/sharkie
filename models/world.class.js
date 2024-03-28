class World {

    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;

    camera_x = 0;
    energybar = new Energybar(20);
    coinbar = new Coinbar();
    poisonbar = new Poisonbar();
    amountCoins = this.level.coins.length;
    amountPoisons = this.level.poisons.length;
    bubbles = [new Bubble()];
    lastShot = 0;
    soundPlayed = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.soundPlayed = false;
    }

    /**
     * gives the character an instance of the world class
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * checks all the different collisions, checks if a new bubble got created and checks if the game is over
     */
    run() {
        this.lastShot = new Date().getTime();
        let runInterval = setInterval(() => {
            this.getCollisionsWithEnemy(runInterval);
            this.getCollisionsWithCollectables(this.level.coins, this.amountCoins, this.coinbar);
            this.getCollisionsWithCollectables(this.level.poisons, this.amountPoisons, this.poisonbar);
            this.shootBubble();
            this.getCollisionWithBubble();
            this.checkIfGameIsOver();
        }, 200);
    }

    /**
     * checks if any of the enemy obejects colides with the bubble and if it os not an instance of Jellyfish
     * the enemy gets hit and the bubble gets deleted out of the bubbles array
     */
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

    /**
     * checks if in the last second a bubble has been created. If so it returns out of the function. If not it checks
     * if the character is able to shoot and if so it creats a new bubble object and updates the statusbars
     * also plays the shoot sound
     * 
     * @returns 
     */
    shootBubble() {
        let currentTime = Date.now();
        if (currentTime - this.lastShootTime < 1000) {
            return;
        }
        let ableToShoot = this.keyboard.SPACE && !this.character.otherDirection && this.character.poisons > 0;
        if (ableToShoot) {
            let bubble = new Bubble(this.character.x_frame + 60, this.character.y_frame);
            sounds[2].play();
            this.updateStatusBar(this.poisonbar);
            this.bubbles.push(bubble);
            this.lastShootTime = currentTime;
        }
    }

    /**
     * decreases the amount of poisons by 1 and updates the poison statusbar
     * 
     * @param {object} bar object of statusbar
     */
    updateStatusBar(bar) {
        if (this.keyboard.SPACE) {
            this.character.poisons--;
            let percentage = 100 / this.amountPoisons * this.character.poisons;
            bar.getPercentage(percentage);
        }
    }

    /**
     * checks for every enemy if it is colliding with the character. If it is colliding and the character is attacking
     * it calls the attach method. If not it updates the characters stats
     */
    getCollisionsWithEnemy(interval) {
        this.level.enemies.forEach(enemy => {
            let isJellyfish = enemy instanceof Jellyfish;
            if (this.character.isColliding(enemy)) {
                if (this.character.isAttacking && !isJellyfish) {
                    this.character.attack(enemy)
                } else {
                    this.updateCharacter(enemy, interval)
                }
            }
        })
    }

    /**
     * hurts the character and once its lifepoints are 0 is starts the death animation
     * 
     * @param {object} obj enemy object
     */
    updateCharacter(obj, interval) {
        this.character.isHurt(obj);
        this.energybar.getPercentage(this.character.lifepoints);
        if (this.character.isDead()) {
            clearInterval(interval);
            this.character.lifepoints = 0;
            this.character.deathAnimation(obj);
        }
    }

    /**
     * checks if the game is over depending on either the character has died or the endboss has been defeated
     */
    checkIfGameIsOver() {
        if (this.character.isDead()) {
            this.displayGameOverScreen();
        } else if (this.level.enemies[this.level.enemies.length - 1].isDead()) {
            this.displayYouWonScreen();
        }
    }

    /**
     * once the death animation is done it displayes the game over endscreen and plays the gameover sound
     */
    displayGameOverScreen() {
        setTimeout(() => {
            if (!this.soundPlayed) {
                background_sound.pause()
                sounds[5].pause();
                sounds[8].play();
                this.soundPlayed = true;
            }
            document.getElementById('gameOver').classList.remove('d-none');
            document.querySelector('main').classList.add('d-none');
        }, 5000);
    }

    /**
     * once the death animation is done it displayes the you won endscreen and plays the you won sound
     */
    displayYouWonScreen() {
        setTimeout(() => {
            if (!this.soundPlayed) {
                sounds[5].pause();
                sounds[7].play();
                this.soundPlayed = true;
            }
            document.getElementById('youWon').classList.remove('d-none');
            document.querySelector('main').classList.add('d-none');
        }, 5000);
    }

    /**
     * when the character collides with a collectable it deltes the collectable from the array and updates either the 
     * coins or the poisons as well as its statusbars
     * 
     * 
     * @param {array} arr either the levels coins or the levels poisons
     * @param {number} amount total amount of coins or poisons
     * @param {object} bar the statusbar which is updated
     */
    getCollisionsWithCollectables(arr, amount, bar) {
        arr.forEach(item => {
            if (this.character.isColliding(item)) {
                let i = arr.indexOf(item);
                arr.splice(i, 1)
                if (item instanceof Coin) {
                    this.updateCoins(amount, bar);
                } else {
                    this.updatePoisons(amount, bar);
                }
            }
        })
    }

    /**
     * plays the collection sound
     * adds the poison to the characters poisons and updates the statusbar
     * 
     * @param {number} amount total amount of poisons
     * @param {object} bar 
     */
    updatePoisons(amount, bar) {
        sounds[1].play();
        this.character.addPoison();
        let percentage = 100 / amount * this.character.poisons
        bar.getPercentage(percentage);
    }

    /**
     * plays the collection sound
     * adds the coin to the characters coins and updates the statusbar
     * 
     * @param {number} amount total amount of coins
     * @param {object} bar 
     */
    updateCoins(amount, bar) {
        sounds[0].play();
        this.character.addCoin();
        let percentage = 100 / amount * this.character.coins
        bar.getPercentage(percentage);
    }

    /**
     * draw all the objects in the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.drawStaticObjects();
        this.drawMovableObjects();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * draw all moveable objects
     */
    drawMovableObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.bubbles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisons);
        this.addObjectsToMap(this.level.enemies);
    }

    /**
     * draw all static objects
     */
    drawStaticObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.energybar);
        this.addToMap(this.coinbar);
        this.addToMap(this.poisonbar);
        this.addToMap(this.level.enemies[this.level.enemies.length - 1].energybar);
        this.ctx.translate(this.camera_x, 0);
    }

    /** checks the direction inwhich the object (charachter) is moving
     * and depending on that flip or rotate it. If it is not the character, it just draws it
     * 
     * @param {object} obj object any object
     */
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
        }
    }

    /**
     * it saves the current context, sets new x and y coordinates to mirror the character. Then switches the
     * coordinates so the character is looking to the other side. 
     * Later it sets the context back to its previous state
     * 
     * @param {object} obj character object
     */
    flipCharacter(obj) {
        this.ctx.save();
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(obj.img, obj.x * -1, obj.y, obj.width, obj.height);
        this.ctx.restore();
    }

    /**
     * rotates the character to the desired degrees
     * 
     * @param {object} obj chracter object
     * @param {number} degrees desired degrees
     */
    rotateCharacter(obj, degrees) {
        this.ctx.save();
        this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
        this.ctx.rotate(degrees * Math.PI / 180);
        this.ctx.drawImage(obj.img, -obj.width / 2, -obj.height / 2, obj.width, obj.height);
        this.ctx.restore();
    }

    /**
     * when the character is flipped it rotates is depending on the direction it is looking
     * 
     * @param {object} obj character object
     * @param {number} degrees 
     */
    rotateFlippedCharacter(obj, degrees) {
        this.ctx.save();
        this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
        this.ctx.rotate(degrees * Math.PI / 180);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(obj.img, -obj.width / 2, -obj.height / 2, obj.width, obj.height);
        this.ctx.restore();
    }

    /**
     * adds each object to the canvas
     * 
     * @param {array} objects array of objects
     */
    addObjectsToMap(objects) {
        objects.forEach(object => this.addToMap(object))
    }
}