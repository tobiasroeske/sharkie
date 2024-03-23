class Pufferfish extends Enemy {
    y = Math.random() * 400;
    height = 58;
    width = 75;
    speed = 0.8 + Math.random() * 0.25;
    isTransforming = false;
    closeToCharacter = false;
    lifepoints = 5;
    IMAGES_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
    ];

    TRANSFORM_IMAGES = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png'
    ]

    BUBBLESWIM_IMAGES = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png',
    ]

    DEAD_IMAGES = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png'
    ]

    constructor(x, y) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.TRANSFORM_IMAGES);
        this.loadImages(this.BUBBLESWIM_IMAGES);
        this.loadImages(this.DEAD_IMAGES);
        this.animate();
        this.x = x;
        this.y = y + Math.random() * 100;
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            if (this.isDead()) {
                this.animateImages(this.DEAD_IMAGES);
                this.applyGravity();
            } else {
                if (this.isTransforming) {
                    this.animateImages(this.TRANSFORM_IMAGES);
                } else if (this.closeToCharacter) {
                    this.animateImages(this.BUBBLESWIM_IMAGES);
                } else {
                    this.animateImages(this.IMAGES_SWIMMING);
                }
            }
        }, 220)
    }
}