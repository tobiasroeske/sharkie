class Level {
    enemies;
    backgrounds;
    level_end_x = 2220;
    level_end_y = 350;

    constructor(e, b) {
        this.enemies = e;
        this.backgrounds = b;
    }
}