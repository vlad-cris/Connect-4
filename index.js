//html elements
let boardElements = document.getElementById("board");

//matrix of board game
let boardMatrix = new Array();

let playerColors = ["bg-danger", "bg-primary"];
let playerRound = 1;
let gameCount = 0;

createBoardMatrix(7, 6, boardMatrix);
createBoardElements();
updatePlayerRound();

// create an element for each unit in the board
function createBoardElements() {
    let id = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
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
    boardMatrix[Math.floor(id / 7)][id % 7] = playerRound;
}

// create one Box element
function createOneBoxElement(id) { 
    let elementParent = document.createElement("div");
    let elementChild = document.createElement("div");
    elementParent.classList.add("unit", "bg-info");
    elementChild.classList.add("subunit", "bg-light");
    elementChild.id = id;
    elementChild.onclick =function () {onclickBoard(id)};
    elementParent.appendChild(elementChild);
    return elementParent;
};

// function to do at onclick on board
function onclickBoard(id) {
    if (document.getElementById(id).classList.contains("bg-light")) {
        addColor(id);
        updateMatrixValues(id);
        updatePlayerRound();
        ++gameCount;
    }
};

// add color on board unit that have an id
function addColor(id) {
    document.getElementById(id).classList.remove("bg-light");
    document.getElementById(id).classList.add(playerColors[playerRound]);
}
