let scores, roundScore, activePlayer, gamePlaying, lastDice;

gamePlaying = true;

let resetGame = () => {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    hideDice();
    clearGlobalScore();
    clearCurrentScore();
    resetPlayerNames();
    removeWinnerClass();
    resetActivePlayer();
};

let hideDice = () => {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
};

let clearGlobalScore = () => {
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
};

let resetPlayerNames = () => {
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
};

let clearCurrentScore = () => {
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
};

let removeWinnerClass = () => {
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
};

let resetActivePlayer = () => {
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

let switchPlayer = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    clearCurrentScore();

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDice();
};

document.querySelector('.btn-roll').addEventListener('click', () => {
    if (gamePlaying) {
        // 1. Random number
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        
        // 2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'assets/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'assets/dice-' + dice2 + '.png';
        
        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next Player
            switchPlayer();
        }
        /*if (dice === 6 && lastDice === 6) {
            // Player loses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            switchPlayer();
        } else if (dice !== 1) {
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            switchPlayer();
        }
        lastDice = dice;
        */
    }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
    if (gamePlaying) {
        // 1. Add current score to users global score
        scores[activePlayer] += roundScore;

        // 2. Update the User Interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        let input = document.querySelector('.final-score').value;
        let winningScore;

        // Undefined, 0, null or "" are COERCED to false
        // anything else is COERCED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        // 3. Check if player won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            gamePlaying = false;
        } else {
            // Switch Player
            switchPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', resetGame);

resetGame();
hideDice();
clearCurrentScore();