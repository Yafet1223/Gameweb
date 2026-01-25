const squares = document.querySelectorAll(".square");

let selectedPiece = null;
let currentPlayer = "light"; // light = white, dark = black

// Add click event to every square
squares.forEach(square => {
    square.addEventListener("click", () => handleSquareClick(square));
});

function handleSquareClick(square) {
    const piece = square.querySelector(".piece");

    // If no piece selected yet
    if (!selectedPiece) {
        if (!piece) return;

        // Allow only current player's pieces
        if (!piece.classList.contains(currentPlayer)) return;

        selectPiece(piece);
    } 
    // If a piece is already selected
    else {
        movePiece(square);
    }
}

function selectPiece(piece) {
    clearHighlights();
    selectedPiece = piece;
    piece.parentElement.classList.add("selected");
}

function movePiece(targetSquare) {
    const targetPiece = targetSquare.querySelector(".piece");

    // Prevent capturing your own piece
    if (targetPiece && targetPiece.classList.contains(currentPlayer)) {
        clearSelection();
        return;
    }

    // Move piece
    targetSquare.innerHTML = "";
    targetSquare.appendChild(selectedPiece);

    // Switch turns
    currentPlayer = currentPlayer === "light" ? "dark" : "light";

    clearSelection();
}

function clearSelection() {
    clearHighlights();
    selectedPiece = null;
}

function clearHighlights() {
    squares.forEach(sq => sq.classList.remove("selected"));
}
