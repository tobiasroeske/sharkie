let canvas;
let world;
let keyboard = new Keyboard();
let background_sound = new Audio('audio/underwater_sound.mp3');
background_sound.loop = true;

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
    loadLevel();
    generateLoadingScreen();
    setTimeout(() => {
        world = new World(canvas, keyboard);
        document.getElementById('canvas').classList.remove('d-none');
    }, 1000)
}

function generateLoadingScreen() {
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('loadingScreen').classList.remove('d-none');
    let progressbar = document.getElementById('progressbar');
    let width = 0;
    setInterval(() => {
        width += 5;
        progressbar.style.width = `${width}%`;
        if (width >= 100) {
            width = 100;
            document.getElementById('loadingScreen').classList.add('d-none');
        }
    }, 50)
}

window.addEventListener('keydown', (e) => {
    // background_sound.play()
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
    if (e.key == ' ') {
        keyboard.SPACE = true;
    };
    if (e.key == 'f') {
        keyboard.F = true;
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
    if (e.key == ' ') {
        keyboard.SPACE = false;
    };
    if (e.key == 'f') {
        keyboard.F = false;
    };
});