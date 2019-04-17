let scores, roundScore, activePlayer, winningScore;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
winningScore = 20;

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';

let hideDice = () => {
    document.querySelector('.dice').style.display = 'none';
};

let clearCurrentScore = () => {
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
};

let switchPlayer = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    clearCurrentScore();

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
};

document.querySelector('.btn-roll').addEventListener('click', () => {
    // 1. Random number
    let dice = Math.floor(Math.random() * 6) + 1;
    
    // 2. Display the result
    let diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src = 'assets/dice-' + dice + '.png';
    
    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
        // Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // Next player
        switchPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
    // 1. Add current score to users global score
    scores[activePlayer] += roundScore;

    // 2. Update the User Interface
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    // 3. Check if player won the game
    if(scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        hideDice();
        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    } else {
        // Switch Player
        switchPlayer();
    }
});

hideDice();
clearCurrentScore();