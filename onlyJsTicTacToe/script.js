// Game initial state
const players = ['X', 'O'];
const gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer;
let gameBoardElement;

// Game functions
const createTitle = (title) => {
    const titleElement = document.createElement('h1');
    titleElement.innerText = title;
    document.body.appendChild(titleElement);
};

const makeGameBoardElement = () => {
    const gameboardElement = document.createElement('div');
    gameboardElement.classList.add('game-board');
    return gameboardElement;
};

const makeSquareElemnts = (numberSquares) => {
    const squareElement = document.createElement('div');
    squareElement.classList.add('game-square');
    squareElement.addEventListener('click', (event) => {
        const { target } = event;
        target.textContent = currentPlayer;
        gameBoard[numberSquares] = currentPlayer;
        //Check Board for winners
        checkBoard();
        //switch player
        switchPlayer();

    }, { once:true })
    return squareElement;
};

const switchPlayer = () => {
    if(currentPlayer === players[0]) {
        currentPlayer = players[1];
    } else{
        currentPlayer = players[0];
    }
}

const checkBoard = () => {
    //gameBoard
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6] // diagonal
    ];

    //check for a winner
    for(let winCondition of winConditions) {
        const [position1, position2, position3] = winCondition;

        if(gameBoard[position1] !== "" && gameBoard[position1] === gameBoard[position2] && gameBoard[position1] === gameBoard[position3]) {
            completeGame(`${currentPlayer} wins!`);
            return;
        }
    }
    //Check for a draw
    const allSquaresUsed = gameBoard.every((square) => square !== "");
    if(allSquaresUsed) {
        completeGame("It's a draw!");
    }
    
};

const completeGame = (message) => {
    const overlayElement = document.createElement('div');
    overlayElement.style.position = 'fixed';
    overlayElement.style.top = '0';
    overlayElement.style.left = '0';
    overlayElement.style.right = '0';
    overlayElement.style.bottom = '0';
    overlayElement.style.backgroundColor = 'rgba(0,0,0,0.7)';
    overlayElement.style.display = 'flex';
    overlayElement.style.flexDirection = 'column';
    overlayElement.style.justifyContent = 'center';
    overlayElement.style.alignItems = 'center';
    overlayElement.style.textAlign = 'center';

    const messageElement = document.createElement('h2');
    messageElement.innerText = message;
    messageElement.style.color = 'white';
    messageElement.style.fontSize = '100px';

    overlayElement.appendChild(messageElement);
    

    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart Game';
    restartButton.style.backgroundColor= 'transparent';
    restartButton.style.color = 'white';
    restartButton.style.border = '1px solid white';
    restartButton.style.padding = '10px 20px';
    restartButton.style.fontSize = '30px';

    overlayElement.appendChild(restartButton);
    restartButton.addEventListener('click', () => {
        document.body.removeChild(overlayElement);
        resetGame();
    });

    document.body.appendChild(overlayElement);

}

const resetGame = () => {
    if(gameBoardElement) {
        document.body.removeChild(gameBoardElement);
    }

    gameBoardElement = makeGameBoardElement();
    //console.log(gameBoardElement);
    for(let square = 0; square < 9; square++) {
        gameBoardElement.appendChild(makeSquareElemnts(square));
    }
    currentPlayer = players[0];
    gameBoard.fill("");
    document.body.appendChild(gameBoardElement);
};



createTitle('Tic Tac Toe using only JS');
resetGame();

