const cell = document.querySelectorAll('.cell');
const title = document.querySelector('#title');
const xPlayer = document.querySelector('#xPlayer');
const oPlayer = document.querySelector('#oPlayer');
const restart = document.querySelector('.restartBtn');
const clickSound = document.querySelector('#clickSound');
const clickSoundBot = document.querySelector('#clickSoundBot');
const winSound = document.querySelector('#WinSound');
const drawSound = document.querySelector('#DrawSound');
const selection = document.querySelector('#selection');
const backgroundMusic = document.querySelector('#backgroundMusic');
//variables for the game
let currentPlayer = 'X';
let pauseGame = false;
let startGame = false;

//array of win conditions
const inputCells = ['', '', '',
                    '', '', '',
                    '', '', '']

//array for winning conditions
const  winConditions = [
    [0,1,2], [3,4,5], [6,7,8], //rows
    [0,3,6], [1,4,7], [2,5,8], //columns
    [0,4,8], [2,4,6] //diagonal
];

//click events on cell
cell.forEach((singleCell, index) => {
    singleCell.addEventListener('click', () => tapCell(singleCell, index));
});

function tapCell(cell, index) {
    //checking for the game if the cell is null and game is not paused
    if(cell.textContent == '' &&
        !pauseGame
    )  {
        startGame = true;
        clickSound.play(); 
        updateCell(cell, index);
        if (!checkWin()){
            changePlayer();
            randomPicker();
        }
    }
}

function updateCell(cell, index) {
    cell.textContent = currentPlayer;
    inputCells[index] = currentPlayer;
    cell.style.color = (currentPlayer == "X") ? 'darkcyan' : 'darkred'
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
}

function randomPicker(){
    pauseGame = true

    setTimeout(() => {
        let randomIndex
        do {// randomly pick an index
            randomIndex = Math.floor(Math.random() * inputCells.length);
        } while(inputCells[randomIndex]!= ''); //check if the chosen cell is a null
        console.log(randomIndex)
        updateCell(cell[randomIndex], randomIndex, currentPlayer);
        clickSoundBot.play(); 
        if(!checkWin()) {
            changePlayer();
            pauseGame = false;
            return
        }
        currentPlayer = (currentPlayer == 'X') ? 'O' : 'X'
    }, 1000)//duration time set for computer's turn
}

function checkWin() {
    for (const [a, b, c] of winConditions){
        //checking for win condition
        if (
            inputCells[a] == currentPlayer &&
            inputCells[b] == currentPlayer &&
            inputCells[c] == currentPlayer
        ) {
            declareWinner([a, b, c]);
            return true;
        }
    }
    //check for draw condition
    if(inputCells.every(cell => cell != '')){
        declareDrawCondition()
        return true;
    }
}


function declareWinner(winningIndices) {
    title.textContent = `${currentPlayer} Wins!`;
    pauseGame = true;
    console.log(winningIndices);
    winSound.play(); 
    winningIndices.forEach((index) =>
    cell[index].style.backgroundColor = '#464242')

    restart.style.visibility = 'visible';
}
//funciton for draw
function declareDrawCondition() {
    title.textContent = 'It\'s a Draw!';
    pauseGame = true;
    drawSound.play();
    restart.style.visibility = 'visible';
}
//funtion for player to choose for X or O

function enablePlayerSelection() {
    // Allow players to click and choose a new player again
    xPlayer.addEventListener('click', () => {
        selection.play();
        currentPlayer = 'X';
        xPlayer.classList.add('player-active');
        oPlayer.classList.remove('player-active');
    });
    
    oPlayer.addEventListener('click', () => {
        selection.play();
        currentPlayer = 'O';
        oPlayer.classList.add('player-active');
        xPlayer.classList.remove('player-active');
    });
}

//restart
restart.addEventListener('click', () => {
    restart.style.visibility = 'hidden';
    inputCells.fill('');
    cell.forEach(cell => {
       cell.textContent = '';
       cell.style.backgroundColor = '';
    })
    pauseGame = false;
    startGame = true;
    title.textContent = 'CHOOSE';
    currentPlayer = 'X';
    xPlayer.classList.add('player-active');
    oPlayer.classList.remove('player-active');

    enablePlayerSelection();
})
