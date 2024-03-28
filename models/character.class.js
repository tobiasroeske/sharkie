class Character extends MovableObject {
    y = 180;
    x_frame = this.x + 25;
    y_frame = this.y + this.height / 2 + 5;
    width_frame = this.width - 50;
    height_frame = this.height / 2 - 45;
    speed = 3;
    otherDirection = false;
    swimmingUp = false;
    swimmingDown = false;
    lifepoints = 60;
    coins = 0;
    poisons = 0;
    autoSwim = false;

    IDLE_IMAGES = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ]
    SWIMMING_IMAGES = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];

    DEAD_IMAGES = [
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00000.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00001.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00002.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00003.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00004.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00005.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00006.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00007.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00008.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00009.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00010.png',
    ]

    DEAD_SHOCKED_IMAGES = [
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
    ];

    HURT_POISONED_IMAGES = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png'
    ]

    HURT_SHOCKED_IMAGES = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
    ]

    ATTACK_BUBBLE_IMAGES = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
    ]

    ATTACK_FIN_SLAP_IMAGES = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png',
    ]
    world;

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IDLE_IMAGES);
        this.loadImages(this.SWIMMING_IMAGES);
        this.loadImages(this.DEAD_IMAGES);
        this.loadImages(this.DEAD_SHOCKED_IMAGES);
        this.loadImages(this.HURT_SHOCKED_IMAGES);
        this.loadImages(this.HURT_POISONED_IMAGES);
        this.loadImages(this.ATTACK_BUBBLE_IMAGES);
        this.loadImages(this.ATTACK_FIN_SLAP_IMAGES);
        this.animate();
        this.checkIfCloseToEnemy();
    }

    /**
     * checks for each enemy the distance of the enemy and the characters colliding frame
     * depending on the class and if the distance is closeer enouhg, it sets the objects isTransforming to true
     * once it passes a certain distance it the the closeToCharacter parameter to true or false
     */
    checkIfCloseToEnemy() {
        setInterval(() => {
            this.world.level.enemies.forEach(enemy => {
                let distance = enemy.x - this.x_frame;
                let isPufferfish = enemy instanceof Pufferfish;
                let pufferfishDistanceBigger = isPufferfish && distance < 225 && distance >= 200
                pufferfishDistanceBigger ? enemy.isTransforming = true : enemy.isTransforming = false;
                let distanceIsBigger = distance < 200 && distance >= 0;
                distanceIsBigger ? enemy.closeToCharacter = true : enemy.closeToCharacter = false;
            }, 200)
        })

    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x_frame, this.y_frame, this.width_frame, this.height_frame);
        ctx.stroke();
    }

    /**
     * adds one coin to the coins array
     */
    addCoin() {
        this.coins++;
    }
    /**
     * adds one poison to the poison array
     */
    addPoison() {
        this.poisons++;
    }

    /**
     * stopps the characters ongoing intervals and 
     * starts the death animation depending on the enemy type
     * 
     * @param {object} obj Enemy object
     */
    deathAnimation(obj) {
        this.stopAllIntervals()
        if (obj instanceof Jellyfish) {
            this.typeOfDeath(this.DEAD_SHOCKED_IMAGES, 3)
        } else {
            this.typeOfDeath(this.DEAD_IMAGES, -3);
        }
    }

    /**
     * starts the death animation and on each run it adds 1 to the dead counter
     * to stop the animation on the desired image it clears the interval once it 
     * reaches the last image in the array
     * 
     * @param {array} images 
     * @param {number} speed the speed in whicht the character moves out of the canvas
     */
    typeOfDeath(images, speed) {
        let deadInterval = setInterval(() => {
            this.animateImages(images);
            this.deadCounter++
            if (this.deadCounter == images.length - 1) {
                clearInterval(deadInterval);
                this.loadImage(images[images.length - 1]);
                setInterval(() => {
                    this.y += speed;
                }, 1000 / 60);
            }
        }, 250);
        this.intervalIDs.push(deadInterval);
    }

    /**
     * depending on the type of enemy it starts the hurt animation. To make sure the animation stops after 1 sekond it
     * sets a new timestamp and compares it with the time the character got hit. 
     * 
     * @param {object} obj enemy object
     */
    hurtAnimation(obj) {
        let hurtInterval = setInterval(() => {
            let timePassed = (new Date().getTime() - this.lastHit) / 1000;
            let isJellyfish = obj instanceof Jellyfish;
            timePassed < 1 ? this.world.keyboard.NO_KEY_PRESSED = false : this.world.keyboard.NO_KEY_PRESSED = true;
            this.animateImages(isJellyfish ? this.HURT_SHOCKED_IMAGES : this.HURT_POISONED_IMAGES);
            if (isJellyfish) {
                this.x -= 2;
                this.x_frame -= 2;
            }
            if (timePassed > 1) {
                clearInterval(hurtInterval);
                this.gotHit = false;
            }
        }, 200);
    }

    /**
     * checks if the character is colling with the endboss or any other object
     * 
     * @param {object} obj enemy object
     * @returns true if collides and false if not
     */
    // isColliding(obj) {
    //     if (obj instanceof Endboss) {
    //         let isEndboss = this.isEndboss(obj)
    //         return isEndboss;
    //     } else {
    //         let isOtherObject = this.isOtherObject(obj);
    //         return isOtherObject;
    //     }
    // }

    /**
     * checks the collisions of the character when the object is the endboss
     * 
     * @param {object} obj enemy object 
     * @returns true if the character collides and false if not
     */
    isEndboss(obj) {
        return (
            this.x_frame + this.width_frame > obj.x &&
            this.y_frame + this.height_frame > obj.y + obj.height / 3 &&
            this.x_frame < obj.x + obj.width &&
            this.y_frame < obj.y + obj.height / 3 + obj.height / 2
        );
    }

    /**
     * checks the collisions of the character when the object any other object
     * 
     * @param {object} obj enemy object 
     * @returns true if the character collides and false if not
     */
    isOtherObject(obj) {
        return (
            this.x_frame + this.width_frame >= obj.x &&
            this.y_frame + this.height_frame > obj.y &&
            this.x_frame < obj.x + obj.width &&
            this.y_frame < obj.y + obj.height
        )
    }

    /**
     * starts to animate all the different actions
     */
    animate() {
        this.move();
        this.idle();
        this.swim();
        this.bubbleAttack();
        this.finSlap();
    }

    /**
     * checks if the right key is pressed. To make sure the character can't be hurt once it attacks the 
     * isAttacking attribute is set to true and switched back to false after 1.5 seconds
     * to stop the attack animation after one full run it checks if the attackCounter is bigger than the arrays length
     */
    finSlap() {
        setInterval(() => {
            let isSlapping = this.world.keyboard.F && this.attackCounter < this.ATTACK_FIN_SLAP_IMAGES.length
            if (isSlapping) {
                this.isAttacking = true;
                setTimeout(() => {
                    this.isAttacking = false;
                }, 1500)
                this.attackAnimation(this.ATTACK_FIN_SLAP_IMAGES);
                this.x += 6;
                this.x_frame += 6;
            }
        }, 1000 / 60)
    }

    /**
     * checks of the right keys are pressed and if the character has enough poisons to attack. If so it starts the bubble attack
     * animation. Stops it the same way as the finslap
     */
    bubbleAttack() {
        setInterval(() => {
            let isAttacking = this.world.keyboard.SPACE && this.attackCounter < this.ATTACK_BUBBLE_IMAGES.length && this.otherDirection == false;
            if (isAttacking && this.poisons > 0) {
                this.attackAnimation(this.ATTACK_BUBBLE_IMAGES);
            }
            if (!this.world.keyboard.SPACE && !this.world.keyboard.F) {
                this.attackCounter = 0;
            }
        }, 1000 / 60);
    }

    /**
     * starts the idle Animation
     */
    idle() {
        let idleInterval = setInterval(() => {
            if (this.world.keyboard.NO_KEY_PRESSED) {
                this.animateImages(this.IDLE_IMAGES);
            }
        }, 220)
        this.intervalIDs.push(idleInterval);
    }

    /**
     * starts the swim animation if the right key is pressed but not if the character just got hit
     */
    swim() {
        let swimInterval = setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                if (!this.gotHit) {
                    this.animateImages(this.SWIMMING_IMAGES);
                }
            }
        }, 150)
        this.intervalIDs.push(swimInterval);
    }

    /**
     * checks all the possible movements of the character and moves the camera with the movements
     * once the character is in the end section it focuses the camera on one spot, so the character has to stay there
     */
    move() {
        let moveInterval = setInterval(() => {
            this.autoSwimRight();
            this.moveRight();
            this.moveLeft();
            this.moveUp();
            this.moveDown();
            this.world.camera_x = -this.x + 220;
            if (this.world.level.inEndSection) {
                this.world.camera_x = -2000;
                this.world.level.level_end_x_left = 2000
            }
        }, 1000 / 60);
        this.intervalIDs.push(moveInterval);
    }

    /**
     * once the charater gets close to the endsection it autoswimms to the point where the fight with the endboss starts
     */
    autoSwimRight() {
        this.checkPosition();
        let isAutoSwimming = this.autoSwim && !this.world.level.inEndSection && !this.world.keyboard.RIGHT;
        if (isAutoSwimming) {
            this.x += this.speed;
            this.x_frame += this.speed;
        }
    }

    /**
     * checks the position of the character and if it is close to the end section it sets autoswim to true
     * once it is in the endsection it stops the background musik and starts the musik for the bossfight and
     * updates the characters position
     */
    checkPosition() {
        if (this.x > 1830 && this.x < 2200) {
            this.autoSwim = true;
        }
        if (this.x >= 2220) {
            background_sound.pause();
            sounds[5].loop = true;
            sounds[5].play();
            this.updatePositionStatus();
        }
    }

    /**
     * updates all stats of the character to be prepared for the bossfight
     */
    updatePositionStatus() {
        this.autoSwim = false;
        this.world.level.inEndSection = true;
        this.world.level.enemies[this.world.level.enemies.length - 1].firstContact = true;
    }

    /**
     * moves the character to the right
     */
    moveRight() {
        let ableToMoveRight = this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
        if (ableToMoveRight) {
            this.otherDirection = false;
            this.x += this.speed;
            this.x_frame += this.speed
        }
    }

    /**
     * moves the character to the left
     */
    moveLeft() {
        let ableToMoveLeft = this.world.keyboard.LEFT && this.x > this.world.level.level_end_x_left;
        if (ableToMoveLeft) {
            this.otherDirection = true;
            this.x -= this.speed;
            this.x_frame -= this.speed;
        }
    }

    /**
     * moves the character up
     */
    moveUp() {
        let ableToMoveUp = this.world.keyboard.UP && this.y > -65;
        if (ableToMoveUp) {
            this.swimmingUp = true;
            this.y -= this.speed;
            this.y_frame -= this.speed;
        } else {
            this.swimmingUp = false;
        }
    }

    /**
     * moves the character down
     */
    moveDown() {
        let ableToMoveDown = this.world.keyboard.DOWN && this.y < this.world.level.level_end_y;
        if (ableToMoveDown) {
            this.swimmingDown = true;
            this.y += this.speed;
            this.y_frame += this.speed;
            //this.swimming_sound.play();
        } else {
            this.swimmingDown = false;
        }
    }
}