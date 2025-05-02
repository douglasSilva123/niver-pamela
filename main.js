document.addEventListener('DOMContentLoaded', function() {
    // Configurações
   const config = {
    balloonImages: [
        'https://i.imgur.com/blue-balloon.png',
        'https://i.imgur.com/red-balloon.png'
    ],
    confettiImages: [
        'https://i.imgur.com/confetti-heart.png',
        'https://i.imgur.com/confetti-star.png'
    ]
};

    // Elementos principais
    const presentBox = document.getElementById('presentBox');
    const boxClosed = document.getElementById('boxClosed');
    const boxOpened = document.getElementById('boxOpened');
    const effectsContainer = document.getElementById('effectsContainer');
    const birthdaySong = document.getElementById('birthdaySong');

    // Página de surpresa - criar corações flutuantes
    const heartsContainer = document.querySelector('.hearts-container');
    if (heartsContainer) {
        createHearts();
        
        // Botão de mais surpresas
        const moreSurprisesBtn = document.getElementById('moreSurprises');
        if (moreSurprisesBtn) {
            moreSurprisesBtn.addEventListener('click', function() {
                window.location.href = 'jogos.html';
            });
        }
    }

    // Evento principal - clique na caixa de presente
    if (presentBox) {
        presentBox.addEventListener('click', function() {
            // 1. Animação da caixa
            boxClosed.style.opacity = '0';
            boxClosed.style.transform = 'scale(0.5)';
            boxOpened.style.opacity = '1';
            boxOpened.style.transform = 'scale(1.1)';
            
            // 2. Criar efeitos visuais
            createEffects(effectsContainer, config);
            
            // 3. Tocar música e redirecionar
            birthdaySong.play();
            
            setTimeout(() => {
                window.location.href = 'surpresa.html';
            }, config.animationDuration);
        });
    }

    // Funções auxiliares
    function createEffects(container, config) {
        // Criar confetes
        for (let i = 0; i < 50; i++) {
            createConfetti(container, config);
        }
        
        // Criar balões
        for (let i = 0; i < 12; i++) {
            createBalloon(container, config);
        }
    }

    function createConfetti(container, config) {
        const confetti = document.createElement('img');
        confetti.src = config.confettiImages[Math.floor(Math.random() * config.confettiImages.length)];
        confetti.classList.add('confetti');
        confetti.style.width = (12 + Math.random() * 8) + 'px';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        container.appendChild(confetti);
    }

    function createBalloon(container, config) {
        const balloon = document.createElement('img');
        balloon.src = config.balloonImages[Math.floor(Math.random() * config.balloonImages.length)];
        balloon.classList.add('balloon');
        balloon.style.width = (40 + Math.random() * 30) + 'px';
        balloon.style.left = Math.random() * 80 + 10 + '%';
        balloon.style.animationDuration = (4 + Math.random() * 3) + 's';
        container.appendChild(balloon);
    }

    function createHearts() {
        const container = document.querySelector('.hearts-container');
        const heartCount = 15;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const size = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            heart.style.left = `${left}%`;
            heart.style.top = `${top}%`;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.animationDelay = `${delay}s`;
            
            container.appendChild(heart);
        }
        function checkImagePaths() {
            const imagesToCheck = [
                'assets/images/16832762.png',
                'assets/images/16832813.png',
                ...config.balloonImages,
                ...config.confettiImages
            ];
        
            imagesToCheck.forEach(img => {
                const testImg = new Image();
                testImg.onload = () => console.log(`✅ ${img} carregada`);
                testImg.onerror = () => console.error(`❌ ${img} FALHOU ao carregar`);
                testImg.src = img;
            });
        }
        
        // Execute no carregamento
        checkImagePaths();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const giftBox = document.getElementById('giftBox');
    const surpriseSound = document.getElementById('surpriseSound');
    const hiddenMessage = document.getElementById('hiddenMessage');
    
    giftBox.addEventListener('click', function() {
        // 1. Animação da caixa
        const closedImg = this.querySelector('.closed');
        const openImg = this.querySelector('.open');
        
        closedImg.style.opacity = '0';
        closedImg.style.transform = 'rotate(15deg) scale(0.8)';
        
        openImg.style.opacity = '1';
        openImg.style.transform = 'scale(1.1)';
        
        // 2. Efeito visual
        this.style.transform = 'scale(1.05)';
        this.style.filter = 'drop-shadow(0 0 25px var(--primary))';
        
        // 3. Mostrar mensagem
        setTimeout(() => {
            hiddenMessage.classList.add('show');
        }, 800);
        
        // 4. Tocar música
        surpriseSound.play();
        
        // 5. Redirecionar após 3 segundos
        setTimeout(() => {
            window.location.href = 'surpresa.html';
        }, 3000);
    });
});
// Configurações gerais
document.getElementById('homeButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});