class Level {
    enemies;
    backgrounds;
    coins;
    poisons;
    level_end_x = 2220;
    level_end_y = 350;

    constructor(e, b, c, p) {
        this.enemies = e;
        this.backgrounds = b;
        this.coins = c;
        this.poisons = p;
    }
}