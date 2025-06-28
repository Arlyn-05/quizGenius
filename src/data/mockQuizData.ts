
import { Quiz, QuizQuestion, DescriptiveQuestion } from "@/types/quiz";

export const quizzesList: Quiz[] = [
  { 
    id: 1, 
    title: "Biology Basics", 
    questions: 3, 
    difficulty: "Medium",
    quizQuestions: [
      {
        id: 1,
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Golgi Apparatus"],
        correctAnswer: "Mitochondria",
        explanation: "Mitochondria are organelles that generate most of the cell's supply of ATP (energy). They are often referred to as the powerhouse of the cell.",
        hint: "This organelle is responsible for producing cellular energy in the form of ATP."
      },
      {
        id: 2,
        question: "Which of these structures is NOT part of a neuron?",
        options: ["Axon", "Dendrite", "Nephron", "Cell body"],
        correctAnswer: "Nephron",
        explanation: "Nephron is the functional unit of the kidney, not a part of a neuron. The main parts of a neuron include the cell body, axon, and dendrites.",
        hint: "One of these terms is related to a different organ system entirely - the excretory system."
      },
      {
        id: 3,
        question: "What is the primary function of chloroplasts in plant cells?",
        options: ["Cellular respiration", "Protein synthesis", "Photosynthesis", "Cell division"],
        correctAnswer: "Photosynthesis",
        explanation: "Chloroplasts are organelles found in plant cells that contain chlorophyll and are responsible for photosynthesis, the process of converting light energy into chemical energy.",
        hint: "These structures contain chlorophyll and are involved in converting light energy into chemical energy."
      }
    ]
  },
  { 
    id: 2, 
    title: "Chemistry Fundamentals", 
    questions: 3, 
    difficulty: "Hard",
    quizQuestions: [
      {
        id: 1,
        question: "Which of the following is NOT a type of chemical bond?",
        options: ["Covalent bond", "Ionic bond", "Hydrogen bond", "Magnetic bond"],
        correctAnswer: "Magnetic bond",
        explanation: "Magnetic bond is not a type of chemical bond. The three main types of chemical bonds are covalent bonds, ionic bonds, and metallic bonds. Hydrogen bonds are a type of intermolecular force.",
        hint: "Think about forces between atoms - only certain types of interactions are considered true chemical bonds."
      },
      {
        id: 2,
        question: "What is the pH of a neutral solution at 25°C?",
        options: ["0", "7", "14", "10"],
        correctAnswer: "7",
        explanation: "A neutral solution has a pH of 7. Solutions with pH less than 7 are acidic, and those with pH greater than 7 are basic or alkaline.",
        hint: "This value sits in the middle of the pH scale from 0 to 14."
      },
      {
        id: 3,
        question: "Which element has the symbol 'Au' in the periodic table?",
        options: ["Silver", "Gold", "Aluminum", "Argon"],
        correctAnswer: "Gold",
        explanation: "The element Gold has the symbol 'Au' in the periodic table, derived from its Latin name 'Aurum'.",
        hint: "This element is a precious metal often used in jewelry and currency."
      }
    ]
  },
  { 
    id: 3, 
    title: "World History", 
    questions: 3, 
    difficulty: "Easy",
    quizQuestions: [
      {
        id: 1,
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: "1945",
        explanation: "World War II ended in 1945, with Nazi Germany surrendering in May and Japan surrendering in September after the atomic bombings of Hiroshima and Nagasaki.",
        hint: "This was after the atomic bombs were used and Nazi Germany had already surrendered."
      },
      {
        id: 2,
        question: "Which empire was ruled by Genghis Khan?",
        options: ["Roman Empire", "Mongol Empire", "Ottoman Empire", "Byzantine Empire"],
        correctAnswer: "Mongol Empire",
        explanation: "Genghis Khan was the founder and first Great Khan of the Mongol Empire, which became the largest contiguous empire in history after his death.",
        hint: "This nomadic leader united tribes from Central Asia to create one of history's largest empires."
      },
      {
        id: 3,
        question: "Which ancient civilization built the Machu Picchu complex in Peru?",
        options: ["Maya", "Aztec", "Inca", "Olmec"],
        correctAnswer: "Inca",
        explanation: "Machu Picchu was built by the Inca civilization in the 15th century and is often referred to as the 'Lost City of the Incas'.",
        hint: "This civilization was based in the Andean region and was the largest empire in pre-Columbian America."
      }
    ]
  }
];

export const mockQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Golgi Apparatus"],
    correctAnswer: "Mitochondria",
    explanation: "Mitochondria are organelles that generate most of the cell's supply of ATP (energy). They are often referred to as the powerhouse of the cell.",
    hint: "This organelle is responsible for producing cellular energy in the form of ATP."
  },
  {
    id: 2,
    question: "Which of the following is NOT a type of chemical bond?",
    options: ["Covalent bond", "Ionic bond", "Hydrogen bond", "Magnetic bond"],
    correctAnswer: "Magnetic bond",
    explanation: "Magnetic bond is not a type of chemical bond. The three main types of chemical bonds are covalent bonds, ionic bonds, and metallic bonds. Hydrogen bonds are a type of intermolecular force.",
    hint: "Think about forces between atoms - only certain types of interactions are considered true chemical bonds."
  },
  {
    id: 3,
    question: "Which of these structures is NOT part of a neuron?",
    options: ["Axon", "Dendrite", "Nephron", "Cell body"],
    correctAnswer: "Nephron",
    explanation: "Nephron is the functional unit of the kidney, not a part of a neuron. The main parts of a neuron include the cell body, axon, and dendrites.",
    hint: "One of these terms is related to a different organ system entirely - the excretory system."
  }
];

// Enhanced question generation with Bloom's taxonomy and difficulty levels
export const generateDescriptiveQuestions = (content: string, fileName: string): DescriptiveQuestion[] => {
  const contentLines = content.split(/\n+/);
  const keyPhrases = contentLines
    .filter(line => line.length > 40)
    .map(line => line.trim());
  
  const topics = extractTopics(content, fileName);
  const questions = [];

  // Bloom's Taxonomy question templates organized by cognitive level
  const questionTemplates = {
    // Knowledge/Remember level
    remember: [
      {
        template: (topic: string) => `Define and explain the key components of ${topic}.`,
        keywords: (topic: string) => [topic, "definition", "explain", "component", "key", "fundamental"],
        hints: (topic: string) => [
          `Start with the basic definition of ${topic}.`,
          `Consider the essential elements that make up ${topic}.`,
          `What are the fundamental characteristics of ${topic}?`
        ],
        explanation: (topic: string) => `Understanding ${topic} requires knowledge of its core components and definitions.`
      },
      {
        template: (topic: string) => `Identify and describe the main principles of ${topic}.`,
        keywords: (topic: string) => [topic, "identify", "describe", "principle", "main", "primary"],
        hints: (topic: string) => [
          `What are the guiding principles in ${topic}?`,
          `Think about the foundational rules in ${topic}.`,
          `Consider the essential concepts that define ${topic}.`
        ],
        explanation: (topic: string) => `The main principles of ${topic} form its theoretical foundation and practical applications.`
      }
    ],
    
    // Understand/Comprehend level
    understand: [
      {
        template: (topic: string) => `Explain the relationship between different aspects of ${topic} and provide examples.`,
        keywords: (topic: string) => [topic, "relationship", "explain", "aspect", "example", "connection"],
        hints: (topic: string) => [
          `How do various elements of ${topic} interact with each other?`,
          `Can you provide real-world examples of these relationships?`,
          `Think about cause and effect within ${topic}.`
        ],
        explanation: (topic: string) => `Understanding ${topic} requires comprehension of how its different aspects relate to each other and manifest in practical situations.`
      },
      {
        template: (topic: string) => `Compare and contrast different theories within ${topic}.`,
        keywords: (topic: string) => [topic, "compare", "contrast", "theory", "difference", "similarity"],
        hints: (topic: string) => [
          `What are the major theories in ${topic}?`,
          `How do these theories differ in their approach?`,
          `What similarities exist across these different perspectives?`
        ],
        explanation: (topic: string) => `A comprehensive understanding of ${topic} includes awareness of various theoretical perspectives and their commonalities and differences.`
      }
    ],
    
    // Apply level
    apply: [
      {
        template: (topic: string) => `Apply the principles of ${topic} to solve a real-world problem.`,
        keywords: (topic: string) => [topic, "apply", "principle", "solve", "problem", "real-world", "application"],
        hints: (topic: string) => [
          `Consider a specific challenge that ${topic} could address.`,
          `What steps would you take to implement ${topic} in a practical situation?`,
          `How might the theories of ${topic} be put into practice?`
        ],
        explanation: (topic: string) => `Applying ${topic} demonstrates the ability to use theoretical knowledge to address practical challenges.`
      },
      {
        template: (topic: string) => `Demonstrate how ${topic} can be used in different contexts.`,
        keywords: (topic: string) => [topic, "demonstrate", "context", "use", "application", "implement"],
        hints: (topic: string) => [
          `In what different fields or situations could ${topic} be relevant?`,
          `How might ${topic} be adapted to different environments?`,
          `What makes ${topic} versatile across different applications?`
        ],
        explanation: (topic: string) => `The versatility of ${topic} is demonstrated by its applicability across various contexts and situations.`
      }
    ],
    
    // Analyze level
    analyze: [
      {
        template: (topic: string) => `Analyze the strengths and weaknesses of different approaches to ${topic}.`,
        keywords: (topic: string) => [topic, "analyze", "strength", "weakness", "approach", "advantage", "disadvantage", "critical"],
        hints: (topic: string) => [
          `What are the benefits of different methods in ${topic}?`,
          `What limitations exist in various approaches to ${topic}?`,
          `How might these approaches be evaluated objectively?`
        ],
        explanation: (topic: string) => `Critical analysis of ${topic} involves evaluating the merits and limitations of different methodologies and approaches.`
      },
      {
        template: (topic: string) => `Examine the factors that influence ${topic} and explain their significance.`,
        keywords: (topic: string) => [topic, "examine", "factor", "influence", "significance", "impact", "analyze"],
        hints: (topic: string) => [
          `What external elements affect ${topic}?`,
          `How do these factors interact with each other?`,
          `Why are certain factors more significant than others?`
        ],
        explanation: (topic: string) => `Understanding ${topic} requires examination of its influential factors and their relative importance.`
      }
    ],
    
    // Evaluate level
    evaluate: [
      {
        template: (topic: string) => `Evaluate the effectiveness of ${topic} in addressing specific challenges.`,
        keywords: (topic: string) => [topic, "evaluate", "effectiveness", "challenge", "assessment", "critique", "judgment"],
        hints: (topic: string) => [
          `What criteria would you use to measure the success of ${topic}?`,
          `What evidence supports the effectiveness of ${topic}?`,
          `Are there situations where ${topic} might be less effective?`
        ],
        explanation: (topic: string) => `Evaluating ${topic} involves assessing its efficacy and appropriateness for particular situations based on evidence and criteria.`
      },
      {
        template: (topic: string) => `Critique the current state of research on ${topic} and suggest future directions.`,
        keywords: (topic: string) => [topic, "critique", "research", "future", "direction", "limitation", "gap", "recommend"],
        hints: (topic: string) => [
          `What are the current strengths in ${topic} research?`,
          `What gaps exist in our understanding of ${topic}?`,
          `How might future research address these limitations?`
        ],
        explanation: (topic: string) => `A critical evaluation of ${topic} research identifies current knowledge status and opportunities for advancement.`
      }
    ],
    
    // Create level
    create: [
      {
        template: (topic: string) => `Design a new approach or solution related to ${topic} that addresses current limitations.`,
        keywords: (topic: string) => [topic, "design", "new", "approach", "solution", "innovative", "create", "develop"],
        hints: (topic: string) => [
          `What innovative methods could advance ${topic}?`,
          `How would your approach overcome existing challenges?`,
          `What resources or technologies would your solution require?`
        ],
        explanation: (topic: string) => `Innovation in ${topic} requires creative thinking to develop novel approaches that advance beyond current limitations.`
      },
      {
        template: (topic: string) => `Propose an integrated framework that combines multiple perspectives on ${topic}.`,
        keywords: (topic: string) => [topic, "propose", "integrated", "framework", "combine", "perspective", "synthesize"],
        hints: (topic: string) => [
          `How might different theories of ${topic} complement each other?`,
          `What would a comprehensive approach to ${topic} include?`,
          `How could seemingly contradictory aspects of ${topic} be reconciled?`
        ],
        explanation: (topic: string) => `Synthesizing knowledge about ${topic} into an integrated framework demonstrates the ability to create cohesive understanding from diverse perspectives.`
      }
    ]
  };
  
  // Generate the questions using all cognitive levels
  const cognitiveCategories = Object.keys(questionTemplates) as Array<keyof typeof questionTemplates>;
  const maxQuestions = Math.min(topics.length * 2, 10); // Generate more questions
  
  for (let i = 0; i < maxQuestions; i++) {
    const topic = topics[i % topics.length];
    
    // Select a cognitive level based on question number to ensure variety
    const categoryIndex = i % cognitiveCategories.length;
    const category = cognitiveCategories[categoryIndex];
    
    // Get templates for the selected cognitive level
    const templatesForLevel = questionTemplates[category];
    const randomTemplate = templatesForLevel[i % templatesForLevel.length];
    
    // Generate question with difficulty increasing with question number
    const questionTemplate = randomTemplate.template(topic);
    const keywordsList = randomTemplate.keywords(topic);
    const hintsList = randomTemplate.hints(topic);
    const explanationText = randomTemplate.explanation(topic);
    
    // Add more keywords for later questions to increase difficulty
    if (i >= maxQuestions / 2) {
      keywordsList.push("analysis", "evaluation", "critical thinking", "synthesis");
    }
    
    questions.push({
      id: Date.now() + i,
      question: questionTemplate,
      correctAnswer: `A comprehensive answer about ${topic}`,
      keywords: keywordsList,
      explanation: explanationText,
      hints: hintsList,
      difficulty: i < maxQuestions / 3 ? "Easy" : i < (maxQuestions * 2) / 3 ? "Medium" : "Hard"
    });
  }
  
  return questions;
};

// Enhanced topic extraction with semantic understanding
const extractTopics = (content: string, fileName: string): string[] => {
  const fileNameTopic = fileName.split('.')[0].replace(/_/g, ' ');
  
  // Extract potential topics from content
  const potentialTopics = new Set<string>();
  
  // Add the filename as a topic
  potentialTopics.add(fileNameTopic);
  
  // Look for capitalized phrases or headings
  const headingRegex = /#+\s*(.+?)(?:\n|$)/g;
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    potentialTopics.add(match[1].trim());
  }
  
  // Look for bold text as potential topics
  const boldRegex = /\*\*(.+?)\*\*/g;
  while ((match = boldRegex.exec(content)) !== null) {
    potentialTopics.add(match[1].trim());
  }
  
  // Extract key phrases (sentences with important keywords)
  const sentences = content.split(/[.!?]/).filter(s => s.trim().length > 20);
  const importantKeywords = ["important", "key", "essential", "fundamental", "critical", "significant", "primary", "major"];
  
  sentences.forEach(sentence => {
    if (importantKeywords.some(keyword => sentence.toLowerCase().includes(keyword))) {
      // Extract noun phrases following important keywords
      const simplifiedSentence = sentence.replace(/[^\w\s]/g, '').trim();
      const words = simplifiedSentence.split(/\s+/);
      
      for (let i = 0; i < words.length; i++) {
        if (importantKeywords.includes(words[i].toLowerCase()) && i < words.length - 2) {
          // Take up to 4 words following the keyword
          const phrase = words.slice(i + 1, i + 5).join(' ');
          if (phrase.length > 5) {
            potentialTopics.add(phrase);
          }
        }
      }
    }
  });
  
  // If we have too few topics, add some generic ones based on the filename
  if (potentialTopics.size < 5) {
    potentialTopics.add(`the fundamentals of ${fileNameTopic}`);
    potentialTopics.add(`${fileNameTopic} methodologies`);
    potentialTopics.add(`${fileNameTopic} applications`);
    potentialTopics.add(`${fileNameTopic} in modern context`);
    potentialTopics.add(`advanced concepts in ${fileNameTopic}`);
    potentialTopics.add(`practical applications of ${fileNameTopic}`);
    potentialTopics.add(`theoretical foundations of ${fileNameTopic}`);
  }
  
  return Array.from(potentialTopics);
};
