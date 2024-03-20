class Level {
    enemies;
    backgrounds;
    coins;
    poisons;
    level_end_x = 2600;
    level_end_x_left = -80
    level_end_y = 350;
    inEndSection = false;

    constructor(e, b, c, p) {
        this.enemies = e;
        this.backgrounds = b;
        this.coins = c;
        this.poisons = p;
    }
}