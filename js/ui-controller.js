class UIController {
    constructor() {
        this.desktop = document.getElementById('desktop');
        this.taskbar = document.getElementById('taskbar');
        this.initializeDesktop();
        this.initializeTaskbar();
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
            iconElement.addEventListener('click', () => this.playClickSound());
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
            { name: 'Show Desktop', image: 'show-desktop.png' },
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
        iconElement.addEventListener('click', () => this.playClickSound());
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
}