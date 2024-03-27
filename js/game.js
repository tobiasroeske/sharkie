let canvas;
let world;
let keyboard = new Keyboard();
let background_sound = new Audio('audio/backgroundsound.mp3');
background_sound.loop = true;
background_sound.volume = 0.5;
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
let mute = false;
let sounds = [
    new Audio('audio/coin_collected.mp3'),
    new Audio('audio/poison.mp3'),
    new Audio('audio/bubble.mp3'),
    new Audio('audio/shock.mp3'),
    new Audio('audio/hit.mp3'),
    new Audio('audio/endbossound.mp3'),
    new Audio('audio/swimming.mp3'),
    new Audio('audio/success.mp3'),
    new Audio('audio/gameover.mp3')
]


function init() {
    checkScreenOrientation();
    load();
    canvas = document.getElementById('canvas');
    setTouchEvents();
}

function toggleSound() {
    let muteButton = document.getElementById('mute');
    let volumeButton = document.getElementById('volume');
    if (!mute) {
        background_sound.muted = true;
        sounds.forEach(sound => sound.muted = true);
        mute = true;
        muteButton.classList.toggle('d-none');
        volumeButton.classList.toggle('d-none');
    } else {
        background_sound.muted = false;
        sounds.forEach(sound => sound.muted = false);
        mute = false;
        muteButton.classList.toggle('d-none');
        volumeButton.classList.toggle('d-none');
    }
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
            background_sound.play();
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
    keyboard.NO_KEY_PRESSED = false;
    if (e.key == 'ArrowLeft' || e.key == 'a') {
        keyboard.LEFT = true;
        sounds[6].play();
    };
    if (e.key == 'ArrowRight' || e.key == 'd') {
        keyboard.RIGHT = true;
        sounds[6].play();
    };
    if (e.key == 'ArrowDown' || e.key == 's') {
        keyboard.DOWN = true;
        sounds[6].play();
    };
    if (e.key == 'ArrowUp' || e.key == 'w') {
        keyboard.UP = true;
        sounds[6].play();
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
        sounds[6].pause();
    };
    if (e.key == 'ArrowRight' | e.key == 'd') {
        keyboard.RIGHT = false;
        sounds[6].pause();
    };
    if (e.key == 'ArrowDown' || e.key == 's') {
        keyboard.DOWN = false;
        sounds[6].pause();
    };
    if (e.key == 'ArrowUp' || e.key == 'w') {
        keyboard.UP = false;
        sounds[6].pause();
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
