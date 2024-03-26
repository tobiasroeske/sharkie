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
    load();
    canvas = document.getElementById('canvas');
    setTouchEvents();
}

function checkScreenSize() {
    let inLandscapeMode = window.innerHeight < 480;
    fullscreen = false;
    if (inLandscapeMode) {
        toggleFullscreen();
        document.getElementById('fullscreenIcon').classList.add('d-none');
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
        document.getElementById('firstTime').classList.add('d-none');
        loadLevel();
        generateLoadingScreen();
        checkScreenSize();
        setTimeout(() => {
            world = new World(canvas, keyboard);
            document.getElementById('canvasContainer').classList.remove('d-none');

        }, 1000)
    }
}

function generateLoadingScreen() {
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('loadingScreen').classList.remove('d-none');
    let progressbar = document.getElementById('progressbar');
    let width = 0;
    setInterval(() => {
        width += 5;
        progressbar.style.width = `${width}%`;
        if (width > 100) {
            width = 100;
            document.getElementById('loadingScreen').classList.add('d-none');
        }
    }, 50)
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
}

function openInstructions() {
    watchedIntructions = true;
    saveToLocalStorage();
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('firstTime').classList.add('d-none');
    document.getElementById('instructions').classList.remove('d-none');
    displayIntroText();
}


// window.addEventListener('touchstart', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     return false;
// })

window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

// function stopOtherTouchEvents() {
//     let body = document.querySelector('body');
//     window.addEventListener('touchstart', (e) => {
//         e.preventDefault()
//         e.stopPropagation();
//         return false;
//     });
//     window.addEventListener('touchend', (e) => {
//         e.preventDefault()
//         e.stopPropagation();
//         return false;
//     });
//     window.addEventListener('touchmove', (e) => {
//         e.preventDefault()
//         e.stopPropagation();
//         return false;
//     });
//     window.addEventListener('touchcancel', (e) => {
//         e.preventDefault()
//         e.stopPropagation();
//         return false;
//     });
//     window.addEventListener('contextmenu', (e) => {
//         e.preventDefault()
//         e.stopPropagation();
//         return false;
//     });
// }

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

function setTouchEvents() {
    document.getElementById('up').addEventListener('touchstart', () => {
        keyboard.NO_KEY_PRESSED = true;
        keyboard.UP = true;
    });
    document.getElementById('up').addEventListener('touchend', () => {
        keyboard.NO_KEY_PRESSED = false;
        keyboard.UP = false;
    });
    document.getElementById('down').addEventListener('touchstart', () => {
        keyboard.NO_KEY_PRESSED = true;
        keyboard.DOWN = true;
    });
    document.getElementById('down').addEventListener('touchend', () => {
        keyboard.NO_KEY_PRESSED = false;
        keyboard.DOWN = false;
    });
    document.getElementById('left').addEventListener('touchstart', () => {
        keyboard.NO_KEY_PRESSED = true;
        keyboard.LEFT = true;
    });
    document.getElementById('left').addEventListener('touchend', () => {
        keyboard.NO_KEY_PRESSED = false;
        keyboard.LEFT = false;
    });
    document.getElementById('right').addEventListener('touchstart', () => {
        keyboard.NO_KEY_PRESSED = true;
        keyboard.RIGHT = true;
    });
    document.getElementById('right').addEventListener('touchend', () => {
        keyboard.NO_KEY_PRESSED = false;
        keyboard.RIGHT = false;
    });
    document.getElementById('bubbleAttack').addEventListener('touchstart', () => {
        keyboard.NO_KEY_PRESSED = true;
        keyboard.SPACE = true;
    });
    document.getElementById('bubbleAttack').addEventListener('touchend', () => {
        keyboard.NO_KEY_PRESSED = false;
        keyboard.SPACE = false;

    });
    document.getElementById('finslap').addEventListener('touchstart', () => {
        keyboard.NO_KEY_PRESSED = true;
        keyboard.F = true;
    });
    document.getElementById('finslap').addEventListener('touchend', () => {
        keyboard.NO_KEY_PRESSED = false;
        keyboard.F = false;
    });
}