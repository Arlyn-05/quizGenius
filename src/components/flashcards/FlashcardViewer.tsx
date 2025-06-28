
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type Flashcard = {
  front: string;
  back: string;
};

type FlashcardViewerProps = {
  title: string;
  cards: Flashcard[];
  onBack: () => void;
};

export const FlashcardViewer = ({ title, cards, onBack }: FlashcardViewerProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleNextCard = () => {
    setFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrevCard = () => {
    setFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div>
      <button 
        className="flex items-center gap-1 text-gray-600 mb-6 hover:text-studygenius-teal dark:text-gray-300 dark:hover:text-teal-400"
        onClick={onBack}
      >
        <ChevronLeft className="h-5 w-5" />
        <span>Back to all flashcards</span>
      </button>

      <h1 className="text-2xl font-bold mb-6 dark:text-white">{title}</h1>

      <div className="flex justify-center mb-8">
        <div 
          className="w-full max-w-lg aspect-video relative"
          onClick={() => setFlipped(!flipped)}
        >
          <div 
            className={`absolute inset-0 backface-hidden transition-transform duration-500 transform 
              ${flipped ? 'opacity-0 pointer-events-none rotate-y-180' : ''}`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="h-full bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md flex items-center justify-center p-8 cursor-pointer">
              <p className="text-xl text-center">{cards[currentCardIndex]?.front}</p>
            </div>
          </div>
          <div 
            className={`absolute inset-0 backface-hidden transition-transform duration-500 transform
              ${flipped ? '' : 'opacity-0 pointer-events-none rotate-y-180'}`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="h-full bg-studygenius-teal text-white rounded-lg shadow-md flex items-center justify-center p-8 cursor-pointer">
              <p className="text-xl text-center">{cards[currentCardIndex]?.back}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-6">
        <button 
          className="p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={handlePrevCard}
        >
          <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </button>
        <span className="text-gray-600 dark:text-gray-300">
          {currentCardIndex + 1} / {cards.length}
        </span>
        <button 
          className="p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={handleNextCard}
        >
          <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </button>
      </div>
    </div>
  );
};
