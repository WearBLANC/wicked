class UIController {
    constructor() {
        this.desktop = document.getElementById('desktop');
        this.taskbar = document.getElementById('taskbar');
        this.initializeDesktop();
        this.initializeTaskbar();
        this.achievementsUnlocked = {};
        this.unlockAchievement('Wicked');
    }

    unlockAchievement(name) {
        if (!this.achievementsUnlocked[name]) {
            this.achievementsUnlocked[name] = true;

            const notification = document.createElement('div');
            notification.className = 'achievement-notification';
            notification.innerHTML = `
                <img src="assets/images/achievements/Wicked.png" alt="${name}">
            `;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 5000);
        }
    }

    initializeDesktop() {
        const icons = [
            { name: 'Lixo', image: 'thick_of_it.png' },
            { name: 'Importante', image: 'importantes.png' },
            { name: 'Wicked', image: 'wicked.png' },
            { name: 'Uabo', image: 'Uabo.png' }
        ];

        icons.forEach(icon => {
            const iconElement = document.createElement('div');
            iconElement.className = 'desktop-icon';
            iconElement.innerHTML = `
                <img src="assets/images/icons/${icon.image}" alt="${icon.name}">
                <span>${icon.name}</span>
            `;
            iconElement.addEventListener('click', () => {
                this.playClickSound();
                if (icon.name === 'Wicked') this.showChromePopup();
                if (icon.name === 'Uabo') this.showAchievementsPopup();
            });
            this.desktop.appendChild(iconElement);
        });
    }

    initializeTaskbar() {
        const leftSideIcons = [
            { name: 'Windows', image: 'windoh.png' },
            { name: 'File Explorer', image: 'file_explorer.png' },
            { name: 'Chrome', image: 'wicked.png' }
        ];

        const rightSideIcons = [
            { name: 'Brightness', image: 'brightness.png' },
            { name: 'WiFi', image: 'wifi.png' },
            { name: 'Sound', image: 'sound.png' }
        ];

        const leftSide = document.createElement('div');
        leftSide.className = 'taskbar-left';

        leftSideIcons.forEach(icon => {
            const iconElement = this.createTaskbarIcon(icon);
            leftSide.appendChild(iconElement);
        });

        const rightSide = document.createElement('div');
        rightSide.className = 'taskbar-right';

        rightSideIcons.forEach(icon => {
            const iconElement = this.createTaskbarIcon(icon);
            if (icon.name === 'Brightness') {
                console.log('Adicionando listener de brilho');
                iconElement.addEventListener('click', () => {
                    console.log('Ícone de brilho clicado');
                    this.showBrightnessControl();
                });
            } else if (icon.name === 'Sound') {
                console.log('Adicionando listener de som');
                iconElement.addEventListener('click', () => {
                    console.log('Ícone de som clicado');
                    this.showVolumeControl();
                });
            }
            rightSide.appendChild(iconElement);
        });

        const clock = document.createElement('div');
        clock.id = 'clock';

        rightSide.appendChild(clock);

        this.taskbar.appendChild(leftSide);
        this.taskbar.appendChild(rightSide);

        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    createTaskbarIcon(icon) {
        const iconElement = document.createElement('div');
        iconElement.className = 'taskbar-icon';
        iconElement.innerHTML = `<img src="assets/images/icons/${icon.image}" alt="${icon.name}">`;
        iconElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.playClickSound();
        });
        return iconElement;
    }

    playClickSound() {
        const clickSound = new Audio('assets/audio/effects/open.mp3');
        clickSound.volume = 0.1;
        clickSound.play().catch(error => console.log('Erro ao reproduzir o som:', error));
    }

    updateClock() {
        const clock = document.getElementById('clock');
        const now = new Date();
        clock.textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

    showBrightnessControl() {
        console.log('Criando controle de brilho');
        const brightnessControl = document.createElement('div');
        brightnessControl.className = 'control-popup';
        brightnessControl.id = 'brightness-control';
        brightnessControl.innerHTML = `
            <input type="range" min="0" max="100" value="100" class="slider" id="brightnessSlider">
            <label for="brightnessSlider">Opacidade do Fundo</label>
        `;
        document.body.appendChild(brightnessControl);
        console.log('Controle de brilho adicionado ao DOM');

        const slider = brightnessControl.querySelector('#brightnessSlider');
        slider.addEventListener('input', (e) => {
            const opacity = e.target.value / 100;
            this.desktop.style.opacity = opacity;
            console.log('Opacidade ajustada para:', opacity);
        });

        setTimeout(() => {
            document.addEventListener('click', (e) => {
                if (!brightnessControl.contains(e.target) && !e.target.closest('.taskbar-icon')) {
                    document.body.removeChild(brightnessControl);
                    console.log('Controle de brilho removido');
                }
            }, { once: true });
        }, 0);
    }

    showVolumeControl() {
        console.log('Criando controle de volume');
        const volumeControl = document.createElement('div');
        volumeControl.className = 'control-popup';
        volumeControl.id = 'volume-control';
        volumeControl.innerHTML = `
            <input type="range" min="0" max="100" value="50" class="slider" id="volumeSlider">
            <label for="volumeSlider">Volume</label>
        `;
        document.body.appendChild(volumeControl);
        console.log('Controle de volume adicionado ao DOM');

        const slider = volumeControl.querySelector('#volumeSlider');
        slider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            console.log('Volume ajustado para:', volume);
        });

        setTimeout(() => {
            document.addEventListener('click', (e) => {
                if (!volumeControl.contains(e.target) && !e.target.closest('.taskbar-icon')) {
                    document.body.removeChild(volumeControl);
                    console.log('Controle de volume removido');
                }
            }, { once: true });
        }, 0);
    }

    showChromePopup() {
        const chromePopup = document.createElement('div');
        chromePopup.className = 'chrome-popup';
        chromePopup.innerHTML = `
            <div class="chrome-header">
                <div class="chrome-controls">
                    <span class="chrome-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</span>
                    <span class="chrome-minimize">–</span>
                    <span class="chrome-maximize">☐</span>
                </div>
                <input type="text" class="chrome-address-bar" value="https://discord.gg/PrUCrBATea" readonly>
            </div>
            <div class="chrome-content">
                <iframe src="invite/main.html" frameborder="0" width="100%" height="100%"></iframe>
            </div>
        `;
        document.body.appendChild(chromePopup);

        let offsetX = 0;
        let offsetY = 0;
        let isDragging = false;

        const header = chromePopup.querySelector('.chrome-header');

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - chromePopup.offsetLeft;
            offsetY = e.clientY - chromePopup.offsetTop;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                chromePopup.style.left = `${e.clientX - offsetX}px`;
                chromePopup.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    showAchievementsPopup() {
        const achievements = [
            {
                image: 'achievement1.png',
                title: 'Wicked',
                description: 'Conquistado por seres infetado!'
            },
            {
                image: 'achievement2.png',
                title: 'Explorador',
                description: 'Conquistado por explorar todas as funcionalidades.'
            },
            {
                image: 'achievement3.png',
                title: 'Mestre',
                description: 'Conquistado por completar todas as tarefas do Uabo.'
            }
        ];

        const achievementsPopup = document.createElement('div');
        achievementsPopup.className = 'achievements-popup';
        achievementsPopup.innerHTML = `
            <div class="achievements-header">
                <span>Achievements</span>
                <span class="close-button" onclick="this.parentElement.parentElement.remove()">×</span>
            </div>
            <div class="achievements-content">
                ${achievements.map(achievement => `
                    <div class="achievement">
                        <img src="assets/images/achievements/${achievement.image}" alt="${achievement.title}">
                        <div class="achievement-info">
                            <h3>${achievement.title}</h3>
                            <p>${achievement.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        document.body.appendChild(achievementsPopup);

        let offsetX = 0;
        let offsetY = 0;
        let isDragging = false;

        const header = achievementsPopup.querySelector('.achievements-header');

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - achievementsPopup.offsetLeft;
            offsetY = e.clientY - achievementsPopup.offsetTop;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                achievementsPopup.style.left = `${e.clientX - offsetX}px`;
                achievementsPopup.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
}