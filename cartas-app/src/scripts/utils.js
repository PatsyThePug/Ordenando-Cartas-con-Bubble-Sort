function createCardHTML(card) {
    return `
        <div class="card">
            <h2>${card.title}</h2>
            <p>${card.description}</p>
        </div>
    `;
}

function bubbleSort(cards) {
    let sortedCards = [...cards];
    let n = sortedCards.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (sortedCards[i].title > sortedCards[i + 1].title) {
                [sortedCards[i], sortedCards[i + 1]] = [sortedCards[i + 1], sortedCards[i]];
                swapped = true;
            }
        }
        n--;
    } while (swapped);

    return sortedCards;
}

export { createCardHTML, bubbleSort };