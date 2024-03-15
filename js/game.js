let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
    keyboard.NO_KEY_PRESSED = false;
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    };
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    };
    if (e.key == 'ArrowDown') {
        keyboard.DOWN = true;
    };
    if (e.key == 'ArrowUp') {
        keyboard.UP = true;
    };
});

window.addEventListener('keyup', (e) => {
    keyboard.NO_KEY_PRESSED = true;
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    };
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    };
    if (e.key == 'ArrowDown') {
        keyboard.DOWN = false;
    };
    if (e.key == 'ArrowUp') {
        keyboard.UP = false;
    };
});