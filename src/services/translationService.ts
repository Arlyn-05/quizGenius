import i18n from "../i18n";

/**
 * Translation service that works with i18next and simulates API translations
 */
const translationService = {
  /**
   * Translate text to the target language
   * @param text Text to translate
   * @param targetLang Target language code
   * @returns Translated text or original if translation is not available
   */
  async translateText(text: string, targetLang: string): Promise<string> {
    if (!text) return text;
    
    // For demonstration, we'll use i18next for known phrases
    // In a real app, this would call an API like Google Translate
    
    // First check if the entire text matches a key
    if (i18n.exists(text, { lng: targetLang })) {
      return i18n.t(text, { lng: targetLang });
    }
    
    // For English, return the original text
    if (targetLang === "en") {
      return text;
    }
    
    // Simulate API translation with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Translating text to ${targetLang}: "${text.substring(0, 30)}..."`);
        
        // For mixed content with markdown and bullet points, split and translate separately
        if (text.includes('\n') || text.includes('#') || text.includes('-')) {
          const lines = text.split('\n');
          const translatedLines = lines.map(line => this.mockTranslateLine(line, targetLang));
          resolve(translatedLines.join('\n'));
          return;
        }
        
        // For regular text, translate the whole thing
        resolve(this.mockTranslateLine(text, targetLang));
      }, 100);
    });
  },

  /**
   * Mock translation function for demonstration
   * @param line Single line of text to translate
   * @param targetLang Target language code
   * @returns Translated line
   */
  mockTranslateLine(line: string, targetLang: string): string {
    // Mock translations for common markdown elements and content
    const mockTranslations = {
      "hi": {
        // Headers
        "# ": "# ",
        "## ": "## ",
        "### ": "### ",
        
        // Common sections
        "Summary of": "सारांश",
        "Key Concepts": "मुख्य अवधारणाएं",
        "Introduction to the Subject": "विषय का परिचय",
        "Core Theoretical Frameworks": "मुख्य सैद्धांतिक ढांचे",
        "Practical Applications": "व्यावहारिक अनुप्रयोग",
        "Important Points": "महत्वपूर्ण बिंदु",
        "Recommended Focus Areas": "अनुशंसित फोकस क्षेत्र",
        
        // Common phrases
        "document": "दस्तावेज़",
        "documents": "दस्तावेज़",
        "Definition and scope of the field": "क्षेत्र की परिभाषा और दायरा",
        "Historical context": "ऐतिहासिक संदर्भ",
        "development": "विकास",
        "Key figures and their contributions": "प्रमुख व्यक्ति और उनके योगदान",
        "Primary models and theories": "प्राथमिक मॉडल और सिद्धांत",
        "Comparative analysis of different approaches": "विभिन्न दृष्टिकोणों का तुलनात्मक विश्लेषण",
        "Recent developments and current consensus": "हालिया विकास और वर्तमान सहमति",
        "Real-world examples and case studies": "वास्तविक उदाहरण और केस स्टडी",
        "Methodological considerations": "पद्धतिगत विचार",
        "Best practices and implementation guidelines": "सर्वोत्तम प्रथाएं और कार्यान्वयन दिशानिर्देश",
        "The field has evolved significantly over the past decades, with several paradigm shifts": "क्षेत्र पिछले दशकों में महत्वपूर्ण रूप से विकसित हुआ है, कई प्रतिमान बदलावों के साथ",
        "Current research focuses on integrating traditional approaches with new technological advancements": "वर्तमान अनुसंधान पारंपरिक दृष्टिकोणों को नई तकनीकी प्रगति के साथ एकीकृत करने पर केंद्रित है",
        "Multiple perspectives exist on key issues, with ongoing debates among experts": "प्रमुख मुद्दों पर कई दृष्टिकोण मौजूद हैं, विशेषज्ञों के बीच चल रही बहस के साथ",
        "Practical applications require careful consideration of context and specific variables": "व्यावहारिक अनुप्रयोगों के लिए संदर्भ और विशिष्ट चर पर सावधानीपूर्वक विचार की आवश्यकता होती है",
        "Based on the content complexity, special attention should be given to": "सामग्री की जटिलता के आधार पर, विशेष ध्यान दिया जाना चाहिए",
        "Understanding the theoretical foundations before moving to applications": "अनुप्रयोगों पर जाने से पहले सैद्धांतिक आधारों को समझना",
        "Exploring the interconnections between different concepts": "विभिन्न अवधारणाओं के बीच अंतर्संबंधों का पता लगाना",
        "Recognizing common misconceptions and how to avoid them": "सामान्य गलत धारणाओं को पहचानना और उनसे कैसे बचें"
      },
      "kn": {
        // Headers
        "# ": "# ",
        "## ": "## ",
        "### ": "### ",
        
        // Common sections
        "Summary of": "ಸಾರಾಂಶ",
        "Key Concepts": "ಪ್ರಮುಖ ಪರಿಕಲ್ಪನೆಗಳು",
        "Introduction to the Subject": "ವಿಷಯದ ಪರಿಚಯ",
        "Core Theoretical Frameworks": "ಮೂಲ ಸೈದ್ಧಾಂತಿಕ ಚೌಕಟ್ಟುಗಳು",
        "Practical Applications": "ಪ್ರಾಯೋಗಿಕ ಅಪ್ಲಿಕೇಶನ್‌ಗಳು",
        "Important Points": "ಮುಖ್ಯ ಅಂಶಗಳು",
        "Recommended Focus Areas": "ಶಿಫಾರಸು ಮಾಡಿದ ಫೋಕಸ್ ಪ್ರದೇಶಗಳು",
        
        // Common phrases
        "document": "ದಾಖಲೆ",
        "documents": "ದಾಖಲೆಗಳು",
        "Definition and scope of the field": "ಕ್ಷೇತ್ರದ ವ್ಯಾಖ್ಯಾನ ಮತ್ತು ವ್ಯಾಪ್ತಿ",
        "Historical context and development": "ಐತಿಹಾಸಿಕ ಸಂದರ್ಭ ಮತ್ತು ಅಭಿವೃದ್ಧಿ",
        "Key figures and their contributions": "ಪ್ರಮುಖ ವ್ಯಕ್ತಿಗಳು ಮತ್ತು ಅವರ ಕೊಡುಗೆಗಳು",
        "Primary models and theories": "ಪ್ರಾಥಮಿಕ ಮಾದರಿಗಳು ಮತ್ತು ಸಿದ್ಧಾಂತಗಳು",
        "Comparative analysis of different approaches": "ವಿಭಿನ್ನ ವಿಧಾನಗಳ ತುಲನಾತ್ಮಕ ವಿಶ್ಲೇಷಣೆ",
        "Recent developments and current consensus": "ಇತ್ತೀಚಿನ ಬೆಳವಣಿಗೆಗಳು ಮತ್ತು ಪ್ರಸ್ತುತ ಒಮ್ಮತ",
        "Real-world examples and case studies": "ವಾಸ್ತವ ಜಗತ್ತಿನ ಉದಾಹರಣೆಗಳು ಮತ್ತು ಪ್ರಕರಣ ಅಧ್ಯಯನಗಳು",
        "Methodological considerations": "ವಿಧಾನಾತ್ಮಕ ಪರಿಗಣನೆಗಳು",
        "Best practices and implementation guidelines": "ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು ಮತ್ತು ಅನುಷ್ಠಾನ ಮಾರ್ಗಸೂಚಿಗಳು",
        "The field has evolved significantly over the past decades, with several paradigm shifts": "ಕ್ಷೇತ್ರವು ಹಲವಾರು ಪ್ಯಾರಾಡೈಮ್ ಬದಲಾವಣೆಗಳೊಂದಿಗೆ ಕಳೆದ ದಶಕಗಳಲ್ಲಿ ಗಮನಾರ್ಹವಾಗಿ ವಿಕಸನಗೊಂಡಿದೆ",
        "Current research focuses on integrating traditional approaches with new technological advancements": "ಪ್ರಸ್ತುತ ಸಂಶೋಧನೆಯು ಸಾಂಪ್ರದಾಯಿಕ ವಿಧಾನಗಳನ್ನು ಹೊಸ ತಾಂತ್ರಿಕ ಪ್ರಗತಿಗಳೊಂದಿಗೆ ಸಂಯೋಜಿಸುವ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸುತ್ತದೆ",
        "Multiple perspectives exist on key issues, with ongoing debates among experts": "ಪ್ರಮುಖ ವಿಷಯಗಳ ಬಗ್ಗೆ ಬಹು ದೃಷ್ಟಿಕೋನಗಳು ಅಸ್ತಿತ್ವದಲ್ಲಿವೆ, ತಜ್ಞರ ನಡುವೆ ನಡೆಯುತ್ತಿರುವ ಚರ್ಚೆಗಳೊಂದಿಗೆ",
        "Practical applications require careful consideration of context and specific variables": "ಪ್ರಾಯೋಗಿಕ ಅಪ್ಲಿಕೇಶನ್‌ಗಳು ಸಂದರ್ಭ ಮತ್ತು ನಿರ್ದಿಷ್ಟ ವೇರಿಯೇಬಲ್‌ಗಳ ಎಚ್ಚರಿಕೆಯ ಪರಿಗಣನೆಯ ಅಗತ್ಯವಿದೆ",
        "Based on the content complexity, special attention should be given to": "ವಿಷಯದ ಸಂಕೀರ್ಣತೆಯ ಆಧಾರದ ಮೇಲೆ, ವಿಶೇಷ ಗಮನವನ್ನು ನೀಡಬೇಕು",
        "Understanding the theoretical foundations before moving to applications": "ಅಪ್ಲಿಕೇಶನ್‌ಗಳಿಗೆ ಹೋಗುವ ಮೊದಲು ಸೈದ್ಧಾಂತಿಕ ಅಡಿಪಾಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು",
        "Exploring the interconnections between different concepts": "ವಿಭಿನ್ನ ಪರಿಕಲ್ಪನೆಗಳ ನಡುವಿನ ಅಂತರ್ಸಂಪರ್ಕಗಳನ್ನು ಅನ್ವೇಷಿಸುವುದು",
        "Recognizing common misconceptions and how to avoid them": "ಸಾಮಾನ್ಯ ತಪ್ಪುಗ್ರಹಿಕೆಗಳನ್ನು ಗುರುತಿಸುವುದು ಮತ್ತು ಅವುಗಳನ್ನು ಹೇಗೆ ತಪ್ಪಿಸುವುದು"
      },
      "te": {
        // Headers
        "# ": "# ",
        "## ": "## ",
        "### ": "### ",
        
        // Common sections
        "Summary of": "సారాంశం",
        "Key Concepts": "ముఖ్య భావనలు",
        "Introduction to the Subject": "విషయానికి పరిచయం",
        "Core Theoretical Frameworks": "ప్రధాన సైద్ధాంతిక చట్రాలు",
        "Practical Applications": "ప్రాక్టికల్ అప్లికేషన్లు",
        "Important Points": "ముఖ్యమైన అంశాలు",
        "Recommended Focus Areas": "సిఫార్సు చేయబడిన ఫోకస్ ప్రాంతాలు",
        
        // Common content parts and phrases
        "Definition and scope of the field": "రంగం యొక్క నిర్వచనం మరియు పరిధి",
        "Historical context and development": "చారిత్రక సందర్భం మరియు అభివృద్ధి",
        "Key figures and their contributions": "ముఖ్య వ్యక్తులు మరియు వారి సహకారాలు",
        "Primary models and theories": "ప్రాథమిక మోడల్స్ మరియు సిద్ధాంతాలు",
        "Comparative analysis of different approaches": "వేర్వేరు విధానాల తులనాత్మక విశ్లేషణ",
        "Recent developments and current consensus": "ఇటీవలి పరిణామాలు మరియు ప్రస్తుత సమ్మతి",
        "Real-world examples and case studies": "నిజ ప్రపంచ ఉదాహరణలు మరియు కేస్ స్టడీలు",
        "Methodological considerations": "పద్ధతిపరమైన పరిగణనలు",
        "Best practices and implementation guidelines": "ఉత్తమ పద్ధతులు మరియు అమలు మార్గదర్శకాలు",
        "The field has evolved significantly over the past decades, with several paradigm shifts": "ఈ రంగం గత దశాబ్దాలుగా అనేక పారాడైమ్ మార్పులతో గణనీయంగా అభివృద్ధి చెందింది",
        "Current research focuses on integrating traditional approaches with new technological advancements": "ప్రస్తుత పరిశోధన సాంప్రదాయ విధానాలను కొత్త సాంకేతిక పురోగతులతో సమన్వయం చేయడంపై దృష్టి పెడుతోంది",
        "Multiple perspectives exist on key issues, with ongoing debates among experts": "నిపుణుల మధ్య కొనసాగుతున్న చర్చలతో ముఖ్య సమస్యలపై బహుళ దృక్కోణాలు ఉన్నాయి",
        "Practical applications require careful consideration of context and specific variables": "ప్రాక్టికల్ అప్లికేషన్లకు సందర్భం మరియు నిర్దిష్ట వేరియబుల్స్ పట్ల జాగ్రత్తగా పరిగణన అవసరం",
        "Based on the content complexity, special attention should be given to": "కంటెంట్ సంక్లిష్టత ఆధారంగా, ప్రత్యేక శ్రద్ధ ఇవ్వవలసినవి",
        "Understanding the theoretical foundations before moving to applications": "అప్లికేషన్లకు వెళ్లడానికి ముందు సైద్ధాంతిక పునాదులను అర్థం చేసుకోవడం",
        "Exploring the interconnections between different concepts": "వివిధ భావనల మధ్య అంతర్సంబంధాలను అన్వేషించడం",
        "Recognizing common misconceptions and how to avoid them": "సాధారణ అపోహలను గుర్తించడం మరియు వాటిని ఎలా నివారించాలో తెలుసుకోవడం"
      },
      "ta": {
        // Headers
        "# ": "# ",
        "## ": "## ",
        "### ": "### ",
        
        // Common sections
        "Summary of": "சுருக்கம்",
        "Key Concepts": "முக்கிய கருத்துக்கள்",
        "Introduction to the Subject": "பொருளுக்கான அறிமுகம்",
        "Core Theoretical Frameworks": "அடிப்படை கோட்பாட்டு கட்டமைப்புகள்",
        "Practical Applications": "நடைமுறை பயன்பாடுகள்",
        "Important Points": "முக்கிய புள்ளிகள்",
        "Recommended Focus Areas": "பரிந்துரைக்கப்பட்ட கவனம் செலுத்தும் பகுதிகள்",
        
        // Common content parts and phrases
        "Definition and scope of the field": "துறையின் வரையறை மற்றும் பரப்பு",
        "Historical context and development": "வரலாற்று சூழல் மற்றும் வளர்ச்சி",
        "Key figures and their contributions": "முக்கிய நபர்கள் மற்றும் அவர்களின் பங்களிப்புகள்",
        "Primary models and theories": "முதன்மை மாதிரிகள் மற்றும் கோட்பாடுகள்",
        "Comparative analysis of different approaches": "வெவ்வேறு அணுகுமுறைகளின் ஒப்பீட்டு பகுப்பாய்வு",
        "Recent developments and current consensus": "சமீபத்திய வளர்ச்சிகள் மற்றும் தற்போதைய ஒருமித்த கருத்து",
        "Real-world examples and case studies": "உண்மை உலக எடுத்துக்காட்டுகள் மற்றும் வழக்கு ஆய்வுகள்",
        "Methodological considerations": "முறையியல் கருத்துகள்",
        "Best practices and implementation guidelines": "சிறந்த நடைமுறைகள் மற்றும் செயல்படுத்துதல் வழிகாட்டுதல்கள்",
        "The field has evolved significantly over the past decades, with several paradigm shifts": "இந்த துறை கடந்த பத்தாண்டுகளில் பல்வேறு அடிப்படை மாற்றங்களுடன் குறிப்பிடத்தக்க அளவில் வளர்ந்துள்ளது",
        "Current research focuses on integrating traditional approaches with new technological advancements": "தற்போதைய ஆராய்ச்சி பாரம்பரிய அணுகுமுறைகளை புதிய தொழில்நுட்ப முன்னேற்றங்களுடன் ஒருங்கிணைப்பதில் கவனம் செலுத்துகிறது",
        "Multiple perspectives exist on key issues, with ongoing debates among experts": "வல்லுநர்களிடையே நடந்து வரும் விவாதங்களுடன், முக்கிய பிரச்சினைகளில் பல கண்ணோட்டங்கள் உள்ளன",
        "Practical applications require careful consideration of context and specific variables": "நடைமுறை பயன்பாடுகளுக்கு சூழல் மற்றும் குறிப்பிட்ட மாறிகளின் கவனமான பரிசீலனை தேவை",
        "Based on the content complexity, special attention should be given to": "உள்ளடக்கத்தின் சிக்கலின் அடிப்படையில், சிறப்பு கவனம் செலுத்த வேண்டியவை",
        "Understanding the theoretical foundations before moving to applications": "பயன்பாடுகளுக்கு செல்வதற்கு முன் கோட்பாட்டு அடித்தளங்களை புரிந்து கொள்வது",
        "Exploring the interconnections between different concepts": "வெவ்வேறு கருத்துக்களுக்கு இடையேயான இணைப்புகளை ஆராய்தல்",
        "Recognizing common misconceptions and how to avoid them": "பொதுவான தவறான கருத்துக்களை அடையாளம் காணுதல் மற்றும் அவற்றை எவ்வாறு தவிர்ப்பது"
      },
      "fr": {
        // Headers
        "# ": "# ",
        "## ": "## ",
        "### ": "### ",
        
        // Common sections
        "Summary of": "Résumé de",
        "Key Concepts": "Concepts clés",
        "Introduction to the Subject": "Introduction au sujet",
        "Core Theoretical Frameworks": "Cadres théoriques fondamentaux",
        "Practical Applications": "Applications pratiques",
        "Important Points": "Points importants",
        "Recommended Focus Areas": "Domaines d'attention recommandés",
        
        // Common content parts
        "Definition and scope of the field": "Définition et portée du domaine",
        "Historical context and development": "Contexte historique et développement",
        "Key figures and their contributions": "Personnalités clés et leurs contributions",
        "Primary models and theories": "Modèles et théories principaux",
        "Comparative analysis of different approaches": "Analyse comparative des différentes approches",
        "Recent developments and current consensus": "Développements récents et consensus actuel",
        "Real-world examples and case studies": "Exemples concrets et études de cas",
        "Methodological considerations": "Considérations méthodologiques",
        "Best practices and implementation guidelines": "Meilleures pratiques et directives de mise en œuvre"
      }
    };
    
    // For headers (keep the formatting)
    if (line.startsWith('#')) {
      const headerParts = line.split(' ');
      const headerLevel = headerParts[0];
      const headerText = headerParts.slice(1).join(' ');
      
      // Try to translate the header text
      if (mockTranslations[targetLang]) {
        // Look for direct translation of this header
        const directTranslation = mockTranslations[targetLang][headerText];
        if (directTranslation) {
          return `${headerLevel} ${directTranslation}`;
        }
        
        // Otherwise try phrase-by-phrase translation
        let translatedText = headerText;
        for (const [phrase, translation] of Object.entries(mockTranslations[targetLang])) {
          // Skip header markers
          if (phrase.startsWith('#')) continue;
          
          // Replace phrases that match
          const regex = new RegExp(`\\b${this.escapeRegExp(phrase)}\\b`, 'gi');
          translatedText = translatedText.replace(regex, translation.toString());
        }
        
        return `${headerLevel} ${translatedText}`;
      }
    }
    
    // For bullet points
    if (line.startsWith('-') || line.match(/^\d+\./)) {
      const bulletMatch = line.match(/^(-|\d+\.)\s+(.*)/);
      if (bulletMatch) {
        const bullet = bulletMatch[1];
        const text = bulletMatch[2];
        
        // Try to translate the bullet point text
        if (mockTranslations[targetLang]) {
          // Look for direct translation
          const directTranslation = mockTranslations[targetLang][text];
          if (directTranslation) {
            return `${bullet} ${directTranslation}`;
          }
          
          // Otherwise try phrase-by-phrase translation
          let translatedText = text;
          for (const [phrase, translation] of Object.entries(mockTranslations[targetLang])) {
            // Skip formatting markers
            if (phrase.startsWith('#') || phrase === '-') continue;
            
            // Replace phrases that match
            const regex = new RegExp(`\\b${this.escapeRegExp(phrase)}\\b`, 'gi');
            translatedText = translatedText.replace(regex, translation.toString());
          }
          
          return `${bullet} ${translatedText}`;
        }
      }
    }
    
    // For regular text, try direct and then phrase-by-phrase translation
    if (mockTranslations[targetLang]) {
      // First check for direct translation of the whole line
      const directTranslation = mockTranslations[targetLang][line];
      if (directTranslation) {
        return directTranslation.toString();
      }
      
      // Otherwise try phrase-by-phrase translation
      let translatedLine = line;
      
      // Sort phrases by length (descending) to ensure larger phrases are replaced first
      const phrases = Object.keys(mockTranslations[targetLang]).sort((a, b) => b.length - a.length);
      
      for (const phrase of phrases) {
        // Skip formatting markers
        if (phrase.startsWith('#') || phrase === '-') continue;
        
        const translation = mockTranslations[targetLang][phrase];
        // Use word boundary for more accurate replacements
        const regex = new RegExp(`\\b${this.escapeRegExp(phrase)}\\b`, 'gi');
        translatedLine = translatedLine.replace(regex, translation.toString());
      }
      
      return translatedLine;
    }
    
    // If we can't translate, return the original
    return line;
  },
  
  // Helper function to escape special characters for regex
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },

  /**
   * Detect language of text
   * @param text Text to analyze
   * @returns Detected language code
   */
  detectLanguage(text: string): string {
    // This would use a language detection API in a real app
    // For demonstration, we'll assume English
    return "en";
  },

  /**
   * Whether auto-translate is enabled
   */
  isAutoTranslateEnabled(): boolean {
    return localStorage.getItem("studybuddy_autoTranslate") === "true";
  },

  /**
   * Get current language
   */
  getCurrentLanguage(): string {
    return localStorage.getItem("studybuddy_language") || "en";
  },
  
  /**
   * Available languages in the application
   */
  getAvailableLanguages(): Array<{ code: string; name: string }> {
    return [
      { code: "en", name: "English" },
      { code: "fr", name: "French" },
      { code: "de", name: "German" },
      { code: "ja", name: "Japanese" },
      { code: "ar", name: "Arabic" },
      { code: "hi", name: "Hindi" },
      { code: "kn", name: "Kannada" },
      { code: "te", name: "Telugu" },
      { code: "ta", name: "Tamil" }
    ];
  }
};

export default translationService;
