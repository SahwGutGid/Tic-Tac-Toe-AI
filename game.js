/**
 * Tic-Tac-Toe AI Game
 * A fully functional Tic-Tac-Toe game with AI opponent
 * Uses Minimax algorithm for unbeatable AI on Hard difficulty
 */

class TicTacToeGame {
    constructor() {
        // DOM Elements
        this.board = document.getElementById('board');
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerDisplay = document.getElementById('current-player');
        this.gameStatusDisplay = document.getElementById('game-status');
        this.playerScoreDisplay = document.getElementById('player-score');
        this.aiScoreDisplay = document.getElementById('ai-score');
        this.drawScoreDisplay = document.getElementById('draw-score');
        this.difficultySelect = document.getElementById('difficulty');
        this.resetBtn = document.getElementById('reset-btn');
        this.newGameBtn = document.getElementById('new-game-btn');
        this.historyList = document.getElementById('history-list');
        
        // Game State
        this.currentPlayer = 'X';
        this.gameBoard = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = true;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        // Scores
        this.playerScore = 0;
        this.aiScore = 0;
        this.drawScore = 0;
        
        // Game History
        this.gameHistory = [];
        
        // Settings
        this.humanPlayer = 'X';
        this.difficulty = 'medium';
        this.aiThinking = false;
        
        // Initialize
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    setupEventListeners() {
        // Cell click
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });
        
        // Reset button
        this.resetBtn.addEventListener('click', () => this.resetGame());
        
        // New game button
        this.newGameBtn.addEventListener('click', () => this.newGame());
        
        // Player selection
        document.querySelectorAll('input[name="player"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.humanPlayer = e.target.value;
                this.newGame();
            });
        });
        
        // Difficulty selection
        this.difficultySelect.addEventListener('change', (e) => {
            this.difficulty = e.target.value;
        });
    }
    
    handleCellClick(cell) {
        if (!this.gameActive || this.aiThinking) return;
        
        const index = parseInt(cell.dataset.index);
        
        // Check if cell is empty and it's human's turn
        if (this.gameBoard[index] === '' && this.currentPlayer === this.humanPlayer) {
            this.makeMove(index, this.humanPlayer);
            
            // Check if game is over
            if (!this.gameActive) return;
            
            // AI's turn
            if (this.currentPlayer !== this.humanPlayer) {
                this.aiThinking = true;
                this.currentPlayerDisplay.textContent = 'AI is thinking...';
                
                // Small delay for better UX
                setTimeout(() => {
                    this.aiMove();
                    this.aiThinking = false;
                }, 500);
            }
        }
    }
    
    makeMove(index, player) {
        if (!this.gameActive || this.gameBoard[index] !== '') return false;
        
        // Update board
        this.gameBoard[index] = player;
        
        // Update UI
        const cell = this.cells[index];
        cell.classList.add('occupied');
        cell.classList.add(player.toLowerCase());
        
        // Check for win
        if (this.checkWin(player)) {
            this.endGame(player === this.humanPlayer ? 'win' : 'lose');
            return true;
        }
        
        // Check for draw
        if (this.checkDraw()) {
            this.endGame('draw');
            return true;
        }
        
        // Switch player
        this.currentPlayer = player === 'X' ? 'O' : 'X';
        this.updateDisplay();
        
        return true;
    }
    
    checkWin(player) {
        for (const combo of this.winningCombinations) {
            const [a, b, c] = combo;
            if (this.gameBoard[a] === player && 
                this.gameBoard[b] === player && 
                this.gameBoard[c] === player) {
                
                // Highlight winning cells
                this.cells[a].classList.add('win');
                this.cells[b].classList.add('win');
                this.cells[c].classList.add('win');
                
                // Draw winning line
                this.drawWinningLine(combo);
                
                return true;
            }
        }
        return false;
    }
    
    drawWinningLine(combo) {
        const [a, b, c] = combo;
        const cellA = this.cells[a];
        const cellC = this.cells[c];
        
        const rectA = cellA.getBoundingClientRect();
        const rectC = cellC.getBoundingClientRect();
        const boardRect = this.board.getBoundingClientRect();
        
        const line = document.createElement('div');
        line.className = 'winning-line';
        
        // Calculate line position and dimensions
        const isRow = Math.floor(a / 3) === Math.floor(b / 3) && Math.floor(b / 3) === Math.floor(c / 3);
        const isCol = a % 3 === b % 3 && b % 3 === c % 3;
        const isDiagonal = (a === 0 && c === 8) || (a === 2 && c === 6);
        
        if (isRow) {
            // Horizontal line
            const row = Math.floor(a / 3);
            const top = rectA.top - boardRect.top + rectA.height / 2 - 2;
            line.style.top = `${top}px`;
            line.style.left = `${rectA.left - boardRect.left + 5}px`;
            line.style.width = `${rectC.left - rectA.left + rectC.width - 10}px`;
        } else if (isCol) {
            // Vertical line
            const col = a % 3;
            const left = rectA.left - boardRect.left + rectA.width / 2 - 2;
            line.style.top = `${rectA.top - boardRect.top + 5}px`;
            line.style.left = `${left}px`;
            line.style.width = `${rectC.top - rectA.top + rectC.height - 10}px`;
            line.style.transform = 'rotate(90deg)';
        } else if (isDiagonal) {
            // Diagonal line
            if (a === 0 && c === 8) {
                // Top-left to bottom-right
                line.style.top = `${rectA.top - boardRect.top + rectA.height / 2 - 2}px`;
                line.style.left = `${rectA.left - boardRect.left + 5}px`;
                line.style.width = `${Math.sqrt(Math.pow(rectC.left - rectA.left, 2) + Math.pow(rectC.top - rectA.top, 2)) - 10}px`;
                line.style.transform = `rotate(${Math.atan2(rectC.top - rectA.top, rectC.left - rectA.left)}rad)`;
            } else {
                // Top-right to bottom-left
                line.style.top = `${rectA.top - boardRect.top + rectA.height / 2 - 2}px`;
                line.style.left = `${rectA.left - boardRect.left + 5}px`;
                line.style.width = `${Math.sqrt(Math.pow(rectC.left - rectA.left, 2) + Math.pow(rectC.top - rectA.top, 2)) - 10}px`;
                line.style.transform = `rotate(${Math.atan2(rectC.top - rectA.top, rectC.left - rectA.left)}rad)`;
            }
        }
        
        this.board.appendChild(line);
    }
    
    checkDraw() {
        return !this.gameBoard.includes('');
    }
    
    endGame(result) {
        this.gameActive = false;
        
        // Update scores
        if (result === 'win') {
            this.playerScore++;
            this.playerScoreDisplay.textContent = this.playerScore;
            this.gameStatusDisplay.textContent = 'You win!';
            this.gameStatusDisplay.style.color = '#4caf50';
        } else if (result === 'lose') {
            this.aiScore++;
            this.aiScoreDisplay.textContent = this.aiScore;
            this.gameStatusDisplay.textContent = 'AI wins!';
            this.gameStatusDisplay.style.color = '#ff6b6b';
        } else {
            this.drawScore++;
            this.drawScoreDisplay.textContent = this.drawScore;
            this.gameStatusDisplay.textContent = 'It\'s a draw!';
            this.gameStatusDisplay.style.color = '#ff9800';
        }
        
        // Add to history
        this.addToHistory(result);
        
        // Update current player display
        this.currentPlayerDisplay.textContent = result === 'win' ? 'You won!' : 
                                               result === 'lose' ? 'AI won!' : 'Draw!';
    }
    
    addToHistory(result) {
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${result}`;
        
        const now = new Date();
        const timeStr = now.toLocaleTimeString();
        const dateStr = now.toLocaleDateString();
        
        const resultText = result === 'win' ? 'Win' : 
                          result === 'lose' ? 'Loss' : 'Draw';
        
        historyItem.textContent = `${resultText} - ${dateStr} ${timeStr} (as ${this.humanPlayer})`;
        this.historyList.prepend(historyItem);
        
        // Keep only last 10 games
        if (this.historyList.children.length > 10) {
            this.historyList.removeChild(this.historyList.lastChild);
        }
    }
    
    aiMove() {
        if (!this.gameActive) return;
        
        let bestMove;
        
        switch (this.difficulty) {
            case 'easy':
                bestMove = this.getRandomMove();
                break;
            case 'medium':
                // 50% chance to make optimal move, 50% random
                bestMove = Math.random() < 0.5 ? 
                    this.getBestMove() : this.getRandomMove();
                break;
            case 'hard':
                bestMove = this.getBestMove();
                break;
            default:
                bestMove = this.getBestMove();
        }
        
        if (bestMove !== null) {
            this.makeMove(bestMove, this.currentPlayer);
            this.cells[bestMove].classList.add('ai-move');
            
            // Check if AI won or it's a draw
            if (!this.gameActive) return;
            
            // If human is O and game continues, it's human's turn again
            if (this.currentPlayer === this.humanPlayer) {
                this.updateDisplay();
            }
        }
    }
    
    getRandomMove() {
        const emptyCells = [];
        this.gameBoard.forEach((cell, index) => {
            if (cell === '') emptyCells.push(index);
        });
        
        if (emptyCells.length > 0) {
            return emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }
        return null;
    }
    
    getBestMove() {
        let bestScore = -Infinity;
        let bestMove = null;
        
        this.gameBoard.forEach((cell, index) => {
            if (cell === '') {
                this.gameBoard[index] = this.currentPlayer;
                const score = this.minimax(this.gameBoard, 0, false);
                this.gameBoard[index] = '';
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = index;
                }
            }
        });
        
        return bestMove;
    }
    
    minimax(board, depth, isMaximizing) {
        // Terminal conditions
        if (this.checkTerminalWin(board, 'O')) {
            return 10 - depth;
        }
        if (this.checkTerminalWin(board, 'X')) {
            return depth - 10;
        }
        if (this.checkTerminalDraw(board)) {
            return 0;
        }
        
        if (isMaximizing) {
            let bestScore = -Infinity;
            board.forEach((cell, index) => {
                if (cell === '') {
                    board[index] = 'O';
                    const score = this.minimax(board, depth + 1, false);
                    board[index] = '';
                    bestScore = Math.max(score, bestScore);
                }
            });
            return bestScore;
        } else {
            let bestScore = Infinity;
            board.forEach((cell, index) => {
                if (cell === '') {
                    board[index] = 'X';
                    const score = this.minimax(board, depth + 1, true);
                    board[index] = '';
                    bestScore = Math.min(score, bestScore);
                }
            });
            return bestScore;
        }
    }
    
    checkTerminalWin(board, player) {
        for (const combo of this.winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] === player && board[b] === player && board[c] === player) {
                return true;
            }
        }
        return false;
    }
    
    checkTerminalDraw(board) {
        return !board.includes('');
    }
    
    resetGame() {
        this.gameBoard = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = true;
        this.currentPlayer = this.humanPlayer;
        
        // Clear board UI
        this.cells.forEach(cell => {
            cell.classList.remove('occupied', 'x', 'o', 'win', 'ai-move');
            cell.textContent = '';
        });
        
        // Remove winning line
        const winningLine = this.board.querySelector('.winning-line');
        if (winningLine) {
            winningLine.remove();
        }
        
        // Reset status
        this.gameStatusDisplay.textContent = '';
        this.gameStatusDisplay.style.color = '';
        
        this.updateDisplay();
    }
    
    newGame() {
        this.resetGame();
        // Keep scores and history
    }
    
    updateDisplay() {
        const playerSymbol = this.currentPlayer === this.humanPlayer ? 
            `You (${this.currentPlayer})` : `AI (${this.currentPlayer})`;
        this.currentPlayerDisplay.textContent = `${playerSymbol}'s turn`;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToeGame();
});
