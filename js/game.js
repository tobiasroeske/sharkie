let canvas;
let world;
let keyboard = new Keyboard();
let background_sound = new Audio('audio/underwater_sound.mp3');
let txt = `Welcome to "Sharkie"!
    Join the brave shark Sharkie on his journey through the sea, where he battles against dangerous
    jellyfish, cunning pufferfish, and even a mighty Orca.
    Use the "Bubbleshot" to defeat jellyfish and the "Finslap" to take down pufferfish. Collect poison to
    obtain Bubbleshots, but use them wisely – as even the final boss can only be defeated with them!
    Are you ready to help Sharkie overcome all challenges? Then dive into the adventure now and experience
    "Sharkie" – the ultimate underwater Jump 'n' Run game!`;
let i = 0;
let speed = 40;
let watchedIntructions = false;
let fullscreen = false;
background_sound.loop = true;

function init() {
    checkScreenOrientation();
    load();
    canvas = document.getElementById('canvas');
    setTouchEvents();
}

function toggleFullscreen() {
    let canvasContainer = document.getElementById('canvasContainer');
    if (!fullscreen) {
        canvasContainer.requestFullscreen()
        fullscreen = true;
        document.getElementById('fullscreenIcon').classList.remove('d-none');
        document.getElementById('fullscreenBtn').classList.add('d-none');

    } else {
        document.exitFullscreen();
        fullscreen = false;
        document.getElementById('fullscreenIcon').classList.add('d-none');
        document.getElementById('fullscreenBtn').classList.remove('d-none');
    }
}

function checkScreenOrientation() {
    let inPortraitMode = window.matchMedia('(orientation: portrait)');
    inPortraitMode.addEventListener('change', (e) => {
        let portrait = e.matches;
        if (portrait) {
            document.getElementById('noLandscape').classList.remove('d-none');
            document.querySelector('main').classList.add('d-none');
            // document.getElementById('gameOver').classList.add('d-none');
            // document.getElementById('youWon').classList.add('d-none');
        } else {
            document.getElementById('noLandscape').classList.add('d-none');
            document.querySelector('main').classList.remove('d-none');
        }
    })

}

function showFullscreen() {
    document.getElementById('canvasContainer').requestFullscreen();
}

function saveToLocalStorage() {
    localStorage.setItem('firstTime', JSON.stringify(watchedIntructions));
}

function load() {
    let watchedIntroAsText = JSON.parse(localStorage.getItem('firstTime'));
    if (watchedIntroAsText) {
        watchedIntructions = watchedIntroAsText;
    }
}

function startGame() {
    if (!watchedIntructions) {
        document.getElementById('firstTime').classList.remove('d-none');
        document.getElementById('menu').classList.add('d-none');
        watchedIntructions = true;
        saveToLocalStorage();
    } else {
        document.getElementById('canvasContainer').classList.add('d-none');
        document.getElementById('firstTime').classList.add('d-none');
        document.querySelector('h1').classList.add('d-none');
        loadLevel();
        generateLoadingScreen();
        setTimeout(() => {
            world = new World(canvas, keyboard);
            document.getElementById('canvasContainer').classList.remove('d-none');
        }, 1500)
    }
}

function generateLoadingScreen() {
    document.querySelector('main').classList.remove('d-none');
    document.getElementById('gameOver').classList.add('d-none');
    document.getElementById('youWon').classList.add('d-none');
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('loadingScreen').classList.remove('d-none');
    let progressbar = document.getElementById('progressbar');
    let width = 0;
    let myInterval = setInterval(() => {
        width += 5;
        progressbar.style.width = `${width}%`;
        if (width > 100) {
            width = 100;
            document.getElementById('loadingScreen').classList.add('d-none');
            clearInterval(myInterval);
        }
    }, 75)
}

function displayIntroText() {
    let introTxt = document.getElementById('introText');
    if (i < txt.length) {
        introTxt.innerHTML += txt.charAt(i);
        i++;
        introTxt.scrollTop = introTxt.scrollHeight - introTxt.clientHeight;
        if (keyboard.SPACE) {
            speed = 10;
        }
        setTimeout(displayIntroText, speed);
    }
}

function closeInstructions() {
    document.getElementById('menu').classList.remove('d-none');
    document.getElementById('instructions').classList.add('d-none');
    document.querySelector('h1').classList.remove('d-none');
}

function openInstructions() {
    watchedIntructions = true;
    saveToLocalStorage();
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('firstTime').classList.add('d-none');
    document.getElementById('instructions').classList.remove('d-none');
    document.querySelector('h1').classList.add('d-none');
    displayIntroText();
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

function hideContextMenu() {
    document.getElementById('canvasContainer').addEventListener('contextmenu', (event) => {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
}

function noTouchDetected() {
    window.addEventListener('touchend', (event) => {
        keyboard.NO_KEY_PRESSED = true;
    })
    window.addEventListener('touchstart', (event) => {
        keyboard.NO_KEY_PRESSED = false;
    })
}

function setTouchEvents() {
    let touchBtns = ['up', 'down', 'left', 'right', 'space', 'f']
    hideContextMenu();
    noTouchDetected();
    touchBtns.forEach(btn => {
        document.getElementById(btn).addEventListener('touchstart', (event) => {
            keyboard[btn.toUpperCase()] = true;
        })
        document.getElementById(btn).addEventListener('touchend', (event) => {
            keyboard[btn.toUpperCase()] = false
        })
    });
}
