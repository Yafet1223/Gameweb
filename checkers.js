class CheckersGame {
    constructor() {
        this.board = [];
        this.currentPlayer = 'red';
        this.selectedPiece = null;
        this.possibleMoves = [];
        this.redPieces = 12;
        this.blackPieces = 12;
        this.mustJump = null;
        this.lastMove = null;
        
        this.initBoard();
        this.renderBoard();
        this.setupEventListeners();
    }

    initBoard() {
        this.board = Array(8).fill(null).map(() => Array(8).fill(null));
        
        
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    this.board[row][col] = { color: 'black', king: false };
                }
            }
        }
        
      
        for (let row = 5; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    this.board[row][col] = { color: 'red', king: false };
                }
            }
        }
    }

    renderBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                const piece = this.board[row][col];
                if (piece) {
                    const pieceElement = document.createElement('div');
                    pieceElement.className = `piece ${piece.color}`;
                    if (piece.king) {
                        pieceElement.classList.add('king');
                    }
                    cell.appendChild(pieceElement);
                }
                
                boardElement.appendChild(cell);
            }
        }
        
        this.updateDisplay();
    }

    setupEventListeners() {
        document.getElementById('board').addEventListener('click', (e) => {
            const cell = e.target.closest('.cell');
            if (!cell) return;
            
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
            this.handleCellClick(row, col);
        });
        
        document.getElementById('newGame').addEventListener('click', () => {
            this.newGame();
        });
    }

    handleCellClick(row, col) {
        const piece = this.board[row][col];
        
     
        const move = this.possibleMoves.find(m => m.toRow === row && m.toCol === col);
        if (move) {
            this.makeMove(move);
            return;
        }
        
        
        this.clearSelection();
        
      
        if (piece && piece.color === this.currentPlayer) {
            
            if (this.mustJump) {
                const jumps = this.getJumps(row, col);
                if (jumps.length > 0) {
                    this.selectedPiece = { row, col };
                    this.possibleMoves = jumps;
                    this.highlightMoves();
                    return;
                }
            } else {
                this.selectedPiece = { row, col };
                this.possibleMoves = this.getPossibleMoves(row, col);
                this.highlightMoves();
            }
        }
    }

    getPossibleMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece) return [];
        
        const moves = [];
        const directions = piece.king 
            ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]  
            : piece.color === 'red' 
                ? [[-1, -1], [-1, 1]]  // Red moves up
                : [[1, -1], [1, 1]];   // Black moves down
        
        // Check for jumps first
        const jumps = this.getJumps(row, col);
        if (jumps.length > 0) {
            return jumps;
        }
        
        // Regular moves
        for (const [dRow, dCol] of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            
            if (this.isValidPosition(newRow, newCol) && !this.board[newRow][newCol]) {
                moves.push({ fromRow: row, fromCol: col, toRow: newRow, toCol: newCol });
            }
        }
        
        return moves;
    }

    getJumps(row, col) {
        const piece = this.board[row][col];
        if (!piece) return [];
        
        const jumps = [];
        const directions = piece.king 
            ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
            : piece.color === 'red' 
                ? [[-1, -1], [-1, 1]]
                : [[1, -1], [1, 1]];
        
        for (const [dRow, dCol] of directions) {
            const jumpRow = row + dRow * 2;
            const jumpCol = col + dCol * 2;
            const middleRow = row + dRow;
            const middleCol = col + dCol;
            
            if (this.isValidPosition(jumpRow, jumpCol) && !this.board[jumpRow][jumpCol]) {
                const middlePiece = this.board[middleRow][middleCol];
                if (middlePiece && middlePiece.color !== piece.color) {
                    jumps.push({
                        fromRow: row,
                        fromCol: col,
                        toRow: jumpRow,
                        toCol: jumpCol,
                        capturedRow: middleRow,
                        capturedCol: middleCol
                    });
                }
            }
        }
        
        return jumps;
    }

    getMultiJumps(row, col, capturedPieces = []) {
        const piece = this.board[row][col];
        if (!piece) return [];
        
        const jumps = [];
        const directions = piece.king 
            ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
            : piece.color === 'red' 
                ? [[-1, -1], [-1, 1]]
                : [[1, -1], [1, 1]];
        
        for (const [dRow, dCol] of directions) {
            const jumpRow = row + dRow * 2;
            const jumpCol = col + dCol * 2;
            const middleRow = row + dRow;
            const middleCol = col + dCol;
            
            const middleKey = `${middleRow},${middleCol}`;
            if (capturedPieces.includes(middleKey)) continue;
            
            if (this.isValidPosition(jumpRow, jumpCol) && !this.board[jumpRow][jumpCol]) {
                const middlePiece = this.board[middleRow][middleCol];
                if (middlePiece && middlePiece.color !== piece.color) {
                    jumps.push({
                        fromRow: row,
                        fromCol: col,
                        toRow: jumpRow,
                        toCol: jumpCol,
                        capturedRow: middleRow,
                        capturedCol: middleCol,
                        capturedPieces: [...capturedPieces, middleKey]
                    });
                }
            }
        }
        
        return jumps;
    }

    makeMove(move) {
        const piece = this.board[move.fromRow][move.fromCol];
        
        // Move piece
        this.board[move.toRow][move.toCol] = piece;
        this.board[move.fromRow][move.fromCol] = null;
        
        // Handle capture
        if (move.capturedRow !== undefined) {
            this.board[move.capturedRow][move.capturedCol] = null;
            
            if (piece.color === 'red') {
                this.blackPieces--;
            } else {
                this.redPieces--;
            }
        }
        
        // Promote to king
        if (piece.color === 'red' && move.toRow === 0) {
            piece.king = true;
        } else if (piece.color === 'black' && move.toRow === 7) {
            piece.king = true;
        }
        
        // Check for multi-jump after promotion
        if (move.capturedRow !== undefined) {
            const capturedPieces = move.capturedPieces || [];
            capturedPieces.push(`${move.capturedRow},${move.capturedCol}`);
            const nextJumps = this.getMultiJumps(move.toRow, move.toCol, capturedPieces);
            
            if (nextJumps.length > 0) {
                this.selectedPiece = { row: move.toRow, col: move.toCol };
                this.possibleMoves = nextJumps;
                this.renderBoard();
                this.highlightMoves();
                this.updateDisplay();
                return;
            }
        }
        
        // Switch player only if no more jumps available
        this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
        
        // Check if next player must jump
        this.checkForForcedJumps();
        
        this.clearSelection();
        this.renderBoard();
        this.checkGameOver();
    }

    checkForForcedJumps() {
        this.mustJump = null;
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === this.currentPlayer) {
                    const jumps = this.getJumps(row, col);
                    if (jumps.length > 0) {
                        this.mustJump = { row, col };
                        return;
                    }
                }
            }
        }
    }

    isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    highlightMoves() {
        if (!this.selectedPiece) return;
        
       
        const selectedCell = document.querySelector(
            `[data-row="${this.selectedPiece.row}"][data-col="${this.selectedPiece.col}"]`
        );
        if (selectedCell) {
            selectedCell.classList.add('selected');
        }
        
        // Highlight possible moves
        this.possibleMoves.forEach(move => {
            const cell = document.querySelector(
                `[data-row="${move.toRow}"][data-col="${move.toCol}"]`
            );
            if (cell) {
                if (move.capturedRow !== undefined) {
                    cell.classList.add('possible-jump');
                } else {
                    cell.classList.add('possible-move');
                }
            }
        });
    }

    clearSelection() {
        this.selectedPiece = null;
        this.possibleMoves = [];
        
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('selected', 'possible-move', 'possible-jump');
        });
    }

    updateDisplay() {
        const currentPlayerElement = document.getElementById('currentPlayer');
        currentPlayerElement.textContent = this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1);
        currentPlayerElement.className = `current-player ${this.currentPlayer}`;
        
        document.getElementById('redScore').textContent = this.redPieces;
        document.getElementById('blackScore').textContent = this.blackPieces;
    }

    checkGameOver() {
        const gameStatus = document.getElementById('gameStatus');
        
        if (this.redPieces === 0) {
            gameStatus.textContent = 'Black Wins!';
            gameStatus.classList.add('winner');
            this.clearSelection();
            return;
        }
        
        if (this.blackPieces === 0) {
            gameStatus.textContent = 'Red Wins!';
            gameStatus.classList.add('winner');
            this.clearSelection();
            return;
        }
        
        // Check if current player can move
        let canMove = false;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === this.currentPlayer) {
                    const moves = this.getPossibleMoves(row, col);
                    if (moves.length > 0) {
                        canMove = true;
                        break;
                    }
                }
            }
            if (canMove) break;
        }
        
        if (!canMove) {
            const winner = this.currentPlayer === 'red' ? 'Black' : 'Red';
            gameStatus.textContent = `${winner} Wins! (No moves available)`;
            gameStatus.classList.add('winner');
            this.clearSelection();
        } else {
            gameStatus.textContent = '';
            gameStatus.classList.remove('winner');
        }
    }

    newGame() {
        this.currentPlayer = 'red';
        this.selectedPiece = null;
        this.possibleMoves = [];
        this.redPieces = 12;
        this.blackPieces = 12;
        this.mustJump = null;
        this.lastMove = null;
        
        this.initBoard();
        this.renderBoard();
        
        const gameStatus = document.getElementById('gameStatus');
        gameStatus.textContent = '';
        gameStatus.classList.remove('winner');
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CheckersGame();
});

