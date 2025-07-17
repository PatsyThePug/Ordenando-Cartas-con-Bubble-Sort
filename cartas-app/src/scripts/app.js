// app.js

const cardContainer = document.getElementById('card-container');
const drawButton = document.getElementById('draw-button');
const sortButton = document.getElementById('sort-button');
const cardCountInput = document.getElementById('card-count');

let cards = [];
let history = [];

// Function to generate random cards
function generateRandomCards(count) {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    cards = [];

    for (let i = 0; i < count; i++) {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const value = values[Math.floor(Math.random() * values.length)];
        cards.push({ value, suit });
    }

    renderCards();
}

// Function to render cards in the HTML
function renderCards() {
    cardContainer.innerHTML = '';
    cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardContainer.appendChild(cardElement);
    });
}

// Function to create HTML for a single card
function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerText = `${card.value} of ${card.suit}`;
    return cardDiv;
}

// Bubble sort algorithm to sort cards
function bubbleSort(cards) {
    const sortedCards = [...cards];
    for (let i = 0; i < sortedCards.length - 1; i++) {
        for (let j = 0; j < sortedCards.length - 1 - i; j++) {
            if (sortedCards[j].value > sortedCards[j + 1].value) {
                [sortedCards[j], sortedCards[j + 1]] = [sortedCards[j + 1], sortedCards[j]];
            }
        }
        history.push([...sortedCards]); // Save the state after each pass
    }
    return sortedCards;
}

// Event listeners for buttons
drawButton.addEventListener('click', () => {
    const count = parseInt(cardCountInput.value);
    if (!isNaN(count) && count > 0) {
        generateRandomCards(count);
    }
});

sortButton.addEventListener('click', () => {
    const sortedCards = bubbleSort(cards);
    cards = sortedCards;
    renderCards();
    console.log(history); // Log the history of changes
});