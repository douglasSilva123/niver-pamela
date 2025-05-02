document.addEventListener('DOMContentLoaded', () => {
    // Configurações
    const difficulties = {
        easy: { 
            pairs: 4, 
            grid: 'repeat(4, 1fr)', 
            message: "Até eu conseguiria! Mas você foi bem 😊" 
        },
        medium: { 
            pairs: 6, 
            grid: 'repeat(4, 1fr)', 
            message: "Você está indo muito bem! Continue assim! 😁" 
        },
        hard: { 
            pairs: 8, 
            grid: 'repeat(4, 1fr)', 
            message: "NÍVEL PROFISSIONAL! Acho que você precisa de um pouco mais de treino! 😅" 
        }
    };

    // Elementos
    const memoryBoard = document.getElementById('memoryBoard');
    const memoryResult = document.getElementById('memoryResult');
    const resultMessage = memoryResult.querySelector('.result-message');
    const statsDisplay = memoryResult.querySelector('.stats');
    const timerDisplay = document.querySelector('.timer');
    const movesDisplay = document.querySelector('.moves');
    const difficultyButtons = document.querySelectorAll('.difficulty-buttons button');
    const playAgainBtn = document.getElementById('playAgain');

    // Variáveis do jogo
    let cards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let timer;
    let seconds = 0;
    let matchedPairs = 0;
    let currentDifficulty;

    const emojis = ['😹', '😍', '🎂', '🎁', '⚽', '💙', '🐶', '👻'];

    // Iniciar jogo
    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentDifficulty = button.dataset.difficulty;
            startGame(difficulties[currentDifficulty]);
        });
    });

    playAgainBtn.addEventListener('click', () => {
        memoryResult.style.display = 'none';
        startGame(difficulties[currentDifficulty]);
    });

    function startGame(difficulty) {
        // Resetar jogo
        document.querySelector('#memoryGame .game-intro').style.display = 'none';
        document.querySelector('.memory-game').style.display = 'block';
        memoryResult.style.display = 'none';
        
        // Configurar tabuleiro
        memoryBoard.style.gridTemplateColumns = difficulty.grid;
        memoryBoard.innerHTML = '';
        
        // Criar cartas
        const selectedEmojis = emojis.slice(0, difficulty.pairs);
        cards = [...selectedEmojis, ...selectedEmojis];
        cards = shuffleArray(cards);
        
        cards.forEach(emoji => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            
            card.innerHTML = `
                <div class="front-face card-face">${emoji}</div>
                <div class="back-face card-face">?</div>
            `;
            
            card.addEventListener('click', flipCard);
            memoryBoard.appendChild(card);
        });
        
        // Iniciar contadores
        moves = 0;
        matchedPairs = 0;
        seconds = 0;
        movesDisplay.textContent = `${moves} jogadas`;
        updateTimer();
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);
    }

    function flipCard() {
        if (lockBoard || this === firstCard || this.classList.contains('matched')) return;

        this.classList.add('flipped');
        
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        secondCard = this;
        moves++;
        movesDisplay.textContent = `${moves} jogada${moves > 1 ? 's' : ''}`;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.querySelector('.front-face').textContent === 
                       secondCard.querySelector('.front-face').textContent;
        
        if (isMatch) {
            disableCards();
            checkGameOver();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        
        firstCard.classList.add('wrong');
        secondCard.classList.add('wrong');
        
        setTimeout(() => {
            firstCard.classList.remove('flipped', 'wrong');
            secondCard.classList.remove('flipped', 'wrong');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function checkGameOver() {
        if (matchedPairs === difficulties[currentDifficulty].pairs) {
            clearInterval(timer);
            
            // Mensagem personalizada
            resultMessage.textContent = difficulties[currentDifficulty].message;
            statsDisplay.textContent = `Tempo: ${formatTime(seconds)} | Jogadas: ${moves}`;
            
            
            memoryResult.style.display = 'block';
        }
    }

    function updateTimer() {
        seconds++;
        timerDisplay.textContent = formatTime(seconds);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    document.getElementById('changeDifficulty').addEventListener('click', () => {
        clearInterval(timer);
        document.querySelector('.memory-game').style.display = 'none';
        document.querySelector('#memoryGame .game-intro').style.display = 'block';
        memoryResult.style.display = 'none';
    });
    
});


