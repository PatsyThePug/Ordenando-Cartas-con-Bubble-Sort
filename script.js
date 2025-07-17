class BubbleSortVisualizer {
    constructor() {
        this.cards = [];
        this.originalCards = [];
        this.isSorting = false;
        this.sortingSpeed = 1000; // milliseconds
        this.swapCount = 0;
        this.comparisonCount = 0;
        
        this.initializeElements();
        this.attachEventListeners();
        this.generateInitialCards();
    }

    initializeElements() {
        this.cardCountInput = document.getElementById('cardCount');
        this.drawBtn = document.getElementById('drawBtn');
        this.sortBtn = document.getElementById('sortBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.cardsContainer = document.getElementById('cardsContainer');
        this.bubbleLog = document.getElementById('bubbleLog');
    }

    attachEventListeners() {
        this.drawBtn.addEventListener('click', () => this.generateCards());
        this.sortBtn.addEventListener('click', () => this.startBubbleSort());
        this.resetBtn.addEventListener('click', () => this.resetToOriginal());
        
        // Allow Enter key to generate cards
        this.cardCountInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.generateCards();
            }
        });
    }

    generateInitialCards() {
        this.generateCards();
    }

    generateCards() {
        const count = parseInt(this.cardCountInput.value);
        
        // Validate input
        if (isNaN(count) || count < 2 || count > 20) {
            this.showError('Por favor ingresa un número entre 2 y 20');
            return;
        }

        // Generate random unique numbers
        this.cards = [];
        const numbers = new Set();
        
        while (numbers.size < count) {
            numbers.add(Math.floor(Math.random() * 100) + 1);
        }
        
        this.cards = Array.from(numbers);
        this.originalCards = [...this.cards];
        this.swapCount = 0;
        this.comparisonCount = 0;
        
        this.renderCards();
        this.clearLog();
        this.updateButtonStates();
        
        this.logMessage(`Generadas ${count} cartas aleatorias: [${this.cards.join(', ')}]`, 'info');
    }

    renderCards() {
        this.cardsContainer.innerHTML = '';
        
        this.cards.forEach((number, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card-item';
            cardElement.textContent = number;
            cardElement.dataset.index = index;
            cardElement.dataset.value = number;
            this.cardsContainer.appendChild(cardElement);
        });
    }

    async startBubbleSort() {
        if (this.isSorting) return;
        
        this.isSorting = true;
        this.updateButtonStates();
        
        this.logMessage('Iniciando algoritmo Bubble Sort...', 'info');
        this.logMessage('═══════════════════════════════════════', 'info');
        
        await this.bubbleSort();
        
        this.logMessage('═══════════════════════════════════════', 'complete');
        this.logMessage(`¡Ordenamiento completado! Intercambios: ${this.swapCount}, Comparaciones: ${this.comparisonCount}`, 'complete');
        
        this.markAllAsSorted();
        this.isSorting = false;
        this.updateButtonStates();
    }

    async bubbleSort() {
        const n = this.cards.length;
        
        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            this.logMessage(`Pasada ${i + 1}:`, 'info');
            
            for (let j = 0; j < n - i - 1; j++) {
                // Highlight comparison
                await this.highlightComparison(j, j + 1);
                this.comparisonCount++;
                
                this.logMessage(`  Comparando ${this.cards[j]} y ${this.cards[j + 1]}`, 'compare');
                
                if (this.cards[j] > this.cards[j + 1]) {
                    // Swap elements
                    await this.swapElements(j, j + 1);
                    [this.cards[j], this.cards[j + 1]] = [this.cards[j + 1], this.cards[j]];
                    swapped = true;
                    this.swapCount++;
                    
                    this.logMessage(`  ✓ Intercambiando ${this.cards[j + 1]} ↔ ${this.cards[j]}`, 'swap');
                } else {
                    this.logMessage(`  ✗ Sin intercambio necesario`, 'compare');
                }
                
                // Remove highlighting
                await this.removeHighlighting();
            }
            
            // Mark the last element as sorted
            this.markAsSorted(n - i - 1);
            
            if (!swapped) {
                this.logMessage(`  Array ya está ordenado, terminando temprano.`, 'complete');
                break;
            }
        }
        
        // Mark first element as sorted
        this.markAsSorted(0);
    }

    async highlightComparison(index1, index2) {
        const cards = this.cardsContainer.children;
        cards[index1].classList.add('comparing');
        cards[index2].classList.add('comparing');
        
        await this.sleep(this.sortingSpeed / 3);
    }

    async swapElements(index1, index2) {
        const cards = this.cardsContainer.children;
        const card1 = cards[index1];
        const card2 = cards[index2];
        
        // Add swapping animation
        card1.classList.remove('comparing');
        card2.classList.remove('comparing');
        card1.classList.add('swapping');
        card2.classList.add('swapping');
        
        await this.sleep(this.sortingSpeed / 2);
        
        // Actually swap the text content
        const tempText = card1.textContent;
        card1.textContent = card2.textContent;
        card2.textContent = tempText;
        
        // Update dataset values
        const tempValue = card1.dataset.value;
        card1.dataset.value = card2.dataset.value;
        card2.dataset.value = tempValue;
        
        await this.sleep(this.sortingSpeed / 2);
        
        card1.classList.remove('swapping');
        card2.classList.remove('swapping');
    }

    async removeHighlighting() {
        const cards = this.cardsContainer.children;
        Array.from(cards).forEach(card => {
            card.classList.remove('comparing');
        });
        
        await this.sleep(this.sortingSpeed / 4);
    }

    markAsSorted(index) {
        const cards = this.cardsContainer.children;
        if (cards[index]) {
            cards[index].classList.add('sorted');
        }
    }

    markAllAsSorted() {
        const cards = this.cardsContainer.children;
        Array.from(cards).forEach(card => {
            card.classList.add('sorted');
        });
    }

    resetToOriginal() {
        if (this.isSorting) return;
        
        this.cards = [...this.originalCards];
        this.swapCount = 0;
        this.comparisonCount = 0;
        
        this.renderCards();
        this.clearLog();
        this.updateButtonStates();
        
        this.logMessage('Restablecido al estado original', 'info');
        this.logMessage(`Cartas originales: [${this.originalCards.join(', ')}]`, 'info');
    }

    updateButtonStates() {
        this.drawBtn.disabled = this.isSorting;
        this.sortBtn.disabled = this.isSorting || this.cards.length === 0;
        this.resetBtn.disabled = this.isSorting || this.originalCards.length === 0;
        
        if (this.isSorting) {
            this.sortBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Ordenando...';
        } else {
            this.sortBtn.innerHTML = '<i class="fas fa-sort me-1"></i>Sort';
        }
    }

    logMessage(message, type = 'info') {
        // Clear empty state message if it exists
        if (this.bubbleLog.querySelector('.text-muted')) {
            this.bubbleLog.innerHTML = '';
        }
        
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        
        // Add icons based on type
        let icon = '';
        switch (type) {
            case 'swap':
                icon = '<i class="fas fa-exchange-alt me-2"></i>';
                break;
            case 'compare':
                icon = '<i class="fas fa-search me-2"></i>';
                break;
            case 'complete':
                icon = '<i class="fas fa-check-circle me-2"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-triangle me-2"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle me-2"></i>';
        }
        
        logEntry.innerHTML = icon + message;
        this.bubbleLog.appendChild(logEntry);
        
        // Auto-scroll to bottom
        this.bubbleLog.scrollTop = this.bubbleLog.scrollHeight;
    }

    clearLog() {
        this.bubbleLog.innerHTML = '<div class="text-muted text-center py-3"><i class="fas fa-info-circle me-2"></i>Genera cartas y presiona "Sort" para ver el proceso paso a paso</div>';
    }

    showError(message) {
        this.logMessage(`Error: ${message}`, 'error');
        
        // Highlight the input field
        this.cardCountInput.classList.add('is-invalid');
        setTimeout(() => {
            this.cardCountInput.classList.remove('is-invalid');
        }, 3000);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BubbleSortVisualizer();
});

// Add some utility functions for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    document.getElementById('drawBtn').click();
                    break;
                case ' ':
                    e.preventDefault();
                    document.getElementById('sortBtn').click();
                    break;
                case 'r':
                    e.preventDefault();
                    document.getElementById('resetBtn').click();
                    break;
            }
        }
    });
    
    // Add page title animation
    const title = document.querySelector('h1');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            title.style.transition = 'all 0.6s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 100);
    }
});