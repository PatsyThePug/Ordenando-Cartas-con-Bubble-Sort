interface Card {
    id: number;
    value: string;
    suit: string;
}

interface CardGenerationOptions {
    count: number;
}

interface SortOptions {
    order: 'ascending' | 'descending';
}

type CardList = Card[];