const cells = document.querySelectorAll('#data-cell');
const winnerText = document.querySelector('[data-winner-text]');
const restartButton = document.querySelector('[data-restart-button]');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameWon = false;

const winningCombos = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6],
];

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (gameBoard[index] === '' && !gameWon) {
            cell.textContent = currentPlayer;
            gameBoard[index] = currentPlayer;
            Win();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

function Win() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameWon = true;
            winnerText.textContent = `${currentPlayer} wins!`;
            restartButton.style.display = 'block';
            return;
        }
    }
    if (!gameBoard.includes('')) {
        gameWon = true;
        winnerText.textContent = 'It\'s a draw!';
        restartButton.style.display = 'block';
    }
}

restartButton.addEventListener('click', resetGame);

function resetGame() {
    cells.forEach((cell, index) => {
        cell.textContent = '';
        gameBoard[index] = '';
    });
    currentPlayer = 'X';
    gameWon = false;
    winnerText.textContent = '';
    restartButton.style.display = 'none';
}

