
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type FlashcardCreatorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const FlashcardCreator = ({ open, onOpenChange }: FlashcardCreatorProps) => {
  const [newSetTitle, setNewSetTitle] = useState("");
  const [contentForFlashcards, setContentForFlashcards] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Function to generate concise Q&A flashcards from content
  const generateQAFlashcards = (content: string): { front: string, back: string }[] => {
    // Split content into paragraphs
    const paragraphs = content
      .split(/\n+/)
      .filter(p => p.trim().length > 30)
      .map(p => p.trim());
    
    const flashcards: { front: string, back: string }[] = [];
    
    // Process each paragraph to generate a Q&A pair
    paragraphs.forEach(paragraph => {
      // Skip headers, very short paragraphs or bullet points
      if (paragraph.startsWith('#') || paragraph.length < 30 || paragraph.startsWith('- ')) {
        return;
      }
      
      // Extract key concepts from the paragraph
      const sentences = paragraph.split(/\.|\?|\!/).filter(s => s.trim().length > 15);
      if (sentences.length === 0) return;
      
      const mainSentence = sentences[0].trim();
      const keyTerms = extractKeyTerms(mainSentence);
      
      if (keyTerms.length > 0) {
        // Create question based on key terms
        const question = generateQuestion(mainSentence, keyTerms[0]);
        
        // Create a completely different answer that doesn't repeat the question
        const answer = createConciseAnswer(paragraph, keyTerms[0]);
        
        // Only add if the answer is different from the question and not too long
        if (answer !== question && answer.length <= 200) {
          flashcards.push({
            front: question,
            back: answer
          });
        }
      }
    });
    
    return flashcards;
  };
  
  // Helper function to extract important terms from text
  const extractKeyTerms = (text: string): string[] => {
    // Words to ignore in key term extraction
    const stopWords = new Set([
      "the", "a", "an", "and", "in", "on", "at", "to", "for", "with", "by", "about", 
      "as", "of", "that", "this", "these", "those", "is", "are", "was", "were", "be",
      "have", "has", "had", "do", "does", "did", "will", "would", "should", "could",
      "can", "may", "might", "must", "shall"
    ]);
    
    // Split text into words, filter out short words and stop words
    const words = text.split(/\s+/)
      .map(w => w.toLowerCase().replace(/[^\w]/g, ""))
      .filter(w => w.length > 3 && !stopWords.has(w));
    
    // Count word frequency
    const wordCount = new Map<string, number>();
    words.forEach(word => {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    });
    
    // Sort by frequency and return top terms
    return Array.from(wordCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([term]) => term);
  };
  
  // Generate a question from text and key term
  const generateQuestion = (text: string, term: string): string => {
    // Different question templates
    const templates = [
      `What is the significance of ${term}?`,
      `How would you define ${term}?`,
      `What are the key characteristics of ${term}?`,
      `Explain the concept of ${term}.`,
      `What role does ${term} play in this context?`
    ];
    
    // Return a random template
    return templates[Math.floor(Math.random() * templates.length)];
  };
  
  // Create a concise answer from the text that doesn't repeat the question
  const createConciseAnswer = (text: string, term: string): string => {
    // Find sentences containing the term
    const sentences = text.split(/\.|\?|\!/).map(s => s.trim()).filter(s => s.length > 0);
    const relevantSentences = sentences.filter(s => 
      s.toLowerCase().includes(term.toLowerCase())
    );
    
    // If we found relevant sentences, use the most informative one
    let answer = "";
    if (relevantSentences.length > 0) {
      // Sort by length (assuming longer sentences have more information)
      const sorted = relevantSentences.sort((a, b) => b.length - a.length);
      answer = sorted[0] + ".";
    } else if (sentences.length > 0) {
      // If no sentences contain the term, use the most informative sentence
      const sorted = sentences.sort((a, b) => b.length - a.length);
      answer = sorted[0] + ".";
    }
    
    // Ensure the answer is concise (max 200 characters)
    if (answer.length > 200) {
      answer = answer.substring(0, 197) + "...";
    }
    
    return answer;
  };

  const handleCreateFlashcards = () => {
    if (!newSetTitle.trim()) {
      toast({
        title: "Missing Title",
        description: "Please provide a title for your flashcard set.",
        variant: "destructive"
      });
      return;
    }
    
    if (!contentForFlashcards.trim()) {
      toast({
        title: "Missing Content",
        description: "Please provide content to generate flashcards from.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Generate flashcards
    setTimeout(() => {
      try {
        const generatedFlashcards = generateQAFlashcards(contentForFlashcards);
        
        if (generatedFlashcards.length === 0) {
          toast({
            title: "No Flashcards Generated",
            description: "The content provided didn't yield any flashcards. Try adding more detailed content.",
            variant: "destructive"
          });
          setIsGenerating(false);
          return;
        }
        
        // Create new flashcard set
        const newSet = {
          id: Date.now(),
          title: newSetTitle,
          cards: generatedFlashcards.length,
          lastStudied: "Just now",
          flashcards: generatedFlashcards
        };
        
        // Save to localStorage
        const savedFlashcards = JSON.parse(localStorage.getItem('studygenius_flashcards') || '[]');
        localStorage.setItem('studygenius_flashcards', JSON.stringify([...savedFlashcards, newSet]));
        
        // Update flashcard sets count
        const currentFlashcardSets = parseInt(localStorage.getItem('studygenius_flashcardSets') || '0');
        localStorage.setItem('studygenius_flashcardSets', (currentFlashcardSets + 1).toString());
        
        // Reset state and close dialog
        setNewSetTitle("");
        setContentForFlashcards("");
        onOpenChange(false);
        setIsGenerating(false);
        
        // Show success message
        toast({
          title: "Flashcards Created",
          description: `Successfully created ${generatedFlashcards.length} Q&A flashcards.`
        });
        
        // Refresh the page to show new flashcards
        window.dispatchEvent(new Event('studygenius_stats_updated'));
        
      } catch (error) {
        console.error("Error generating flashcards:", error);
        toast({
          title: "Error",
          description: "Failed to generate flashcards. Please try again.",
          variant: "destructive"
        });
        setIsGenerating(false);
      }
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">Create Q&A Flashcards</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Flashcard Set Title</Label>
            <Input 
              id="title" 
              placeholder="Enter a title for your flashcard set"
              value={newSetTitle}
              onChange={(e) => setNewSetTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content for Flashcards</Label>
            <Textarea
              id="content"
              placeholder="Paste your study content here to generate Q&A flashcards..."
              className="min-h-[200px]"
              value={contentForFlashcards}
              onChange={(e) => setContentForFlashcards(e.target.value)}
            />
            <p className="text-sm text-gray-500">
              Paste paragraphs of text to generate concise question and answer flashcards.
              For best results, use detailed content with clear concepts.
            </p>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isGenerating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateFlashcards}
            disabled={isGenerating || !newSetTitle.trim() || !contentForFlashcards.trim()}
            className="bg-studygenius-teal hover:bg-teal-700"
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              'Generate Flashcards'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
