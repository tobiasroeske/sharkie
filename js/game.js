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
let speed = 25;
let watchedInstructions = false;
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

/**
 * called onload, checks the orientation of the device, loads if the game has alredy been played
 * sets the touch events for the mobile buttons
 */
function init() {
    checkScreenOrientation();
    load();
    canvas = document.getElementById('canvas');
    setTouchEvents();
}

/**
 * switches the sound on or off
 */
function toggleSound() {
    if (!mute) {
        updateSound(true);
    } else {
        updateSound(false)
    }
}

/**
 * depending of the boolean it switches the sound either on or off
 * and displays the appropriate icon 
 * 
 * @param {boolean} boolean 
 */
function updateSound(boolean) {
    let muteButton = document.getElementById('mute');
    let volumeButton = document.getElementById('volume');
    background_sound.muted = boolean;
    sounds.forEach(sound => sound.muted = boolean);
    mute = boolean;
    muteButton.classList.toggle('d-none');
    volumeButton.classList.toggle('d-none');
}

/**
 * switches the fullscreen mode on or off and updates the fullscreen button/icon
 */
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

/**
 * checks if the device is in portrait mode. If so, it desplays the "Please turn device" message
 * if not it displays the screen
 */
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

/**
 * saves the information to the local storage if the introduction already has been shown
 */
function saveToLocalStorage() {
    localStorage.setItem('firstTime', JSON.stringify(watchedInstructions));
}

/**
 * loads the information, if the introduction already has been shown from the local storage
 */
function load() {
    let watchedIntroAsText = JSON.parse(localStorage.getItem('firstTime'));
    if (watchedIntroAsText) {
        watchedInstructions = watchedIntroAsText;
    }
}

/**
 * checks is the instructions already have been displayed and displays a screen to choose
 * to the user. Then it starts the preparation to start the game and sets the world after a 
 * short delay. The delay is for the time the game needs to be loaded
 */
function startGame() {
    if (!watchedInstructions) {
        chooseToWatchInstructions();
    } else {
        prepareGame();
        setTimeout(() => {
            world = new World(canvas, keyboard);
            document.getElementById('canvasContainer').classList.remove('d-none');
            background_sound.play();
        }, 1500)
    }
}

/**
 * loads the level and generates the loading screen
 */
function prepareGame() {
    document.getElementById('canvasContainer').classList.add('d-none');
    document.getElementById('firstTime').classList.add('d-none');
    document.querySelector('h1').classList.add('d-none');
    loadLevel();
    generateLoadingScreen();
}

/**
 * shows the user a screen where the user can choose to start the game or 
 * watch the instructions. Later it saves the decision to the local storage
 */
function chooseToWatchInstructions() {
    document.getElementById('firstTime').classList.remove('d-none');
    document.getElementById('menu').classList.add('d-none');
    watchedInstructions = true;
    saveToLocalStorage();
}

/**
 * prepares the content for the loading screen and sets an interval to fill up the progressbar
 * once it reaches 100% it stops and clears the interval
 */
function generateLoadingScreen() {
    prepareLoadingScreen();
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
/**
 * sets everything up for the loading screen
 */
function prepareLoadingScreen() {
    document.querySelector('main').classList.remove('d-none');
    document.getElementById('gameOver').classList.add('d-none');
    document.getElementById('youWon').classList.add('d-none');
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('loadingScreen').classList.remove('d-none');
}

/**
 * takes the intro text and displays a new letter every 10 milliseconds. When the container is full
 * it scrolls down to the bottom to always show the last word. By pressing SPACE it doubles the speed
 */
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

/**
 * closes the instructions
 */
function closeInstructions() {
    document.getElementById('menu').classList.remove('d-none');
    document.getElementById('instructions').classList.add('d-none');
    document.querySelector('h1').classList.remove('d-none');
}

/**
 * saves the info to the local storage that the instructions has been wachted and displays the intro
 * text
 */
function openInstructions() {
    watchedInstructions = true;
    saveToLocalStorage();
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('firstTime').classList.add('d-none');
    document.getElementById('instructions').classList.remove('d-none');
    document.querySelector('h1').classList.add('d-none');
    displayIntroText();
}

/**
 * sets the eventlisteners for the keyboard events
 */
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

/**
 * sets the eventlisteners for the keyboard events
 */
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

/**
 * hides the context menu on a long touch event or on a long click event
 */
function hideContextMenu() {
    document.getElementById('canvasContainer').addEventListener('contextmenu', (event) => {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
}

/**
 * checks if there is a touch event
 */
function noTouchDetected() {
    window.addEventListener('touchend', (event) => {
        keyboard.NO_KEY_PRESSED = true;
    })
    window.addEventListener('touchstart', (event) => {
        keyboard.NO_KEY_PRESSED = false;
    })
}

/**
 * sets the touch events for the mobile buttons
 * hides the context menu
 */
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
