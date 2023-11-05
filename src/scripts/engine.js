state = {
    views: {
        timeLeft: document.getElementById('header-time-value'),
        score: document.getElementById('header-score-value'),
        lives: document.getElementById('header-life-value'),
        squares: document.querySelectorAll(".square")
    },
    values: {
        timeLeft: 60,
        score: 0,
        respawnRate: 2000,
        lives: 3,
        isBackgroundMusicPlaying: false
    },
    startValues: {
        timeLeft: 60,
        score: 0,
        lives: 3
    },
    timers: {
        respawn: null,
        timeLeft: null
    },
    audios: {
        background: new Audio('./src/audios/background.wav'),
        gameover: new Audio('./src/audios/gameover.wav'),
        hit: new Audio('./src/audios/hit.wav'),
        miss: new Audio('./src/audios/miss.wav')
    }
}

function spawFoeAt(spawnPosition) {
    const div = document.createElement('div');
    div.className = 'foe';
    document.getElementById(spawnPosition).appendChild(div);
}

function removeFoe() {
    document.getElementsByClassName('foe')[0].remove();
}

function spawn() {
    const spawnPosition = Math.floor(Math.random() * 9);
    removeFoe();
    spawFoeAt(spawnPosition);
}

function respawn() {
    resetSpawnTimer();
    spawn();
}

function containsFoe(square) {
    return (square.matches('.foe')) ||
        (square.firstElementChild && square.firstElementChild.matches('.foe'));
}

function showRetryButton() {
    document.getElementById('retry-button').style.display = 'block';
}

function hideRetryButton() {
    document.getElementById('retry-button').style.display = 'none';
}

function checkGameOver() {
    if (state.values.timeLeft <= 0 || state.values.lives <= 0){
        clearInterval(state.timers.respawn);
        clearInterval(state.timers.timeLeft);
        removeClickEventFromAllSquares();
        showRetryButton();
        playGameOverSound();
    }
}

function updateScore(newScore) {
    state.values.score = newScore;
    state.views.score.innerHTML = newScore;
}

function updateLives(newLives) {
    state.values.lives = newLives;
    state.views.lives.innerHTML = 'x' + newLives;
    checkGameOver();
}

function updateTimeLeft(newTimeLeft) {
    state.values.timeLeft = newTimeLeft;
    state.views.timeLeft.innerHTML = newTimeLeft;
}

function decreaseTimeLeft() {
    state.values.timeLeft--;
    state.views.timeLeft.innerHTML = state.values.timeLeft;
    checkGameOver();
}

function onClickSquare(htmlElement) {
    let square = htmlElement.target;
    if (containsFoe(square)) {
        updateScore(state.values.score + 1);
        playHitSound();
        respawn();
    } else {
        playMissSound();
        updateLives(state.values.lives - 1);
    }
}

function removeClickEventFromAllSquares() {
    state.views.squares.forEach(htmlElement => htmlElement.removeEventListener('click', onClickSquare, htmlElement));
}

function addClickEventToAllSquares() {
    state.views.squares.forEach(htmlElement => htmlElement.addEventListener('click', onClickSquare, htmlElement));
}

function initSpawnTimer() {
    state.timers.respawn = setInterval(spawn, state.values.respawnRate);
}

function initLeftTimer() {
    state.timers.timeLeft = setInterval(decreaseTimeLeft, 1000);
}

function resetSpawnTimer() {
    clearInterval(state.timers.respawn);
    initSpawnTimer()
}

function restoreGameValues() {
    updateTimeLeft(state.startValues.timeLeft);
    updateScore(state.startValues.score);
    updateLives(state.startValues.lives);
    state.values.isBackgroundMusicPlaying = false;
}

function stopBackgroundMusic() {
    state.audios.background.pause();
}

function playHitSound() {
    state.audios.hit.currentTime = 0;
    state.audios.hit.play();
}

function playMissSound() {
    state.audios.miss.currentTime = 0;
    state.audios.miss.play();
}

function playGameOverSound() {
    stopBackgroundMusic();
    state.audios.gameover.play();
}

function playBackgroundMusic() {
    if (!state.values.isBackgroundMusicPlaying) {
        state.audios.background.loop = true;
        state.audios.background.volume = 0.5;
        state.audios.background.currentTime = 0;
        state.audios.background.play();
        if (!state.audios.background.paused) {
            state.values.isBackgroundMusicPlaying = true;
        }
    }
}

function playBackgroundMusicWhenHoverBodyElement() {
    document.getElementsByTagName('main')[0].addEventListener('mouseover', playBackgroundMusic);
}

function startGame() {
    restoreGameValues();
    addClickEventToAllSquares();
    initSpawnTimer();
    initLeftTimer();
    hideRetryButton();
    spawn();
    playBackgroundMusicWhenHoverBodyElement();
}

startGame();