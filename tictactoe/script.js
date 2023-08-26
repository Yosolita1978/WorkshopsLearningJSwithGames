//Initial Setup
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('#messagesText');
const restart = document.querySelector('#restartBtn');
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
];
let options = ["", "", "", "", "", "", "", "", ""]; // empty board
let currentPlayer = "X";
let running = false;

initializeGame();

// Functions 
function initializeGame(){
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restart.addEventListener('click', restartGame);
    message.textContent = `It's ${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex');
    if(options[cellIndex] != "" || !running) return;
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const winCondition = winConditions[i];
        let cellA = options[winCondition[0]];
        let cellB = options[winCondition[1]];
        let cellC = options[winCondition[2]];
        //console.log(cellA, cellB, cellC)

        if(cellA == "" || cellB == "" || cellC == "") continue;

        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        message.textContent = `${currentPlayer} wins!`;
        running = false;
        return;
    } else if(!options.includes("")){ // no empty cells
        message.textContent = `It's a draw!`;
        running = false;
    } else{
        changePlayer();
    }

}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    message.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = ""); 
    running = true;  

}