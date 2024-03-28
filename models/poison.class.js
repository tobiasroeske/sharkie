class Poison extends CollectableObject {
    IMAGES =  [
        'img/4. Marcadores/Posiขn/Animada/1.png',
        'img/4. Marcadores/Posiขn/Animada/2.png',
        'img/4. Marcadores/Posiขn/Animada/3.png',
        'img/4. Marcadores/Posiขn/Animada/4.png',
        'img/4. Marcadores/Posiขn/Animada/5.png',
        'img/4. Marcadores/Posiขn/Animada/6.png',
        'img/4. Marcadores/Posiขn/Animada/7.png',
        'img/4. Marcadores/Posiขn/Animada/8.png'
    ];

    constructor(x) {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.height = 50;
        this.x = x
        this.animate();
        this.x_frame = this.x + 5;
        this.y_frame = this.y + 5;
        this.width_frame = this.width - 10;
        this.height_frame = this.height - 10;
    }
}