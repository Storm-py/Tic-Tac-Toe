const Gameboard = (()=> {
    const gameboard = ["", "", "", "", "", "", "", "", ""];

    function render() {
        let boardHtml = '';
        gameboard.forEach((square, index) => {
            boardHtml += `<div class="square" id="square-${index}">${square}</div>`;
        });
        document.querySelector(".gameboard").innerHTML = boardHtml;
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick);
        });
    }

    function update(index, mark) {
        gameboard[index] = mark;
        render();
    }

    const getGameboard = () => gameboard;

    return {
        render,
        update,
        getGameboard,
    };
})();

function createPlayer(name, mark) {
    return {
        name,
        mark
    };
}

const Game = (()=> {
    let Players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    const start = () => {
        Players = [
            createPlayer(document.querySelector('.player1').value, 'X'),
            createPlayer(document.querySelector('.player2').value, 'O'),
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    };

    const handleClick = (e) => {
        let index = parseInt(e.target.id.split('-')[1]);
        if (Gameboard.getGameboard()[index] !== "" || gameOver) {
            return;
        }
        Gameboard.update(index, Players[currentPlayerIndex].mark);
        if (checkForWin(Gameboard.getGameboard(), Players[currentPlayerIndex].mark)) {
            alert(`${Players[currentPlayerIndex].name} wins!`);
            gameOver = true;
            return;
        }
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    const checkForWin = (board, mark) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombinations.some(combination => 
            combination.every(index => board[index] === mark)
        );
    };

    return {
        start,
        handleClick,
    };
})();

document.querySelector('.startButton').addEventListener('click', () => {
    Game.start();
});
