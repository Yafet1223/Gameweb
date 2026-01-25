let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let win="Wins"
let draw="Draw"

function play(cell, index) {
  if (board[index] !== "" || gameOver) return;

  board[index] = currentPlayer;
  cell.innerHTML = currentPlayer;

  if (checkWin()) {
    let res=document.getElementById("result").innerText =
      currentPlayer + win;
      res.innerText=currentPlayer 
      res.style.color="red"
    gameOver = true;
    return;
  }

  if (!board.includes("")) {
    document.getElementById("result").innerText = draw;
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return wins.some(pattern =>
    pattern.every(i => board[i] === currentPlayer)
  );
}

function reset() {
  board = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
  document.getElementById("result").innerText = "";
  currentPlayer = "X";
  gameOver = false;
}
