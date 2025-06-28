
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { FlashcardList } from "@/components/flashcards/FlashcardList";
import { FlashcardViewer } from "@/components/flashcards/FlashcardViewer";
import { FlashcardCreator } from "@/components/flashcards/FlashcardCreator";
import { FlashcardSet, Flashcard } from "@/components/flashcards/types";

// Original flashcard sets data
const flashcardSets: FlashcardSet[] = [
  { id: 1, title: "Biology Chapter 1", cards: 24, lastStudied: "2 days ago" },
  { id: 2, title: "Chemistry Formulas", cards: 36, lastStudied: "Yesterday" },
  { id: 3, title: "History Key Dates", cards: 18, lastStudied: "5 days ago" },
  { id: 4, title: "Programming Concepts", cards: 42, lastStudied: "1 week ago" },
  { id: 5, title: "Spanish Vocabulary", cards: 50, lastStudied: "3 days ago" },
];

// Original mock cards data
const mockCards: Flashcard[] = [
  { 
    front: "What are the key factors influencing global food security, and how do they interconnect?", 
    back: "Global food security is influenced by climate change, population growth, agricultural practices, economic inequality, and international trade policies. These factors create a complex web of relationships affecting food production, distribution, and accessibility worldwide."
  },
  { 
    front: "Analyze the relationship between environmental sustainability and economic growth in developing nations.", 
    back: "The relationship is complex, involving trade-offs between immediate economic needs and long-term environmental preservation. Sustainable development practices, renewable energy adoption, and green technologies can create new economic opportunities while protecting natural resources, though implementation challenges exist."
  },
  { 
    front: "Explain the impact of technological advancement on modern education systems and how it has transformed traditional learning methods.", 
    back: "Technological advancement has revolutionized education through digital learning platforms, interactive content, personalized learning paths, and increased accessibility. This has led to blended learning approaches, improved student engagement, and the development of new pedagogical methods that combine traditional and digital tools."
  },
];

const Flashcards = () => {
  const [currentSetId, setCurrentSetId] = useState<number | null>(null);
  const [currentCards, setCurrentCards] = useState<Flashcard[]>(mockCards);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [savedFlashcards, setSavedFlashcards] = useState<FlashcardSet[]>([]);
  const [currentSetTitle, setCurrentSetTitle] = useState<string>("");

  // Load saved flashcards from localStorage
  useEffect(() => {
    const loadSavedFlashcards = () => {
      const saved = JSON.parse(localStorage.getItem('studygenius_flashcards') || '[]');
      setSavedFlashcards(saved);
    };

    loadSavedFlashcards();

    // Listen for updates to flashcards
    window.addEventListener('studygenius_stats_updated', loadSavedFlashcards);
    
    return () => {
      window.removeEventListener('studygenius_stats_updated', loadSavedFlashcards);
    };
  }, []);

  const handleSelectSet = (id: number) => {
    setCurrentSetId(id);
    
    const allFlashcards = [...flashcardSets, ...savedFlashcards];
    const selectedSet = allFlashcards.find(set => set.id === id);
    
    if (selectedSet) {
      setCurrentSetTitle(selectedSet.title);
      if (selectedSet.flashcards && selectedSet.flashcards.length > 0) {
        setCurrentCards(selectedSet.flashcards);
      } else {
        setCurrentCards(mockCards);
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {currentSetId === null ? (
          <FlashcardList
            flashcardSets={flashcardSets}
            savedFlashcards={savedFlashcards}
            onSelectSet={handleSelectSet}
            onCreateNew={() => setShowCreateDialog(true)}
          />
        ) : (
          <FlashcardViewer
            title={currentSetTitle}
            cards={currentCards}
            onBack={() => setCurrentSetId(null)}
          />
        )}
      </div>
      
      <FlashcardCreator
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </Layout>
  );
};

export default Flashcards;
