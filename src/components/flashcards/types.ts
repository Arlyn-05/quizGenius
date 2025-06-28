
export type Flashcard = {
  front: string;
  back: string;
};

export type FlashcardSet = {
  id: number;
  title: string;
  cards: number;
  lastStudied: string;
  flashcards?: Flashcard[];
};
