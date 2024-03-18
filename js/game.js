let canvas;
let world;
let keyboard = new Keyboard();
let background_sound = new Audio('audio/underwater_sound.mp3');
background_sound.loop = true;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
}

window.addEventListener('keydown', (e) => {
    background_sound.play()
    keyboard.NO_KEY_PRESSED = false;
    if (e.key == 'ArrowLeft' || e.key == 'a') {
        keyboard.LEFT = true;
    };
    if (e.key == 'ArrowRight' || e.key == 'd') {
        keyboard.RIGHT = true;
    };
    if (e.key == 'ArrowDown' || e.key == 's') {
        keyboard.DOWN = true;
    };
    if (e.key == 'ArrowUp' || e.key == 'w') {
        keyboard.UP = true;
    };
});

window.addEventListener('keyup', (e) => {
    keyboard.NO_KEY_PRESSED = true;
    if (e.key == 'ArrowLeft' || e.key == 'a') {
        keyboard.LEFT = false;
    };
    if (e.key == 'ArrowRight' | e.key == 'd') {
        keyboard.RIGHT = false;
    };
    if (e.key == 'ArrowDown' || e.key == 's') {
        keyboard.DOWN = false;
    };
    if (e.key == 'ArrowUp' || e.key == 'w') {
        keyboard.UP = false;
    };
});