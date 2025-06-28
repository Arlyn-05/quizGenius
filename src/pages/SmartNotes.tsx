
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { FileEdit, Upload, PlayCircle, Download, Mic, Lightbulb, Plus, PauseCircle, BookOpen, MessagesSquare, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SmartNotes = () => {
  const [notes, setNotes] = useState([
    { 
      id: 1, 
      title: "Cell Biology Lecture", 
      content: "The cell is the basic structural and functional unit of life. Cells are divided into two main types - prokaryotes and eukaryotes.\n\nProkaryotic cells lack a nucleus, while eukaryotic cells have a nucleus and other membrane-bound organelles. Human cells are eukaryotic.",
      dateCreated: "Apr 10, 2023",
      hasAudio: true
    },
    { 
      id: 2, 
      title: "World War II Overview", 
      content: "World War II (1939-1945) was a global conflict that involved most of the world's nations forming two opposing military alliances: the Allies and the Axis.\n\nKey events include: Pearl Harbor attack (1941), D-Day (1944), and the atomic bombings of Hiroshima and Nagasaki (1945).",
      dateCreated: "May 2, 2023",
      hasAudio: true
    },
    { 
      id: 3, 
      title: "Algebraic Expressions", 
      content: "Algebraic expressions are combinations of variables, numbers, and operations. Examples include: 2x + 3, 5y² - 2y + 1, 3(a + b).\n\nTerms are parts of an expression separated by + or - signs. Coefficients are the numbers multiplied by variables.",
      dateCreated: "Jun 15, 2023",
      hasAudio: false
    },
  ]);
  
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const navigate = useNavigate();
  const [enhancement, setEnhancement] = useState({
    formatting: false,
    grammar: false,
    content: false
  });

  useEffect(() => {
    // Initial load of notes from localStorage
    loadNotesFromStorage();
    
    // Setup event listener for notes updates
    const handleNotesUpdated = () => {
      loadNotesFromStorage();
    };
    
    window.addEventListener('studygenius_notes_updated', handleNotesUpdated);
    
    // Audio setup
    const audio = new Audio();
    setAudioElement(audio);
    
    return () => {
      window.removeEventListener('studygenius_notes_updated', handleNotesUpdated);
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, []);

  // Load notes from localStorage
  const loadNotesFromStorage = () => {
    const savedNotes = JSON.parse(localStorage.getItem('studygenius_notes') || '[]');
    
    // Filter out notes that might already be in our state (by id)
    const existingIds = notes.map(note => note.id);
    const newNotes = savedNotes.filter(note => !existingIds.includes(note.id));
    
    if (newNotes.length > 0) {
      setNotes(prev => [...prev, ...newNotes]);
      localStorage.setItem('studygenius_smartNotes', (notes.length + newNotes.length).toString());
    }
  };

  useEffect(() => {
    if (audioElement) {
      const handleEnded = () => setAudioPlaying(false);
      audioElement.addEventListener('ended', handleEnded);
      
      return () => {
        audioElement.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioElement]);

  const deleteNote = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    
    const isDefaultNote = id <= 3;
    if (isDefaultNote) {
      toast.error("Default notes cannot be deleted.");
      return;
    }
    
    setNotes(prev => prev.filter(note => note.id !== id));
    
    if (selectedNote === id) {
      setSelectedNote(null);
    }
    
    const savedNotes = JSON.parse(localStorage.getItem('studygenius_notes') || '[]');
    const updatedNotes = savedNotes.filter(note => note.id !== id);
    localStorage.setItem('studygenius_notes', JSON.stringify(updatedNotes));
    
    localStorage.setItem('studygenius_smartNotes', (notes.length - 1).toString());
    
    toast.success("The note has been successfully deleted.");
  };

  // Function to process uploaded files directly in Smart Notes
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      const file = e.target.files[0];
      let content = '';
      
      if (file.type === "text/plain") {
        content = await file.text();
      } else {
        // For non-text files, create a placeholder
        const fileTitle = file.name.split('.')[0].replace(/_/g, ' ');
        content = `Notes on ${fileTitle}\n\n` +
          `This document contains information about ${fileTitle}.\n` +
          `Key concepts include:\n\n` +
          `- Understanding the main topics in ${fileTitle}\n` +
          `- Analyzing relationships between different parts of ${fileTitle}\n` +
          `- Applying concepts from ${fileTitle} to practical situations\n` +
          `- Evaluating the significance of ${fileTitle} in its field`;
      }
      
      // Create artificial processing steps for UX
      setTimeout(() => {
        setEnhancement({
          formatting: true,
          grammar: false,
          content: false
        });
      }, 1000);
      
      setTimeout(() => {
        setEnhancement(prev => ({...prev, grammar: true}));
      }, 2000);
      
      setTimeout(() => {
        setEnhancement(prev => ({...prev, content: true}));
      }, 3000);
      
      // After "processing", add the note
      setTimeout(() => {
        const newNote = {
          id: Date.now(),
          title: file.name.split('.')[0].replace(/_/g, ' '),
          content: content,
          dateCreated: new Date().toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          hasAudio: true
        };
        
        // Add to state
        setNotes(prev => [...prev, newNote]);
        
        // Store in localStorage
        const savedNotes = JSON.parse(localStorage.getItem('studygenius_notes') || '[]');
        localStorage.setItem('studygenius_notes', JSON.stringify([...savedNotes, newNote]));
        
        // Update counter
        localStorage.setItem('studygenius_smartNotes', (notes.length + 1).toString());
        
        // Reset enhancement state and uploading state
        setIsUploading(false);
        setEnhancement({
          formatting: false,
          grammar: false,
          content: false
        });
        
        // Show success message
        toast.success(`Successfully created Smart Note: ${newNote.title}`);
        
      }, 4000);
      
    } catch (error) {
      console.error("Error processing file:", error);
      setIsUploading(false);
      setEnhancement({
        formatting: false,
        grammar: false,
        content: false
      });
      toast.error("Failed to process the file. Please try again.");
    }
  };

  const generateAudio = async (text: string) => {
    const apiKey = localStorage.getItem("studygenius_elevenLabsApiKey");
    
    if (!apiKey) {
      // Fix: Use sonner toast format instead of shadcn toast format
      toast.error("Please add your ElevenLabs API key in Settings.");
      return;
    }

    setIsLoading(true);
    
    try {
      const voice = localStorage.getItem("studygenius_voice") || "female1";
      const voiceIdMap: Record<string, string> = {
        "female1": "EXAVITQu4vr4xnSDxMaL",
        "male1": "TxGEqnHWrfWFTfGW9XjX",
        "female2": "pFZP5JQG7iQjIQuC4Bku",
        "male2": "onwK4e9ZLuTAKqWW03F9",
      };
      
      const voiceId = voiceIdMap[voice] || "EXAVITQu4vr4xnSDxMaL";
      
      const cleanTextForSpeech = (text: string) => {
        return text
          .replace(/\#/g, " ")
          .replace(/\,/g, " ")
          .replace(/\./g, " ")
          .replace(/\:/g, " ")
          .replace(/\;/g, " ")
          .replace(/\-/g, " ")
          .replace(/\*/g, " ")
          .replace(/\s+/g, " ")
          .trim();
      };
      
      const cleanedText = cleanTextForSpeech(text);
      
      console.log("Using API key:", apiKey);
      console.log("Voice ID:", voiceId);
      console.log("Text to speak:", cleanedText);
      
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text: cleanedText,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        if (response.status === 401) {
          if (errorData?.detail?.status === "detected_unusual_activity") {
            throw new Error("ElevenLabs has detected unusual activity with your API key. Their free tier may be temporarily disabled for your account. Please try using a different API key or consider upgrading to a paid plan.");
          } else {
            throw new Error("Invalid API key or authorization failed. Please check your API key in Settings.");
          }
        } else {
          throw new Error(`ElevenLabs API error: ${response.status}`);
        }
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioElement) {
        audioElement.src = audioUrl;
        audioElement.volume = parseInt(localStorage.getItem("studygenius_volume") || "80") / 100;
        audioElement.playbackRate = parseFloat(localStorage.getItem("studygenius_speechRate") || "1.0");
        
        audioElement.play();
        setAudioPlaying(true);
      }
      
    } catch (error) {
      console.error("Error generating audio:", error);
      // Fix: Use sonner toast format instead of shadcn toast format
      toast.error(error.message || "There was an error generating the audio. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAudio = (content: string) => {
    if (audioPlaying && audioElement) {
      audioElement.pause();
      setAudioPlaying(false);
    } else {
      generateAudio(content);
    }
  };

  const generateLearningMaterials = () => {
    toast.success("Creating quizzes and flashcards from your notes");
    
    if (enhancement.content) {
      localStorage.setItem("studygenius_noteContent", "Chemical Bonds: Chemical bonds are forces that hold atoms together in compounds. The three primary types of chemical bonds are: Ionic bonds, Covalent bonds, and Metallic bonds.");
      setTimeout(() => {
        navigate("/flashcards");
      }, 1000);
    } else if (selectedNote !== null) {
      const note = notes.find(n => n.id === selectedNote);
      if (note) {
        localStorage.setItem("studygenius_noteContent", note.content);
        setTimeout(() => {
          navigate("/flashcards");
        }, 1000);
      }
    }
  };

  const renderContent = () => {
    if (isUploading) {
      return (
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5 mx-auto"></div>
            </div>
            <div className="mt-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-studygenius-purple border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Enhancing your notes with AI...</p>
            </div>
          </div>
        </div>
      );
    }
    
    if (enhancement.formatting || enhancement.grammar || enhancement.content) {
      return (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Enhancing Your Notes</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Chemistry Notes</h2>
              <span className="text-sm text-gray-500">Just now</span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <div className={`h-5 w-5 rounded-full flex items-center justify-center ${enhancement.formatting ? 'bg-green-500 text-white' : 'border border-gray-300'}`}>
                  {enhancement.formatting && '✓'}
                </div>
                <span>Improving formatting</span>
                {enhancement.formatting && <span className="text-sm text-green-600">Complete</span>}
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`h-5 w-5 rounded-full flex items-center justify-center ${enhancement.grammar ? 'bg-green-500 text-white' : 'border border-gray-300'}`}>
                  {enhancement.grammar && '✓'}
                </div>
                <span>Correcting grammar and spelling</span>
                {enhancement.grammar && <span className="text-sm text-green-600">Complete</span>}
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`h-5 w-5 rounded-full flex items-center justify-center ${enhancement.content ? 'bg-green-500 text-white' : 'border border-gray-300'}`}>
                  {enhancement.content && '✓'}
                </div>
                <span>Enhancing content with additional information</span>
                {enhancement.content && <span className="text-sm text-green-600">Complete</span>}
              </div>
            </div>
            
            {enhancement.content && (
              <div>
                <h3 className="font-semibold mb-3">Enhanced Notes Preview:</h3>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <p className="mb-3"><strong>Chemical Bonds</strong></p>
                  <p className="mb-3">Chemical bonds are forces that hold atoms together in compounds. The three primary types of chemical bonds are:</p>
                  <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li><strong>Ionic bonds</strong> - Form when electrons are transferred between atoms, creating oppositely charged ions that attract each other. Example: Sodium chloride (NaCl).</li>
                    <li><strong>Covalent bonds</strong> - Form when atoms share electrons to achieve a stable electron configuration. Example: Water (H₂O).</li>
                    <li><strong>Metallic bonds</strong> - Form in metals where electron clouds are shared among a lattice of positive ions. Example: Copper (Cu).</li>
                  </ol>
                  <p className="mt-3">Bond strength is measured in kilojoules per mole (kJ/mol) and typically follows the order: ionic &gt; covalent &gt; hydrogen bonds.</p>
                </div>
                
                <div className="flex justify-end mt-4 space-x-4">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={generateLearningMaterials}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Generate Flashcards & Quizzes</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={() => toggleAudio("Chemical bonds are forces that hold atoms together in compounds. The three primary types of chemical bonds are: Ionic bonds, Covalent bonds, and Metallic bonds. Bond strength is measured in kilojoules per mole and typically follows the order: ionic, covalent, then hydrogen bonds.")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]"></div>
                    ) : audioPlaying ? (
                      <PauseCircle className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                    <span>{isLoading ? "Generating..." : audioPlaying ? "Pause Audio" : "Generate Audio"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    if (selectedNote !== null) {
      const note = notes.find(n => n.id === selectedNote)!;
      
      return (
        <div className="max-w-3xl mx-auto">
          <button 
            className="flex items-center gap-1 text-gray-600 mb-6 hover:text-studygenius-purple"
            onClick={() => setSelectedNote(null)}
          >
            &larr; Back to all notes
          </button>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <span className="text-sm text-gray-500">{note.dateCreated}</span>
            </div>
            
            <div className="prose max-w-none mb-6">
              {note.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex gap-3">
                <button 
                  className="flex items-center gap-1 text-gray-600 hover:text-studygenius-purple"
                  onClick={generateLearningMaterials}
                >
                  <MessagesSquare className="h-4 w-4" />
                  <span>Generate Quiz & Flashcards</span>
                </button>
                <button className="flex items-center gap-1 text-gray-600 hover:text-studygenius-purple">
                  <Lightbulb className="h-4 w-4" />
                  <span>Highlight Key Points</span>
                </button>
              </div>
              
              <button 
                className={`flex items-center gap-1 px-3 py-1 rounded-full ${audioPlaying ? 'bg-red-100 text-red-600' : 'bg-studygenius-purple bg-opacity-10 text-studygenius-purple'}`}
                onClick={() => toggleAudio(note.content)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]"></div>
                ) : audioPlaying ? (
                  <PauseCircle className="h-4 w-4" />
                ) : (
                  <PlayCircle className="h-4 w-4" />
                )}
                <span>{isLoading ? "Generating..." : audioPlaying ? "Pause Audio" : "Play Audio"}</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Smart Notes</h1>
          <label className="flex items-center gap-2 bg-studygenius-purple text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors cursor-pointer">
            <Plus className="h-5 w-5" />
            <span>Upload Notes</span>
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf,.docx,.txt,.md"
              onChange={handleUpload}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div 
              key={note.id}
              className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow relative"
              onClick={() => setSelectedNote(note.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <FileEdit className="h-8 w-8 text-studygenius-purple" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{note.dateCreated}</span>
                  
                  {note.id > 3 && (
                    <button 
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      onClick={(e) => deleteNote(note.id, e)}
                      aria-label="Delete note"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-3">{note.content}</p>
              
              {note.hasAudio && (
                <div className="flex items-center gap-1 mt-4 text-xs text-studygenius-purple">
                  <Mic className="h-3 w-3" />
                  <span>Audio available</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

export default SmartNotes;
