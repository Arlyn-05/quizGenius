
import { FileText, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type FlashcardSet = {
  id: number;
  title: string;
  cards: number;
  lastStudied: string;
};

type FlashcardListProps = {
  flashcardSets: FlashcardSet[];
  savedFlashcards: FlashcardSet[];
  onSelectSet: (id: number) => void;
  onCreateNew: () => void;
};

export const FlashcardList = ({ 
  flashcardSets, 
  savedFlashcards, 
  onSelectSet, 
  onCreateNew 
}: FlashcardListProps) => {
  const allFlashcards = [...flashcardSets, ...savedFlashcards];

  const deleteFlashcardSet = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    
    // Check if it's a default flashcard set
    const isDefaultSet = flashcardSets.some(set => set.id === id);
    if (isDefaultSet) {
      toast({
        title: "Cannot Delete Default Flashcards",
        description: "Default flashcard sets cannot be deleted.",
        variant: "destructive"
      });
      return;
    }
    
    // Get saved flashcards from localStorage
    const savedFlashcards = JSON.parse(localStorage.getItem('studygenius_flashcards') || '[]');
    
    // Filter out the flashcard set to delete
    const updatedFlashcards = savedFlashcards.filter(set => set.id !== id);
    
    // Save the updated flashcards back to localStorage
    localStorage.setItem('studygenius_flashcards', JSON.stringify(updatedFlashcards));
    
    // Update the UI state
    const currentFlashcardSets = parseInt(localStorage.getItem('studygenius_flashcardSets') || '0');
    if (currentFlashcardSets > 0) {
      localStorage.setItem('studygenius_flashcardSets', (currentFlashcardSets - 1).toString());
    }
    
    // Show success toast
    toast({
      title: "Flashcard Set Deleted",
      description: "The flashcard set has been successfully deleted."
    });
    
    // Refresh UI
    window.dispatchEvent(new Event('studygenius_stats_updated'));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Flashcards</h1>
        <button 
          className="flex items-center gap-2 bg-studygenius-teal text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
          onClick={onCreateNew}
        >
          <Plus className="h-5 w-5" />
          <span>Create Flashcards</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allFlashcards.map((set) => (
          <div 
            key={set.id}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow dark:bg-gray-800 dark:border dark:border-gray-700 relative"
            onClick={() => onSelectSet(set.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <FileText className="h-8 w-8 text-studygenius-teal" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">{set.cards} cards</span>
                
                {!flashcardSets.some(fs => fs.id === set.id) && (
                  <button 
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    onClick={(e) => deleteFlashcardSet(set.id, e)}
                    aria-label="Delete flashcard set"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">{set.title}</h3>
            <p className="text-gray-500 text-sm dark:text-gray-400">Last studied: {set.lastStudied}</p>
          </div>
        ))}
      </div>
    </>
  );
};

import { Plus } from "lucide-react";
