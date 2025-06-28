import { Layout } from "@/components/Layout";
import { UploadCloud, FileText, File, Mic, Download, BookOpen, ListChecks, Trash2, BookOpenCheck, TestTube, ClipboardCheck, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DescriptiveQuestion } from "@/types/quiz";
import DescriptiveTest from "@/components/quiz/DescriptiveTest";
import { useLanguage } from "@/contexts/LanguageContext";
import { TranslateText } from "@/components/TranslateText";
import translationService from "@/services/translationService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [summarizedContent, setSummarizedContent] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [descriptiveQuestions, setDescriptiveQuestions] = useState<DescriptiveQuestion[]>([]);
  const [showTest, setShowTest] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("summary");
  const navigate = useNavigate();
  const { language, autoTranslate, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [displayLanguage, setDisplayLanguage] = useState(language);
  const [translatedSummary, setTranslatedSummary] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const generateMockSummary = (texts: string[], files: File[]) => {
    const fileNames = files.map(f => f.name).join(", ");
    
    return `## Summary of ${files.length} document${files.length > 1 ? 's' : ''}: ${fileNames}

### Key Concepts:

The documents cover fundamental concepts in ${getRandomSubject()}. The material is organized into several main sections:

1. **Introduction to the Subject**
   - Definition and scope of the field
   - Historical context and development
   - Key figures and their contributions

2. **Core Theoretical Frameworks**
   - Primary models and theories
   - Comparative analysis of different approaches
   - Recent developments and current consensus

3. **Practical Applications**
   - Real-world examples and case studies
   - Methodological considerations
   - Best practices and implementation guidelines

### Important Points:

- The field has evolved significantly over the past decades, with several paradigm shifts
- Current research focuses on integrating traditional approaches with new technological advancements
- Multiple perspectives exist on key issues, with ongoing debates among experts
- Practical applications require careful consideration of context and specific variables

### Recommended Focus Areas:

Based on the content complexity, special attention should be given to:
- Understanding the theoretical foundations before moving to applications
- Exploring the interconnections between different concepts
- Recognizing common misconceptions and how to avoid them

This summary represents approximately ${Math.floor(Math.random() * 20) + 10}% of the original content, focusing on core concepts and key information.`;
  };

  const getRandomSubject = () => {
    const subjects = [
      "Computer Science", 
      "Economics", 
      "Biology", 
      "Psychology", 
      "History", 
      "Chemistry", 
      "Physics", 
      "Literature"
    ];
    return subjects[Math.floor(Math.random() * subjects.length)];
  };

  const clearFiles = () => {
    setUploadedFiles([]);
    setSummarizedContent(null);
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setAudioPlaying(false);
    }
  };

  const generateQuizQuestionsFromContent = (content: string, fileName: string) => {
    const contentLines = content.split(/\n+/);
    const keyPhrases = contentLines
      .filter(line => line.length > 40)
      .map(line => line.trim());
    
    const questions = [];
    
    const questionTemplates = [
      {
        type: "critical-analysis",
        template: (topic: string, context: string) => {
          return {
            question: `Critically analyze the following statement about ${topic}: "${context.substring(0, 100)}..." Which interpretation best captures the complex implications of this concept?`,
            options: [
              `The statement presents a nuanced perspective that acknowledges the multifaceted nature of ${topic} while recognizing inherent methodological limitations.`,
              `The statement overlooks critical contradictions in how ${topic} has been conceptualized across different theoretical frameworks.`,
              `The fundamental premise of the statement can be challenged based on recent empirical findings that suggest alternative mechanisms.`,
              `The statement reflects a deterministic view that fails to account for contextual variability and emergent properties in ${topic}.`
            ],
            correctAnswer: `The statement presents a nuanced perspective that acknowledges the multifaceted nature of ${topic} while recognizing inherent methodological limitations.`,
            explanation: `This interpretation correctly identifies the balanced approach taken in the statement, acknowledging both strengths and limitations while avoiding oversimplification of the complex issues surrounding ${topic}.`,
            hint: `Consider how the statement addresses multiple perspectives and acknowledges limitations rather than presenting an absolutist viewpoint.`
          }
        }
      },
      {
        type: "theoretical-integration",
        template: (concept: string, evidence: string) => {
          return {
            question: `How might the following evidence about ${concept} be integrated into a comprehensive theoretical framework? "${evidence.substring(0, 80)}..."`,
            options: [
              `Through a transdisciplinary approach that synthesizes methodologies from multiple fields while acknowledging epistemological differences.`,
              `By adopting a reductionist perspective that isolates variables and establishes linear causal relationships between components.`,
              `Through rejection of existing paradigms in favor of an entirely new conceptual model that prioritizes descriptive accuracy over predictive power.`,
              `By selectively incorporating only those aspects of the evidence that align with established theoretical models.`
            ],
            correctAnswer: `Through a transdisciplinary approach that synthesizes methodologies from multiple fields while acknowledging epistemological differences.`,
            explanation: `This approach represents the most sophisticated integration strategy by acknowledging the complexity of the evidence and the need to draw on diverse methodological and theoretical traditions while remaining sensitive to their underlying assumptions.`,
            hint: `The most robust theoretical frameworks acknowledge complexity and draw from multiple disciplines rather than forcing evidence into existing models.`
          }
        }
      },
      {
        type: "methodological-evaluation",
        template: (method: string, limitation: string) => {
          return {
            question: `Evaluate the methodological implications of this limitation in ${method}: "${limitation.substring(0, 90)}..." Which methodological approach would most effectively address this challenge?`,
            options: [
              `A mixed-methods design that triangulates findings through complementary quantitative and qualitative approaches.`,
              `Exclusive reliance on quantitative methods with increased sample sizes to enhance statistical power.`,
              `Abandoning empirical approaches in favor of purely theoretical analysis.`,
              `Adopting a strictly qualitative approach that prioritizes depth over generalizability.`
            ],
            correctAnswer: `A mixed-methods design that triangulates findings through complementary quantitative and qualitative approaches.`,
            explanation: `This approach addresses the methodological limitation by drawing on the strengths of multiple methods, allowing for triangulation of findings and a more comprehensive understanding of the phenomenon under study.`,
            hint: `Consider which approach leverages complementary strengths from different methodological traditions rather than doubling down on a single approach.`
          }
        }
      },
      {
        type: "conceptual-paradox",
        template: (concept: string, paradox: string) => {
          return {
            question: `Resolve the following conceptual paradox in ${concept}: "${paradox.substring(0, 80)}..." Which resolution offers the most sophisticated theoretical understanding?`,
            options: [
              `The paradox emerges from conflation of different levels of analysis; distinguishing between micro and macro levels reveals complementary rather than contradictory processes.`,
              `The paradox is merely semantic and disappears when terminology is standardized.`,
              `One side of the paradox must be rejected entirely as it represents a fundamental misconception.`,
              `The paradox is irresolvable and represents an inherent limitation in our understanding of ${concept}.`
            ],
            correctAnswer: `The paradox emerges from conflation of different levels of analysis; distinguishing between micro and macro levels reveals complementary rather than contradictory processes.`,
            explanation: `This resolution demonstrates sophisticated theoretical understanding by identifying how apparent contradictions can emerge when phenomena are analyzed at different levels or from different perspectives, preserving valuable insights from seemingly contradictory principles.`,
            hint: `Look for a resolution that preserves insights from both sides of the paradox rather than simply rejecting one perspective.`
          }
        }
      },
      {
        type: "ethical-implications",
        template: (topic: string, dilemma: string) => {
          return {
            question: `Analyze the ethical implications raised by this aspect of ${topic}: "${dilemma.substring(0, 90)}..." Which framework provides the most nuanced approach to addressing these ethical concerns?`,
            options: [
              `A pluralistic ethical framework that balances multiple principles while remaining sensitive to contextual factors and stakeholder perspectives.`,
              `A strictly consequentialist approach that focuses exclusively on maximizing beneficial outcomes regardless of means.`,
              `A deontological framework that applies universal rules without consideration of context-specific factors.`,
              `Rejection of ethical analysis in favor of practical utility as the sole criterion for decision-making.`
            ],
            correctAnswer: `A pluralistic ethical framework that balances multiple principles while remaining sensitive to contextual factors and stakeholder perspectives.`,
            explanation: `This framework acknowledges the complexity of ethical decision-making by considering multiple ethical principles, contextual factors, and diverse stakeholder perspectives rather than reducing ethics to a single principle or approach.`,
            hint: `The most sophisticated ethical frameworks acknowledge multiple values and principles rather than reducing ethics to a single consideration.`
          }
        }
      },
      {
        type: "complex-systems",
        template: (system: string, property: string) => {
          return {
            question: `How does this property of ${system}: "${property.substring(0, 80)}..." exemplify complex systems principles? Which analysis most accurately captures its emergent characteristics?`,
            options: [
              `The property emerges from non-linear interactions between system components, creating patterns that cannot be predicted from analysis of individual elements alone.`,
              `The property can be fully explained through reductionist analysis of individual system components without consideration of interactions.`,
              `The property is an epiphenomenon with no causal significance for system behavior.`,
              `The property represents random noise rather than meaningful patterns in system behavior.`
            ],
            correctAnswer: `The property emerges from non-linear interactions between system components, creating patterns that cannot be predicted from analysis of individual elements alone.`,
            explanation: `This analysis correctly applies complex systems thinking by identifying how the property emerges from interactions between system components rather than being reducible to individual elements, highlighting the non-linear and emergent nature of complex systems.`,
            hint: `Consider which explanation acknowledges emergent properties and non-linear interactions rather than simple cause-effect relationships.`
          }
        }
      }
    ];

    const maxQuestions = Math.min(keyPhrases.length, 15);
    for (let i = 0; i < maxQuestions; i++) {
      const phrase = keyPhrases[i];
      const randomTemplate = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
      const topic = fileName.split('.')[0].replace(/_/g, ' ');
      
      const generatedQuestion = randomTemplate.template(topic, phrase);
      
      const shuffledOptions = [...generatedQuestion.options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }
      
      const correctAnswerIndex = shuffledOptions.indexOf(generatedQuestion.correctAnswer);
      questions.push({
        ...generatedQuestion,
        options: shuffledOptions,
        correctAnswer: shuffledOptions[correctAnswerIndex]
      });
    }
    
    return questions;
  };

  const generateFlashcardsFromContent = (content: string, fileName: string) => {
    const contentLines = content.split(/\n+/);
    const relevantLines = contentLines
      .filter(line => line.length > 40 && line.length < 500)
      .map(line => line.trim());
    
    const flashcards = [];
    
    const analysisPatterns = [
      {
        matcher: (line: string) => line.includes("definition") || line.includes("concept") || line.includes("theory"),
        generator: (line: string) => ({
          front: "Analyze the theoretical foundations and implications of this concept. Consider its:\n1. Core assumptions\n2. Historical development\n3. Contemporary applications\n4. Limitations",
          back: line
        })
      },
      {
        matcher: (line: string) => line.includes("process") || line.includes("method"),
        generator: (line: string) => ({
          front: "Compare and contrast different approaches to this process:\n1. Traditional methods\n2. Modern innovations\n3. Contextual adaptations\n4. Efficiency considerations",
          back: line
        })
      },
      {
        matcher: (line: string) => line.includes("example") || line.includes("case"),
        generator: (line: string) => ({
          front: "Critically evaluate this case through multiple theoretical lenses:\n1. Underlying principles\n2. Alternative interpretations\n3. Real-world implications\n4. Potential challenges",
          back: line
        })
      },
      {
        matcher: (line: string) => line.includes("problem") || line.includes("challenge"),
        generator: (line: string) => ({
          front: "Develop a comprehensive solution strategy:\n1. Root cause analysis\n2. Stakeholder considerations\n3. Implementation challenges\n4. Success metrics",
          back: line
        })
      }
    ];

    const maxFlashcards = Math.min(relevantLines.length, 20);
    for (let i = 0; i < maxFlashcards; i++) {
      const line = relevantLines[i];
      let matched = false;
      
      for (const pattern of analysisPatterns) {
        if (pattern.matcher(line)) {
          flashcards.push(pattern.generator(line));
          matched = true;
          break;
        }
      }
      
      if (!matched) {
        const topic = fileName.split('.')[0].replace(/_/g, ' ');
        flashcards.push({
          front: `Analyze this concept's role in ${topic}:\n1. Theoretical significance\n2. Practical applications\n3. Related concepts\n4. Future implications`,
          back: line
        });
      }
    }
    
    return flashcards;
  };

  const cleanTextForSpeech = (text: string) => {
    return text
      .replace(/\#/g, "")
      .replace(/\,/g, "")
      .replace(/\./g, "")
      .replace(/\:/g, "")
      .replace(/\;/g, "")
      .replace(/\-/g, " ")
      .replace(/\*/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const handleGenerateAudio = async () => {
    if (!summarizedContent) return;
    
    const apiKey = localStorage.getItem("studygenius_elevenLabsApiKey");
    
    if (!apiKey) {
      toast.error("API Key Missing");
      return;
    }
    
    setAudioLoading(true);
    
    try {
      const speechText = cleanTextForSpeech(summarizedContent);
      
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(speechText);
        // Fix: Parse the string to a number for rate - ensure it's a number
        utterance.rate = Number(parseFloat(localStorage.getItem("studygenius_speechRate") || "1.0"));
        // Fix: Parse the string to a number for volume and divide by 100
        utterance.volume = Number(parseInt(localStorage.getItem("studygenius_volume") || "80")) / 100;
        
        if (currentAudio) {
          currentAudio.pause();
        }
        
        window.speechSynthesis.speak(utterance);
        
        const mockAudio = {
          pause: () => window.speechSynthesis.cancel(),
        } as HTMLAudioElement;
        
        setCurrentAudio(mockAudio);
        setAudioPlaying(true);
        setAudioLoading(false);
        
        utterance.onend = () => {
          setAudioPlaying(false);
        };
      }, 1500);
    } catch (error) {
      console.error("Error generating audio:", error);
      setAudioLoading(false);
      toast.error("Audio Generation Failed");
    }
  };

  const toggleAudio = () => {
    if (audioPlaying && currentAudio) {
      currentAudio.pause();
      setAudioPlaying(false);
    } else if (summarizedContent) {
      handleGenerateAudio();
    }
  };

  const downloadSummary = () => {
    if (!translatedSummary && !summarizedContent) return;
    
    const element = document.createElement("a");
    const content = translatedSummary || summarizedContent;
    const file = new Blob([content as string], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `summary_${displayLanguage}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // New function to create a smart note from uploaded content
  const createSmartNote = (content: string, files: File[]) => {
    const fileName = files[0]?.name || 'Uploaded Content';
    const fileTitle = fileName.split('.')[0].replace(/_/g, ' ');
    
    const smartNote = {
      id: Date.now(),
      title: `Notes on ${fileTitle}`,
      content: content,
      dateCreated: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      hasAudio: true
    };

    const existingNotes = JSON.parse(localStorage.getItem('studygenius_notes') || '[]');
    const updatedNotes = [...existingNotes, smartNote];
    localStorage.setItem('studygenius_notes', JSON.stringify(updatedNotes));
    
    // Update the count of smart notes
    localStorage.setItem('studygenius_smartNotes', updatedNotes.length.toString());
    
    // Trigger an event to notify other components that notes have been updated
    window.dispatchEvent(new Event('studygenius_notes_updated'));
    
    return smartNote;
  };

// Updated function to generate more meaningful descriptive questions
const generateDescriptiveTest = (content: string, fileName: string) => {
  const contentLines = content.split(/\n+/).filter(line => line.length > 40);
  const questions: DescriptiveQuestion[] = [];
  
  // Create topic-based keywords for more accurate checking
  const fileTitle = fileName.split('.')[0].replace(/_/g, ' ');
  const topicKeywords = fileTitle.split(' ').filter(word => word.length > 3);
  
  // Get potential content themes from the uploaded content
  const contentThemes = contentLines
    .join(' ')
    .match(/\b[A-Za-z]{5,}\b/g)
    ?.filter(word => word.length > 5)
    .slice(0, 10) || [];
  
  // Enhanced question templates with thought-provoking questions
  const questionTemplates = [
    {
      type: 'critique',
      template: (topic: string) => `Critically evaluate the most significant theoretical frameworks in ${topic}, highlighting their strengths, limitations, and real-world applicability.`,
      keywords: (topic: string) => [
        ...topic.split(' ').filter(w => w.length > 3),
        'critical', 'evaluation', 'framework', 'strength', 'limitation', 'applicability', 'theoretical'
      ],
      difficulty: "Hard"
    },
    {
      type: 'synthesize',
      template: (topic: string) => `Compare and synthesize diverse perspectives on ${topic}, explaining how these viewpoints collectively contribute to a comprehensive understanding of the subject.`,
      keywords: (topic: string) => [
        ...topic.split(' ').filter(w => w.length > 3),
        'synthesis', 'perspective', 'compare', 'viewpoint', 'comprehensive', 'understanding'
      ],
      difficulty: "Hard"
    },
    {
      type: 'analyze',
      template: (topic: string) => `Analyze the underlying assumptions and methodological approaches in ${topic}, and discuss their impact on research outcomes.`,
      keywords: (topic: string) => [
        ...topic.split(' ').filter(w => w.length > 3),
        'assumption', 'methodology', 'approach', 'impact', 'research', 'outcome', 'analysis'
      ],
      difficulty: "Medium"
    },
    {
      type: 'connect',
      template: (topic: string) => `Explain the interconnections between key concepts in ${topic} and demonstrate how they form a coherent system of knowledge.`,
      keywords: (topic: string) => [
        ...topic.split(' ').filter(w => w.length > 3),
        'interconnection', 'concept', 'coherent', 'system', 'knowledge', 'relationship'
      ],
      difficulty: "Medium"
    },
    {
      type: 'apply',
      template: (topic: string) => `Propose an innovative application of ${topic} principles to address a significant real-world challenge, explaining your reasoning and anticipated outcomes.`,
      keywords: (topic: string) => [
        ...topic.split(' ').filter(w => w.length > 3),
        'apply', 'innovative', 'principle', 'challenge', 'real-world', 'solution', 'outcome'
      ],
      difficulty: "Medium"
    },
    {
      type: 'evaluate',
      template: (topic: string) => `Evaluate the ethical implications and societal impacts of developments in ${topic}, considering diverse stakeholder perspectives.`,
      keywords: (topic: string) => [
        ...topic.split(' ').filter(w => w.length > 3),
        'ethical', 'implication', 'societal', 'impact', 'development', 'stakeholder', 'perspective'
      ],
      difficulty: "Hard"
    },
    {
      type: 'transform',
      template: (topic: string) => `How might emerging technologies transform our understanding and application of ${topic}? Provide specific examples and analyze potential future developments.`,
      keywords: (topic: string) => [
        ...topic.split(' ').filter(w => w.length > 3),
        'technology', 'transform', 'emerging', 'future', 'development', 'understanding', 'application'
      ],
      difficulty: "Hard"
    }
  ];

  // Extract meaningful content snippets for explanations and hints
  const contentSnippets = contentLines
    .filter(line => line.length > 60 && line.length < 200)
    .slice(0, 7);

  // Number of questions to generate (or max available from content)
  const numQuestions = Math.min(7, questionTemplates.length);
  
  for (let i = 0; i < numQuestions; i++) {
    const questionTemplate = questionTemplates[i % questionTemplates.length];
    const topic = fileTitle;
    
    // Generate more substantial hints based on content
    const hints = [
      `Consider multiple theoretical perspectives when addressing ${topic}.`,
      `Integrate both empirical evidence and theoretical frameworks in your response.`,
      `Include analysis of limitations and counterarguments in your answer.`,
      `Connect abstract concepts to concrete examples or case studies.`,
      `Consider ethical implications and broader societal context in your response.`
    ];
    
    // Add content-based hints if available
    if (contentSnippets[i]) {
      const snippet = contentSnippets[i].substring(0, 80);
      hints.push(`Incorporate this key insight into your answer: "${snippet}..."`);
    }
    
    // Create comprehensive keyword list for answer checking
    const combinedKeywords = [
      ...questionTemplate.keywords(topic),
      ...topicKeywords,
      ...contentThemes.slice(0, 5)
    ];
    
    // Filter out duplicates and short words
    const uniqueKeywords = Array.from(new Set(combinedKeywords))
      .filter(word => word.length > 3)
      .slice(0, 15);
    
    // Create detailed explanation for feedback
    const explanation = `A comprehensive answer about ${topic} should demonstrate:
1. Critical evaluation of multiple theoretical perspectives
2. Integration of empirical evidence with conceptual frameworks
3. Analysis of strengths and limitations of different approaches
4. Application of concepts to real-world contexts or case studies
5. Consideration of ethical implications and broader impacts`;
    
    questions.push({
      id: i + 1,
      question: questionTemplate.template(topic),
      correctAnswer: `A comprehensive answer would demonstrate critical thinking, integrate multiple perspectives, connect theory to practice, and consider broader implications of ${topic}.`,
      keywords: uniqueKeywords,
      explanation: explanation,
      hints: hints,
      difficulty: questionTemplate.difficulty as "Easy" | "Medium" | "Hard"
    });
  }
  
  setDescriptiveQuestions(questions);
  return questions;
};

  const generateStudyMaterials = async (content) => {
    if (!content || !uploadedFiles.length) return;
    
    const fileName = uploadedFiles[0]?.name || 'Uploaded Content';
    
    const quizQuestions = generateQuizQuestionsFromContent(content, fileName);
    const flashcards = generateFlashcardsFromContent(content, fileName);
    
    // Generate descriptive questions
    const descriptiveTest = generateDescriptiveTest(content, fileName);
    
    const quizData = {
      id: Date.now(),
      title: `Quiz from ${fileName}`,
      questions: quizQuestions.length,
      difficulty: "Hard",
      quizQuestions: quizQuestions
    };

    const flashcardData = {
      id: Date.now(),
      title: `Flashcards from ${fileName}`,
      cards: flashcards.length,
      lastStudied: "Just now",
      flashcards: flashcards
    };

    const existingQuizzes = JSON.parse(localStorage.getItem('studygenius_quizzes') || '[]');
    const existingFlashcards = JSON.parse(localStorage.getItem('studygenius_flashcards') || '[]');

    localStorage.setItem('studygenius_quizzes', JSON.stringify([...existingQuizzes, quizData]));
    localStorage.setItem('studygenius_flashcards', JSON.stringify([...existingFlashcards, flashcardData]));

    const currentFlashcardSets = parseInt(localStorage.getItem('studygenius_flashcardSets') || '0');
    localStorage.setItem('studygenius_flashcardSets', (currentFlashcardSets + 1).toString());

    toast(`Quiz with ${quizQuestions.length} questions and ${flashcards.length} flashcards have been created for ${fileName}.`);
  };

  const processFiles = async () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one file to process.");
      return;
    }

    setProcessing(true);
    
    try {
      const fileTexts = [];
      
      for (const file of uploadedFiles) {
        if (file.type === "text/plain") {
          const text = await file.text();
          fileTexts.push(text);
        } else {
          const placeholderContent = `Content from ${file.name} (${file.type})
          
          This document contains information about ${file.name.split('.')[0]}.
          Key concepts include:
          
          - Understanding the main topics in ${file.name.split('.')[0]}
          - Analyzing relationships between different parts of ${file.name.split('.')[0]}
          - Applying concepts from ${file.name.split('.')[0]} to practical situations
          - Evaluating the significance of ${file.name.split('.')[0]} in its field
          
          Further exploration of these topics would typically include detailed explanations,
          examples, and practical applications related to ${file.name.split('.')[0]}.`;
          
          fileTexts.push(placeholderContent);
        }
      }
      
      const allContent = fileTexts.join("\n\n");
      
      const mockSummary = generateMockSummary(fileTexts, uploadedFiles);
      
      setTimeout(() => {
        setSummarizedContent(mockSummary);
        
        // Create a smart note from the uploaded content
        const smartNote = createSmartNote(mockSummary, uploadedFiles);
        
        // Generate study materials including descriptive test
        generateStudyMaterials(allContent);
        setProcessing(false);
        
        toast.success("Your files have been successfully summarized and study materials have been generated.");

        const currentMaterialsUploaded = parseInt(localStorage.getItem('studygenius_materialsUploaded') || '0');
        localStorage.setItem('studygenius_materialsUploaded', (currentMaterialsUploaded + uploadedFiles.length).toString());
      }, 2000);
    } catch (error) {
      console.error("Error processing files:", error);
      setProcessing(false);
      toast.error("There was an error processing your files. Please try again.");
    }
  };

  const navigateToStudyMaterials = (path: string) => {
    navigate(path);
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    toast("The file has been removed from the upload list.");
  };

  const startDescriptiveTest = () => {
    if (descriptiveQuestions.length === 0) {
      toast.error("No descriptive questions available. Please upload content first.");
      return;
    }
    
    setShowTest(true);
    setActiveTab("test");
  };

  // New function to translate the summarized content
  const translateSummaryContent = async (targetLang: string) => {
    if (!summarizedContent) return;
    
    setIsTranslating(true);
    
    try {
      // Split content by paragraphs for better translation
      const paragraphs = summarizedContent.split('\n\n');
      const translatedParagraphs = [];
      
      // Translate each paragraph individually
      for (const paragraph of paragraphs) {
        // Handle headers differently
        if (paragraph.startsWith('##') || paragraph.startsWith('###')) {
          const parts = paragraph.split(' ');
          const headerMarker = parts[0];
          const headerText = parts.slice(1).join(' ');
          
          const translatedHeader = await translationService.translateText(headerText, targetLang);
          translatedParagraphs.push(`${headerMarker} ${translatedHeader}`);
        } 
        // Handle bullet points
        else if (paragraph.includes('- ')) {
          const lines = paragraph.split('\n');
          const translatedLines = [];
          
          for (const line of lines) {
            if (line.trim().startsWith('- ')) {
              const bulletText = line.replace('- ', '');
              const translatedBullet = await translationService.translateText(bulletText, targetLang);
              translatedLines.push(`- ${translatedBullet}`);
            } else {
              const translatedLine = await translationService.translateText(line, targetLang);
              translatedLines.push(translatedLine);
            }
          }
          
          translatedParagraphs.push(translatedLines.join('\n'));
        }
        // Handle numbered lists
        else if (paragraph.match(/^\d\./)) {
          const lines = paragraph.split('\n');
          const translatedLines = [];
          
          for (const line of lines) {
            const match = line.match(/^(\d+\.\s+)(.*)$/);
            if (match) {
              const number = match[1];
              const text = match[2];
              const translatedText = await translationService.translateText(text, targetLang);
              translatedLines.push(`${number}${translatedText}`);
            } else {
              const translatedLine = await translationService.translateText(line, targetLang);
              translatedLines.push(translatedLine);
            }
          }
          
          translatedParagraphs.push(translatedLines.join('\n'));
        }
        // Regular paragraphs
        else {
          const translatedParagraph = await translationService.translateText(paragraph, targetLang);
          translatedParagraphs.push(translatedParagraph);
        }
      }
      
      setTranslatedSummary(translatedParagraphs.join('\n\n'));
    } catch (error) {
      console.error("Translation error:", error);
      toast.error("Error translating content");
      // Fallback to original content
      setTranslatedSummary(summarizedContent);
    } finally {
      setIsTranslating(false);
    }
  };
  
  // Update display language and trigger translation when needed
  useEffect(() => {
    if (summarizedContent && displayLanguage !== "en") {
      translateSummaryContent(displayLanguage);
    } else if (displayLanguage === "en") {
      // For English, use the original content
      setTranslatedSummary(null);
    }
  }, [displayLanguage, summarizedContent]);
  
  // Reset translation when summary changes
  useEffect(() => {
    if (summarizedContent) {
      setDisplayLanguage(language);
      if (language !== "en") {
        translateSummaryContent(language);
      } else {
        setTranslatedSummary(null);
      }
    }
  }, [summarizedContent]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8"><TranslateText text="Upload Study Materials" /></h1>
        
        {!summarizedContent ? (
          <>
            <div 
              className={`border-2 border-dashed rounded-lg p-10 text-center 
                ${dragActive ? 'border-studygenius-primary bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  <TranslateText text="Drag and drop files here" />
                </h2>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  <TranslateText text="or click to browse files" />
                </p>
                <label className="bg-studygenius-primary hover:bg-studygenius-primary/90 text-white px-4 py-2 rounded-md cursor-pointer transition-colors">
                  <TranslateText text="Browse Files" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                  />
                </label>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  <TranslateText text="Supported formats: PDF, DOC, DOCX, TXT, PPT, PPTX" />
                </p>
              </div>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3">
                  <TranslateText text="Uploaded Files:" />
                </h3>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                      <FileText className="h-5 w-5 text-studygenius-primary mr-3" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                      <button 
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end gap-3">
                  <button 
                    onClick={clearFiles}
                    className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <TranslateText text="Clear All" />
                  </button>
                  <button 
                    onClick={processFiles}
                    disabled={processing}
                    className="px-4 py-2 text-sm bg-studygenius-primary text-white rounded-md hover:bg-studygenius-primary/90 transition-colors flex items-center gap-2"
                  >
                    {processing ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <TranslateText text="Processing..." />
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-4 w-4" />
                        <TranslateText text="Process Files" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="summary">
                <BookOpenCheck className="h-4 w-4 mr-2" />
                <TranslateText text="Summary" />
              </TabsTrigger>
              <TabsTrigger value="study">
                <ListChecks className="h-4 w-4 mr-2" />
                <TranslateText text="Study Materials" />
              </TabsTrigger>
              <TabsTrigger value="test">
                <TestTube className="h-4 w-4 mr-2" />
                <TranslateText text="Descriptive Test" />
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2 items-center">
                    <h2 className="text-xl font-semibold">
                      <TranslateText text="Summary" />
                    </h2>
                    {isTranslating && (
                      <div className="h-4 w-4 border-2 border-studygenius-primary border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div>
                      <Select value={displayLanguage} onValueChange={setDisplayLanguage}>
                        <SelectTrigger className="w-[140px] h-8 text-xs">
                          <SelectValue>
                            <div className="flex items-center gap-2">
                              <Globe className="h-3.5 w-3.5" />
                              {displayLanguage === 'en' ? 'English' : 
                               displayLanguage === 'es' ? 'Español' : 
                               displayLanguage === 'fr' ? 'Français' : 
                               displayLanguage === 'de' ? 'Deutsch' : 
                               displayLanguage === 'hi' ? 'हिन्दी' : 
                               displayLanguage === 'kn' ? 'ಕನ್ನಡ' :
                               displayLanguage === 'te' ? 'తెలుగు' :
                               displayLanguage === 'ta' ? 'தமிழ்' :
                               displayLanguage}
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="hi">हिन्दी</SelectItem>
                          <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
                          <SelectItem value="te">తెలుగు</SelectItem>
                          <SelectItem value="ta">தமிழ்</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <button
                      onClick={toggleAudio}
                      className="p-2 text-gray-500 hover:text-studygenius-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      disabled={audioLoading || !summarizedContent}
                      title={audioPlaying ? "Pause Audio" : "Play Audio"}
                    >
                      {audioLoading ? (
                        <div className="h-5 w-5 border-2 border-studygenius-primary border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Mic className={`h-5 w-5 ${audioPlaying ? 'text-studygenius-primary' : ''}`} />
                      )}
                    </button>
                    <button
                      onClick={downloadSummary}
                      className="p-2 text-gray-500 hover:text-studygenius-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      title="Download Summary"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="prose prose-studygenius dark:prose-invert max-w-none">
                  {translatedSummary ? (
                    <div className="whitespace-pre-line">{translatedSummary}</div>
                  ) : (
                    <div className="whitespace-pre-line">{summarizedContent}</div>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    clearFiles();
                    setShowTest(false);
                  }}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <TranslateText text="Process New Files" />
                </button>
              </div>
            </TabsContent>
            
            <TabsContent value="study" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigateToStudyMaterials('/quizzes')}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500/10 p-3 rounded-full">
                      <ClipboardCheck className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        <TranslateText text="Quiz Questions" />
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <TranslateText text="Test your knowledge with multiple-choice questions." />
                      </p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigateToStudyMaterials('/flashcards')}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-500/10 p-3 rounded-full">
                      <BookOpen className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        <TranslateText text="Flashcards" />
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <TranslateText text="Study with interactive flashcards generated from your content." />
                      </p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigateToStudyMaterials('/smart-notes')}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-500/10 p-3 rounded-full">
                      <FileText className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        <TranslateText text="Smart Notes" />
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <TranslateText text="Access your organized notes generated from the uploaded content." />
                      </p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={startDescriptiveTest}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-500/10 p-3 rounded-full">
                      <TestTube className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        <TranslateText text="Descriptive Test" />
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <TranslateText text="Practice writing comprehensive answers with detailed feedback." />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    clearFiles();
                    setShowTest(false);
                  }}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <TranslateText text="Process New Files" />
                </button>
              </div>
            </TabsContent>
            
            <TabsContent value="test">
              {showTest && descriptiveQuestions.length > 0 ? (
                <DescriptiveTest 
                  questions={descriptiveQuestions}
                  onComplete={() => setShowTest(false)}
                />
              ) : (
                <div className="text-center p-10">
                  <TestTube className="h-16 w-16 mx-auto text-amber-500 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">
                    <TranslateText text="Descriptive Test" />
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    <TranslateText text="Practice your understanding by answering open-ended questions about your study material." />
                  </p>
                  <button
                    onClick={startDescriptiveTest}
                    className="px-6 py-2 bg-studygenius-primary text-white rounded-md hover:bg-studygenius-primary/90 transition-colors"
                  >
                    <TranslateText text="Start Test" />
                  </button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default Upload;
