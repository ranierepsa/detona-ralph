state = {
    views: {
        timeLeft: document.getElementById('header-time-value'),
        score: document.getElementById('header-score-value'),
        squares: document.querySelectorAll(".square")
    },
    values: {
        timeLeft: 60,
        score: 0,
        respawnRate: 3000
    },
    timers: {
        respawn: null
    }
}

function spawn() {
    // clear animals
    // randomize another position for foe and friend
    // spawn foe and friend in new position
}

function onclick() {
    // if click empty spot or snake, remove a life
    // if click a friendly animal, add a point to score
    // if click any animal (friendly or foe), 
        // clearAnimals()
        // resetRespawnTimers()
}

function addClickEventToSquares() {
    state.views.squares.forEach(elem => elem.addEventListener());
    document.querySelectorAll()

}

function initSpawnTimer() {
    state.timers.respawn = setInterval(spawn, state.values.respawnRate);
}

function restartTimers() {
    clearInterval(state.timers.respawn);
    initSpawnTimer()
}

function startGame() {
    addClickEventToSquares();
    initSpawnTimer();
    spawn();
}

startGame();