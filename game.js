/**
 * Tic-Tac-Toe AI - Minimal & Satisfying Edition
 * A complete game with progression, sounds, and fun features
 */

class TicTacToeGame {
    constructor() {
        // DOM Elements
        this.menuOverlay = document.getElementById('menu-overlay');
        this.gameUI = document.getElementById('game-ui');
        this.settingsModal = document.getElementById('settings-modal');
        this.statsModal = document.getElementById('stats-modal');
        this.gameOverModal = document.getElementById('game-over-modal');
        
        this.playBtn = document.getElementById('play-btn');
        this.settingsBtn = document.getElementById('settings-btn');
        this.statsBtn = document.getElementById('stats-btn');
        this.backBtn = document.getElementById('back-btn');
        this.closeSettingsBtn = document.getElementById('close-settings');
        this.closeStatsBtn = document.getElementById('close-stats');
        this.saveSettingsBtn = document.getElementById('save-settings');
        this.playAgainBtn = document.getElementById('play-again-btn');
        this.mainMenuBtn = document.getElementById('main-menu-btn');
        
        this.gameBoard = document.getElementById('game-board');
        this.cells = document.querySelectorAll('.cell');
        this.turnIndicator = document.getElementById('turn-indicator');
        this.gameTimer = document.getElementById('game-timer');
        this.playerScoreDisplay = document.getElementById('player-score');
        this.aiScoreDisplay = document.getElementById('ai-score');
        this.gameResultText = document.getElementById('game-result-text');
        this.xpGainedDisplay = document.getElementById('xp-gained');
        this.levelUpNotification = document.getElementById('level-up-notification');
        this.winLine = document.getElementById('win-line');
        this.confettiContainer = document.getElementById('confetti');
        this.particlesContainer = document.getElementById('particles');
        
        // Settings elements
        this.symbolXBtn = document.getElementById('symbol-x');
        this.symbolOBtn = document.getElementById('symbol-o');
        this.symbolBtns = document.querySelectorAll('.symbol-btn');
        this.difficultyBtns = document.querySelectorAll('.difficulty-btn');
        this.themeBtns = document.querySelectorAll('.theme-btn');
        this.soundToggle = document.getElementById('sound-toggle');
        this.animationToggle = document.getElementById('animation-toggle');
        
        // Stats elements
        this.totalWinsDisplay = document.getElementById('total-wins');
        this.totalLossesDisplay = document.getElementById('total-losses');
        this.totalDrawsDisplay = document.getElementById('total-draws');
        this.totalXpDisplay = document.getElementById('total-xp');
        this.currentLevelStatDisplay = document.getElementById('current-level-stat');
        this.totalGamesDisplay = document.getElementById('total-games');
        this.achievementList = document.getElementById('achievement-list');
        
        // Progression elements
        this.currentLevelDisplay = document.getElementById('current-level');
        this.currentXpDisplay = document.getElementById('current-xp');
        this.xpNeededDisplay = document.getElementById('xp-needed');
        this.xpFill = document.getElementById('xp-fill');
        
        // Game actions
        this.restartBtn = document.getElementById('restart-btn');
        this.undoBtn = document.getElementById('undo-btn');
        this.hintBtn = document.getElementById('hint-btn');
        
        // Game State
        this.currentPlayer = 'X';
        this.gameBoard = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = false;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        // Scores
        this.playerScore = 0;
        this.aiScore = 0;
        
        // Settings
        this.humanPlayer = 'X';
        this.difficulty = 'medium';
        this.aiThinking = false;
        this.soundEnabled = true;
        this.animationEnabled = true;
        this.currentTheme = 'light';
        
        // Progression System
        this.totalXP = 0;
        this.level = 1;
        this.xpToNextLevel = 100;
        this.totalGames = 0;
        this.winStreak = 0;
        this.maxWinStreak = 0;
        
        // Achievements
        this.achievements = {
            firstWin: { unlocked: false, name: 'First Blood', description: 'Win your first game', icon: '🩸' },
            firstLoss: { unlocked: false, name: 'Lesson Learned', description: 'Lose a game', icon: '📚' },
            firstDraw: { unlocked: false, name: 'Peace Maker', description: 'Draw a game', icon: '☮️' },
            winStreak5: { unlocked: false, name: 'On a Roll', description: 'Win 5 games in a row', icon: '🔥' },
            winStreak10: { unlocked: false, name: 'Unstoppable', description: 'Win 10 games in a row', icon: '💪' },
            beatHard: { unlocked: false, name: 'AI Slayer', description: 'Beat the AI on Hard', icon: '🤖' },
            level5: { unlocked: false, name: 'Veteran', description: 'Reach level 5', icon: '🎖️' },
            level10: { unlocked: false, name: 'Master', description: 'Reach level 10', icon: '👑' },
            total100: { unlocked: false, name: 'Dedicated', description: 'Play 100 games', icon: '🎮' },
            perfectGame: { unlocked: false, name: 'Perfect', description: 'Win without AI scoring', icon: '✨' }
        };
        
        // Game History
        this.gameHistory = [];
        this.moveHistory = [];
        
        // Timer
        this.gameStartTime = null;
        this.timerInterval = null;
        this.gameDuration = 0;
        
        // Audio
        this.audioGen = new AudioGenerator();
        
        // Initialize
        this.loadSettings();
        this.initParticles();
        this.setupEventListeners();
        this.updateStats();
        this.renderAchievements();
        this.updateProgressionUI();
    }
    
    initParticles() {
        if (!this.animationEnabled) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;
            this.particlesContainer.appendChild(particle);
        }
    }
    
    setupEventListeners() {
        // Menu buttons
        this.playBtn.addEventListener('click', () => this.startGame());
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.statsBtn.addEventListener('click', () => this.openStats());
        this.backBtn.addEventListener('click', () => this.returnToMenu());
        
        // Modal close buttons
        this.closeSettingsBtn.addEventListener('click', () => this.closeSettings());
        this.closeStatsBtn.addEventListener('click', () => this.closeStats());
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        
        // Game over buttons
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
        this.mainMenuBtn.addEventListener('click', () => this.returnToMenu());
        
        // Cell clicks
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });
        
        // Game actions
        this.restartBtn.addEventListener('click', () => this.resetGame());
        this.undoBtn.addEventListener('click', () => this.undoMove());
        this.hintBtn.addEventListener('click', () => this.showHint());
        
        // Settings
        this.symbolBtns.forEach(btn => {
            btn.addEventListener('click', () => this.selectSymbol(btn));
        });
        
        this.difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => this.selectDifficulty(btn));
        });
        
        this.themeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.selectTheme(btn));
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.gameOverModal.classList.contains('active')) {
                    this.closeGameOver();
                } else if (this.settingsModal.classList.contains('active')) {
                    this.closeSettings();
                } else if (this.statsModal.classList.contains('active')) {
                    this.closeStats();
                } else if (this.gameActive) {
                    this.returnToMenu();
                }
            }
            
            if (e.key === 'r' || e.key === 'R') {
                if (this.gameActive) this.resetGame();
            }
            
            if (e.key === 'u' || e.key === 'U') {
                if (this.gameActive) this.undoMove();
            }
            
            if (e.key === 'h' || e.key === 'H') {
                if (this.gameActive) this.showHint();
            }
        });
        
        // Sound toggle
        this.soundToggle.addEventListener('change', (e) => {
            this.soundEnabled = e.target.checked;
            this.audioGen.setEnabled(this.soundEnabled);
        });
        
        // Animation toggle
        this.animationToggle.addEventListener('change', (e) => {
            this.animationEnabled = e.target.checked;
            document.body.style.setProperty('--transition-normal', 
                this.animationEnabled ? '0.3s ease' : '0s ease');
        });
    }
    
    loadSettings() {
        const savedSettings = localStorage.getItem('tictactoe-settings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            this.humanPlayer = settings.humanPlayer || 'X';
            this.difficulty = settings.difficulty || 'medium';
            this.soundEnabled = settings.soundEnabled !== false;
            this.animationEnabled = settings.animationEnabled !== false;
            this.currentTheme = settings.theme || 'light';
            
            // Apply settings
            this.soundToggle.checked = this.soundEnabled;
            this.animationToggle.checked = this.animationEnabled;
            this.selectSymbol(document.querySelector(`.symbol-btn[data-symbol="${this.humanPlayer}"]`));
            this.selectDifficulty(document.querySelector(`.difficulty-btn[data-difficulty="${this.difficulty}"]`));
            this.selectTheme(document.querySelector(`.theme-btn[data-theme="${this.currentTheme}"]`));
        }
        
        // Load progression
        const savedProgression = localStorage.getItem('tictactoe-progression');
        if (savedProgression) {
            const progression = JSON.parse(savedProgression);
            this.totalXP = progression.totalXP || 0;
            this.level = progression.level || 1;
            this.xpToNextLevel = progression.xpToNextLevel || 100;
            this.totalGames = progression.totalGames || 0;
            this.winStreak = progression.winStreak || 0;
            this.maxWinStreak = progression.maxWinStreak || 0;
            this.achievements = progression.achievements || this.achievements;
        }
        
        this.audioGen.setEnabled(this.soundEnabled);
    }
    
    saveSettings() {
        const settings = {
            humanPlayer: this.humanPlayer,
            difficulty: this.difficulty,
            soundEnabled: this.soundEnabled,
            animationEnabled: this.animationEnabled,
            theme: this.currentTheme
        };
        localStorage.setItem('tictactoe-settings', JSON.stringify(settings));
        this.closeSettings();
    }
    
    saveProgression() {
        const progression = {
            totalXP: this.totalXP,
            level: this.level,
            xpToNextLevel: this.xpToNextLevel,
            totalGames: this.totalGames,
            winStreak: this.winStreak,
            maxWinStreak: this.maxWinStreak,
            achievements: this.achievements
        };
        localStorage.setItem('tictactoe-progression', JSON.stringify(progression));
    }
    
    selectSymbol(btn) {
        this.symbolBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.humanPlayer = btn.dataset.symbol;
    }
    
    selectDifficulty(btn) {
        this.difficultyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.difficulty = btn.dataset.difficulty;
    }
    
    selectTheme(btn) {
        this.themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTheme = btn.dataset.theme;
        document.body.setAttribute('data-theme', this.currentTheme);
    }
    
    openSettings() {
        this.settingsModal.classList.add('active');
        this.audioGen.play('click');
    }
    
    closeSettings() {
        this.settingsModal.classList.remove('active');
        this.audioGen.play('click');
    }
    
    openStats() {
        this.updateStats();
        this.statsModal.classList.add('active');
        this.audioGen.play('click');
    }
    
    closeStats() {
        this.statsModal.classList.remove('active');
        this.audioGen.play('click');
    }
    
    startGame() {
        this.menuOverlay.classList.add('hidden');
        this.gameUI.classList.add('active');
        this.resetGame();
        this.startTimer();
        this.audioGen.play('click');
    }
    
    returnToMenu() {
        this.stopTimer();
        this.menuOverlay.classList.remove('hidden');
        this.gameUI.classList.remove('active');
        this.audioGen.play('click');
    }
    
    startTimer() {
        this.stopTimer();
        this.gameStartTime = Date.now();
        this.timerInterval = setInterval(() => {
            this.gameDuration = Math.floor((Date.now() - this.gameStartTime) / 1000);
            const minutes = Math.floor(this.gameDuration / 60).toString().padStart(2, '0');
            const seconds = (this.gameDuration % 60).toString().padStart(2, '0');
            this.gameTimer.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    handleCellClick(cell) {
        if (!this.gameActive || this.aiThinking) return;
        
        const index = parseInt(cell.dataset.index);
        
        if (this.gameBoard[index] === '' && this.currentPlayer === this.humanPlayer) {
            this.audioGen.play('place');
            this.makeMove(index, this.humanPlayer);
            
            if (!this.gameActive) return;
            
            // AI's turn
            if (this.currentPlayer !== this.humanPlayer) {
                this.aiThinking = true;
                this.turnIndicator.textContent = 'AI THINKING...';
                
                setTimeout(() => {
                    this.aiMove();
                    this.aiThinking = false;
                }, 500);
            }
        }
    }
    
    makeMove(index, player) {
        if (!this.gameActive || this.gameBoard[index] !== '') return false;
        
        // Save to move history
        this.moveHistory.push({ index, player, board: [...this.gameBoard] });
        
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
        this.updateTurnIndicator();
        
        return true;
    }
    
    checkWin(player) {
        for (const combo of this.winningCombinations) {
            const [a, b, c] = combo;
            if (this.gameBoard[a] === player && 
                this.gameBoard[b] === player && 
                this.gameBoard[c] === player) {
                
                this.highlightWin(combo);
                return true;
            }
        }
        return false;
    }
    
    highlightWin(combo) {
        const [a, b, c] = combo;
        this.cells[a].classList.add('win');
        this.cells[b].classList.add('win');
        this.cells[c].classList.add('win');
        
        // Draw winning line
        const cellA = this.cells[a];
        const cellC = this.cells[c];
        
        const rectA = cellA.getBoundingClientRect();
        const rectC = cellC.getBoundingClientRect();
        const boardRect = this.gameBoard.getBoundingClientRect();
        
        const line = this.winLine;
        line.setAttribute('x1', rectA.left + rectA.width / 2 - boardRect.left);
        line.setAttribute('y1', rectA.top + rectA.height / 2 - boardRect.top);
        line.setAttribute('x2', rectC.left + rectC.width / 2 - boardRect.left);
        line.setAttribute('y2', rectC.top + rectC.height / 2 - boardRect.top);
        line.style.display = 'block';
    }
    
    checkDraw() {
        return !this.gameBoard.includes('');
    }
    
    endGame(result) {
        this.gameActive = false;
        this.stopTimer();
        
        // Update scores
        if (result === 'win') {
            this.playerScore++;
            this.playerScoreDisplay.textContent = this.playerScore;
            this.gameResultText.textContent = 'YOU WIN!';
            this.gameResultText.style.color = 'var(--accent-success)';
            
            // XP calculation
            let xpGain = 50;
            if (this.difficulty === 'hard') xpGain = 100;
            else if (this.difficulty === 'medium') xpGain = 75;
            
            // Bonus for perfect game
            if (this.aiScore === 0 && this.difficulty === 'hard') {
                xpGain += 50;
                this.achievements.perfectGame.unlocked = true;
            }
            
            this.addXP(xpGain);
            this.winStreak++;
            this.maxWinStreak = Math.max(this.maxWinStreak, this.winStreak);
            
            // Check achievements
            if (!this.achievements.firstWin.unlocked) {
                this.achievements.firstWin.unlocked = true;
            }
            if (this.difficulty === 'hard' && !this.achievements.beatHard.unlocked) {
                this.achievements.beatHard.unlocked = true;
            }
            
            // Create confetti
            this.createConfetti();
            this.audioGen.play('win');
            
        } else if (result === 'lose') {
            this.aiScore++;
            this.aiScoreDisplay.textContent = this.aiScore;
            this.gameResultText.textContent = 'YOU LOSE!';
            this.gameResultText.style.color = 'var(--accent-secondary)';
            
            let xpGain = 20;
            if (this.difficulty === 'hard') xpGain = 30;
            else if (this.difficulty === 'medium') xpGain = 25;
            
            this.addXP(xpGain);
            this.winStreak = 0;
            
            // Check achievements
            if (!this.achievements.firstLoss.unlocked) {
                this.achievements.firstLoss.unlocked = true;
            }
            
            this.audioGen.play('lose');
            
        } else {
            this.gameResultText.textContent = 'DRAW!';
            this.gameResultText.style.color = 'var(--accent-warning)';
            
            let xpGain = 30;
            if (this.difficulty === 'hard') xpGain = 40;
            
            this.addXP(xpGain);
            this.winStreak = 0;
            
            // Check achievements
            if (!this.achievements.firstDraw.unlocked) {
                this.achievements.firstDraw.unlocked = true;
            }
            
            this.audioGen.play('draw');
        }
        
        // Update total games
        this.totalGames++;
        
        // Check win streak achievements
        if (this.winStreak >= 5 && !this.achievements.winStreak5.unlocked) {
            this.achievements.winStreak5.unlocked = true;
        }
        if (this.winStreak >= 10 && !this.achievements.winStreak10.unlocked) {
            this.achievements.winStreak10.unlocked = true;
        }
        
        // Check total games achievement
        if (this.totalGames >= 100 && !this.achievements.total100.unlocked) {
            this.achievements.total100.unlocked = true;
        }
        
        // Add to history
        this.gameHistory.push({
            result,
            date: new Date().toISOString(),
            duration: this.gameDuration,
            difficulty: this.difficulty,
            player: this.humanPlayer
        });
        
        // Save progression
        this.saveProgression();
        
        // Show game over modal
        this.xpGainedDisplay.textContent = `+${xpGain} XP`;
        this.gameOverModal.classList.add('active');
        
        // Reset winning line
        this.winLine.style.display = 'none';
    }
    
    addXP(amount) {
        this.totalXP += amount;
        
        // Check for level up
        let leveledUp = false;
        while (this.totalXP >= this.xpToNextLevel) {
            this.totalXP -= this.xpToNextLevel;
            this.level++;
            this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5);
            leveledUp = true;
        }
        
        // Update UI
        this.updateProgressionUI();
        
        // Check level achievements
        if (this.level >= 5 && !this.achievements.level5.unlocked) {
            this.achievements.level5.unlocked = true;
        }
        if (this.level >= 10 && !this.achievements.level10.unlocked) {
            this.achievements.level10.unlocked = true;
        }
        
        // Show level up notification
        if (leveledUp) {
            this.levelUpNotification.style.display = 'block';
            this.audioGen.play('levelup');
        }
        
        // Save progression
        this.saveProgression();
    }
    
    updateProgressionUI() {
        this.currentLevelDisplay.textContent = this.level;
        this.currentXpDisplay.textContent = this.totalXP;
        this.xpNeededDisplay.textContent = this.xpToNextLevel;
        
        const xpPercentage = (this.totalXP / this.xpToNextLevel) * 100;
        this.xpFill.style.width = `${xpPercentage}%`;
    }
    
    updateStats() {
        this.totalWinsDisplay.textContent = this.gameHistory.filter(g => g.result === 'win').length;
        this.totalLossesDisplay.textContent = this.gameHistory.filter(g => g.result === 'lose').length;
        this.totalDrawsDisplay.textContent = this.gameHistory.filter(g => g.result === 'draw').length;
        this.totalXpDisplay.textContent = this.totalXP;
        this.currentLevelStatDisplay.textContent = this.level;
        this.totalGamesDisplay.textContent = this.totalGames;
    }
    
    renderAchievements() {
        this.achievementList.innerHTML = '';
        
        Object.entries(this.achievements).forEach(([key, achievement]) => {
            const item = document.createElement('div');
            item.className = `achievement-item ${achievement.unlocked ? '' : 'locked'}`;
            
            item.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                </div>
                ${achievement.unlocked ? '<div class="achievement-check">✓</div>' : ''}
            `;
            
            this.achievementList.appendChild(item);
        });
    }
    
    createConfetti() {
        if (!this.animationEnabled) return;
        
        this.confettiContainer.innerHTML = '';
        
        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = `${Math.random() * 100}%`;
            piece.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
            piece.style.animationDelay = `${Math.random() * 2}s`;
            piece.style.animationDuration = `${1 + Math.random() * 1}s`;
            this.confettiContainer.appendChild(piece);
        }
    }
    
    closeGameOver() {
        this.gameOverModal.classList.remove('active');
        this.levelUpNotification.style.display = 'none';
        this.confettiContainer.innerHTML = '';
        this.winLine.style.display = 'none';
        this.updateStats();
        this.renderAchievements();
    }
    
    aiMove() {
        if (!this.gameActive) return;
        
        let bestMove;
        
        switch (this.difficulty) {
            case 'easy':
                bestMove = this.getRandomMove();
                break;
            case 'medium':
                bestMove = Math.random() < 0.7 ? this.getBestMove() : this.getRandomMove();
                break;
            case 'hard':
                bestMove = this.getBestMove();
                break;
            default:
                bestMove = this.getBestMove();
        }
        
        if (bestMove !== null) {
            this.audioGen.play('place');
            this.makeMove(bestMove, this.currentPlayer);
            this.cells[bestMove].classList.add('ai-move');
            
            if (!this.gameActive) return;
            
            this.updateTurnIndicator();
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
                const score = this.minimax(this.gameBoard, 0, false, this.humanPlayer);
                this.gameBoard[index] = '';
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = index;
                }
            }
        });
        
        return bestMove;
    }
    
    minimax(board, depth, isMaximizing, humanPlayer) {
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
        
        const aiPlayer = isMaximizing ? 'O' : 'X';
        
        if (isMaximizing) {
            let bestScore = -Infinity;
            board.forEach((cell, index) => {
                if (cell === '') {
                    board[index] = aiPlayer;
                    const score = this.minimax(board, depth + 1, false, humanPlayer);
                    board[index] = '';
                    bestScore = Math.max(score, bestScore);
                }
            });
            return bestScore;
        } else {
            let bestScore = Infinity;
            board.forEach((cell, index) => {
                if (cell === '') {
                    board[index] = aiPlayer;
                    const score = this.minimax(board, depth + 1, true, humanPlayer);
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
        this.closeGameOver();
        
        this.gameBoard = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = true;
        this.currentPlayer = this.humanPlayer;
        this.moveHistory = [];
        
        // Clear board UI
        this.cells.forEach(cell => {
            cell.classList.remove('occupied', 'x', 'o', 'win', 'ai-move', 'hint');
        });
        
        this.winLine.style.display = 'none';
        this.updateTurnIndicator();
        this.startTimer();
    }
    
    undoMove() {
        if (this.moveHistory.length === 0 || !this.gameActive) return;
        
        // Remove last move
        const lastMove = this.moveHistory.pop();
        this.gameBoard[lastMove.index] = '';
        
        // Update UI
        const cell = this.cells[lastMove.index];
        cell.classList.remove('occupied', 'x', 'o', 'win', 'ai-move', 'hint');
        
        // Switch player back
        this.currentPlayer = lastMove.player;
        this.gameActive = true;
        this.updateTurnIndicator();
        
        this.audioGen.play('click');
    }
    
    showHint() {
        if (!this.gameActive || this.currentPlayer !== this.humanPlayer) return;
        
        // Find all possible winning moves
        const winningMoves = [];
        const blockingMoves = [];
        const centerMove = [];
        const cornerMoves = [];
        const edgeMoves = [];
        
        this.gameBoard.forEach((cell, index) => {
            if (cell === '') {
                // Check if this move wins
                this.gameBoard[index] = this.humanPlayer;
                if (this.checkTerminalWin(this.gameBoard, this.humanPlayer)) {
                    winningMoves.push(index);
                }
                this.gameBoard[index] = '';
                
                // Check if this move blocks AI
                this.gameBoard[index] = this.currentPlayer === 'X' ? 'O' : 'X';
                if (this.checkTerminalWin(this.gameBoard, this.currentPlayer === 'X' ? 'O' : 'X')) {
                    blockingMoves.push(index);
                }
                this.gameBoard[index] = '';
                
                // Categorize moves
                if (index === 4) {
                    centerMove.push(index);
                } else if ([0, 2, 6, 8].includes(index)) {
                    cornerMoves.push(index);
                } else {
                    edgeMoves.push(index);
                }
            }
        });
        
        // Prioritize moves
        let hintMove;
        if (winningMoves.length > 0) {
            hintMove = winningMoves[0];
        } else if (blockingMoves.length > 0) {
            hintMove = blockingMoves[0];
        } else if (centerMove.length > 0) {
            hintMove = centerMove[0];
        } else if (cornerMoves.length > 0) {
            hintMove = cornerMoves[Math.floor(Math.random() * cornerMoves.length)];
        } else if (edgeMoves.length > 0) {
            hintMove = edgeMoves[Math.floor(Math.random() * edgeMoves.length)];
        }
        
        if (hintMove !== undefined) {
            this.cells[hintMove].classList.add('hint');
            this.audioGen.play('hint');
            
            // Remove hint after 2 seconds
            setTimeout(() => {
                this.cells[hintMove].classList.remove('hint');
            }, 2000);
        }
    }
    
    updateTurnIndicator() {
        if (this.currentPlayer === this.humanPlayer) {
            this.turnIndicator.textContent = 'YOUR TURN';
            this.turnIndicator.style.color = 'var(--accent-primary)';
        } else {
            this.turnIndicator.textContent = 'AI TURN';
            this.turnIndicator.style.color = 'var(--accent-secondary)';
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToeGame();
});
