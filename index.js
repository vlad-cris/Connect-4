//html elements
let boardElements = document.getElementById("board");

//matrix of board game
let boardMatrix = new Array();

let playerColors = ["bg-danger", "bg-primary"];
let playerRound = 1;
let gameCount = 0;
let endGame = false;

createBoardMatrix(7, 6, boardMatrix);
createBoardElements();
updatePlayerRound();

// create an element for each unit in the board
function createBoardElements() {
    let id = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            id = `${i}` + `${j}`
            boardElements.appendChild(createOneBoxElement(id));
            id++;
        }
    }
};

//update player round
function updatePlayerRound() {
    playerRound = ++playerRound % 2;
    document.getElementById("playerRound").innerText = playerRound + 1;
};

// create an empty matrix
function createBoardMatrix(columns, rows, newMatrix) {
    for (let i = 0; i < rows; i++) {
        let row = new Array();
        for (let j = 0; j < columns; j++) {
            row.push("");
        }
        newMatrix.push(row);
    }
};

//function update matrix values
function updateMatrixValues(id) {
    let row = id.charAt(0);
    let col = id.charAt(1);
    boardMatrix[row][col] = playerRound;
};

// create one Box element
function createOneBoxElement(id) {
    let elementParent = document.createElement("div");
    let elementChild = document.createElement("div");
    elementParent.classList.add("unit", "bg-info");
    elementChild.classList.add("subunit", "bg-light");
    elementChild.id = id;
    elementChild.onclick = function () {onClickBoard(id)};
    elementParent.appendChild(elementChild);
    return elementParent;
};

// function to do at onclick on board
function onClickBoard(id) {
    if (document.getElementById(id).classList.contains("bg-light") && !endGame) {
        addColor(id);
        updateMatrixValues(id);
        ++gameCount;
        checkGame(id);
        updatePlayerRound();
    }
};

//function to check game board values
function checkGame(id) {
    if (gameCount == 42) {
        endGame = true;
        showWinner("The GAME IS OVER!")
    }
    checkHorizontally(id);
    checkVertical(id);
    checkOnPrincipalDiagonal(id);
    checkOnSecondaryDiagonal(id);
};


// functions in check game
function checkHorizontally(id) {
    let elementsCount = 0;
    let row = id.charAt(0);
    let col = id.charAt(1);
    for (let i = col; i >= 0 && boardMatrix[row][i] === playerRound; i--) {
        elementsCount++;
    }
    row = id.charAt(0);
    col = id.charAt(1);
    for (let i = col + 1; i < 7 && boardMatrix[row][i] === playerRound; i++) {
        elementsCount++;
    }
    if (elementsCount > 3) {
        console.log("Check orizontal", elementsCount);
        endGame = true;
        showWinner(`The winner is Player ${playerRound + 1}`);
    }
};

function checkVertical(id) {
    let elementsCount = 0;
    let row = id.charAt(0);
    let col = id.charAt(1);
    for (let i = row; i >= 0 && boardMatrix[i][col] === playerRound; i--) {
        elementsCount++;
    }
    row = id.charAt(0);
    col = id.charAt(1);
    for (let i = row + 1; i < 6 && boardMatrix[i][col] === playerRound; i++) {
        elementsCount++;
    }
    if (elementsCount > 3) {
        console.log("Check vertical", elementsCount);
        endGame = true;
        showWinner(`The winner is Player ${playerRound + 1}`);
    }
};

function checkOnPrincipalDiagonal(id) {
    let elementsCount = 0;
    let row = id.charAt(0);
    let col = id.charAt(1);
    while (col >= 0 && row >= 0 && boardMatrix[row][col] === playerRound) {
        elementsCount++;
        col--;
        row--;
    }
    row = id.charAt(0) + 1;
    col = id.charAt(1) + 1;
    while (col < 7 && row < 6 && boardMatrix[row][col] === playerRound) {
        elementsCount++;
        col++;
        row++;
    }
    if (elementsCount > 3) {
        console.log("Check PrinDiag", elementsCount);
        endGame = true;
        showWinner(`The winner is Player ${playerRound + 1}`);
    }
};

function checkOnSecondaryDiagonal(id) {
    let elementsCount = 0;
    let row = id.charAt(0);
    let col = id.charAt(1);
    while (col >= 0 && row < 6 && boardMatrix[row][col] === playerRound) {
        elementsCount++;
        col--;
        row++;
    }
    row = id.charAt(0) - 1;
    col = id.charAt(1) + 1;
    while (col < 7 && row >= 0 && boardMatrix[row][col] === playerRound) {
        elementsCount++;
        col++;
        row--;
    }
    if (elementsCount > 3) {
        console.log("Check SecDiag", elementsCount);
        endGame = true;
        showWinner(`The winner is Player ${playerRound + 1}`);
    }
};

// add color on board unit that have an id
function addColor(id) {
    document.getElementById(id).classList.remove("bg-light");
    document.getElementById(id).classList.add(playerColors[playerRound]);
};

// restart the game
function restart() {
    playerRound = 1;
    gameCount = 0;
    endGame = false;
    restartBoard();
    updatePlayerRound();
    showPlayerRound();
};

// winner message
function showWinner(message) {
    document.getElementById("round").setAttribute("hidden", "");
    document.getElementById("winner").removeAttribute("hidden");
    document.getElementById("restart").removeAttribute("hidden");
    document.getElementById("winner").innerText = message;
};

// show game board
function showPlayerRound() {
    document.getElementById("round").removeAttribute("hidden");
    document.getElementById("winner").setAttribute("hidden", "");
    document.getElementById("restart").setAttribute("hidden", "");
};

// reset board in html and in matrix
function restartBoard() {
    boardMatrix = new Array();
    createBoardMatrix(7, 6, boardMatrix);
    boardElements.innerHTML = "";
    createBoardElements();
};
