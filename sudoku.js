let grid = Array(9).fill().map(() => Array(9).fill(0));
let fixed = Array(9).fill().map(() => Array(9).fill(false));
let selectedCell = null;

function initGame() {
    // Simple puzzle - easy level
    const puzzle = [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
    ];
    
    grid = puzzle.map(row => [...row]);
    fixed = grid.map(row => row.map(val => val !== 0));
    renderGrid();
}

function renderGrid() {
    const container = document.getElementById('sudoku-grid');
    container.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = grid[i][j] || '';
            if (fixed[i][j]) cell.classList.add('fixed');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => selectCell(i, j));
            container.appendChild(cell);
        }
    }
}

function selectCell(row, col) {
    if (fixed[row][col]) return;
    
    if (selectedCell) {
        document.querySelector(`[data-row="${selectedCell[0]}"][data-col="${selectedCell[1]}"]`).classList.remove('selected');
    }
    
    selectedCell = [row, col];
    document.querySelector(`[data-row="${row}"][data-col="${col}"]`).classList.add('selected');
}

function isValid(row, col, num) {
    // Check row
    for (let j = 0; j < 9; j++) {
        if (grid[row][j] === num && j !== col) return false;
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] === num && i !== row) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (grid[i][j] === num && (i !== row || j !== col)) return false;
        }
    }
    
    return true;
}

function checkGame() {
    let hasError = false;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('error');
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const num = grid[row][col];
        
        if (num && !isValid(row, col, num)) {
            cell.classList.add('error');
            hasError = true;
        }
    });
    
    const isComplete = grid.every(row => row.every(cell => cell !== 0));
    
    if (isComplete && !hasError) {
        document.getElementById('message').textContent = '🎉 Congratulations! You solved it!';
    } else if (hasError) {
        document.getElementById('message').textContent = '❌ There are errors in your solution';
    } else {
        document.getElementById('message').textContent = 'Keep going!';
    }
}

// Keyboard input
document.addEventListener('keydown', (e) => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    if (fixed[row][col]) return;
    
    const key = e.key;
    if (key >= '1' && key <= '9') {
        grid[row][col] = parseInt(key);
        renderGrid();
        selectCell(row, col);
        checkGame();
    } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
        grid[row][col] = 0;
        renderGrid();
        selectCell(row, col);
    }
});

document.getElementById('new-game').addEventListener('click', initGame);
document.getElementById('check').addEventListener('click', checkGame);

initGame();

