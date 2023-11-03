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
        respawnRate: 3000,
        lives: 3
    },
    timers: {
        respawn: null,
        timeLeft: null
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

function checkGameOver() {
    if (state.values.timeLeft <= 0 || state.values.lives <= 0){
        //game over;
        //parar timers;
        // mostrar botao de retry;
    }
}

function increaseScore() {
    state.values.score++;
    state.views.score.innerHTML = state.values.score;
}

function decreaseLives() {
    state.values.lives--;
    state.views.lives.innerHTML = 'x' + state.values.lives;
    checkGameOver();
}

function decreaseTimeLeft() {
    state.values.timeLeft--;
    state.views.timeLeft.innerHTML = state.values.timeLeft;
    checkGameOver();
}

function onClickSquare(htmlElement) {
    let square = htmlElement.target;
    if (containsFoe(square)) {
        increaseScore();
        respawn();
    } else {
        decreaseLives();
    }
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

function startGame() {
    addClickEventToAllSquares();
    initSpawnTimer();
    initLeftTimer();
    spawn();
}

startGame();