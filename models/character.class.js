class Character extends MovableObject {
    y = 180;
    speed = 3;
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
    world;


    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IDLE_IMAGES);
        this.loadImages(this.SWIMMING_IMAGES);
        this.animate();
    }

    jump() {

    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
            }
        },1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
            }
        },1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.UP) {
                this.y -= this.speed;
            }
        },1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.DOWN) {
                this.y += this.speed;
            }
        },1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.NO_KEY_PRESSED) {
                let i = this.currentImage % this.IDLE_IMAGES.length;
                let path = this.IDLE_IMAGES[i];
                this.img = this.imageCache[path];
                
                this.currentImage++;
            }
        }, 220)
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.SWIMMING_IMAGES.length;
                let path = this.SWIMMING_IMAGES[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 150) // Problem, wenn Interval nicht gleich

    }

}