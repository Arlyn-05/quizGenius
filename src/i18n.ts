import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define translations
const resources = {
  en: {
    translation: {
      "Dashboard": "Dashboard",
      "Upload Content": "Upload Content",
      "Flashcards": "Flashcards",
      "Quizzes": "Quizzes",
      "Smart Notes": "Smart Notes",
      "Settings": "Settings",
      "Language Settings": "Language Settings",
      "Default App Language": "Default App Language",
      "This sets the app's interface language": "This sets the app's interface language",
      "Automatically translate uploaded content": "Automatically translate uploaded content",
      "Save Language Settings": "Save Language Settings",
      "Settings Saved": "Settings Saved",
      "Your preferences have been updated successfully.": "Your preferences have been updated successfully.",
      "Translation Demo": "Translation Demo",
      "Examples of static and dynamic translations": "Examples of static and dynamic translations",
      "Static Translations": "Static Translations",
      "Dynamic Content Translation": "Dynamic Content Translation",
      "Show Translation Examples": "Show Translation Examples",
      "Hide Demo": "Hide Demo"
    }
  },
  fr: {
    translation: {
      "Dashboard": "Tableau de bord",
      "Upload Content": "Télécharger du contenu",
      "Flashcards": "Fiches mémoire",
      "Quizzes": "Quiz",
      "Smart Notes": "Notes intelligentes",
      "Settings": "Paramètres",
      "Language Settings": "Paramètres de langue",
      "Default App Language": "Langue par défaut de l'application",
      "This sets the app's interface language": "Ceci définit la langue de l'interface de l'application",
      "Automatically translate uploaded content": "Traduire automatiquement le contenu téléchargé",
      "Save Language Settings": "Enregistrer les paramètres de langue",
      "Settings Saved": "Paramètres enregistrés",
      "Your preferences have been updated successfully.": "Vos préférences ont été mises à jour avec succès.",
      "Translation Demo": "Démo de Traduction",
      "Examples of static and dynamic translations": "Exemples de traductions statiques et dynamiques",
      "Static Translations": "Traductions Statiques",
      "Dynamic Content Translation": "Traduction de Contenu Dynamique",
      "Show Translation Examples": "Afficher les Exemples de Traduction",
      "Hide Demo": "Masquer la Démo"
    }
  },
  de: {
    translation: {
      "Dashboard": "Dashboard",
      "Upload Content": "Inhalt hochladen",
      "Flashcards": "Karteikarten",
      "Quizzes": "Quiz",
      "Smart Notes": "Intelligente Notizen",
      "Settings": "Einstellungen",
      "Language Settings": "Spracheinstellungen",
      "Default App Language": "Standardsprache der App",
      "This sets the app's interface language": "Dies legt die Sprache der App-Oberfläche fest",
      "Automatically translate uploaded content": "Hochgeladene Inhalte automatisch übersetzen",
      "Save Language Settings": "Spracheinstellungen speichern",
      "Settings Saved": "Einstellungen gespeichert",
      "Your preferences have been updated successfully.": "Ihre Einstellungen wurden erfolgreich aktualisiert.",
      "Translation Demo": "Übersetzungs-Demo",
      "Examples of static and dynamic translations": "Beispiele für statische und dynamische Übersetzungen",
      "Static Translations": "Statische Übersetzungen",
      "Dynamic Content Translation": "Dynamische Inhaltsübersetzung",
      "Show Translation Examples": "Übersetzungsbeispiele anzeigen",
      "Hide Demo": "Demo ausblenden"
    }
  },
  ja: {
    translation: {
      "Dashboard": "ダッシュボード",
      "Upload Content": "コンテンツをアップロード",
      "Flashcards": "フラッシュカード",
      "Quizzes": "クイズ",
      "Smart Notes": "スマートノート",
      "Settings": "設定",
      "Language Settings": "言語設定",
      "Default App Language": "アプリのデフォルト言語",
      "This sets the app's interface language": "これによりアプリのインターフェース言語が設定されます",
      "Automatically translate uploaded content": "アップロードされたコンテンツを自動的に翻訳する",
      "Save Language Settings": "言語設定を保存",
      "Settings Saved": "設定が保存されました",
      "Your preferences have been updated successfully.": "設定が正常に更新されました。",
      "Translation Demo": "翻訳デモ",
      "Examples of static and dynamic translations": "静的および動的翻訳の例",
      "Static Translations": "静的翻訳",
      "Dynamic Content Translation": "動的コンテンツ翻訳",
      "Show Translation Examples": "翻訳例を表示",
      "Hide Demo": "デモを非表示"
    }
  },
  ar: {
    translation: {
      "Dashboard": "لوحة القيادة",
      "Upload Content": "تحميل المحتوى",
      "Flashcards": "البطاقات التعليمية",
      "Quizzes": "الاختبارات",
      "Smart Notes": "ملاحظات ذكية",
      "Settings": "الإعدادات",
      "Language Settings": "إعدادات اللغة",
      "Default App Language": "لغة التطبيق الافتراضية",
      "This sets the app's interface language": "يحدد هذا لغة واجهة التطبيق",
      "Automatically translate uploaded content": "ترجمة المحتوى المحمل تلقائيًا",
      "Save Language Settings": "حفظ إعدادات اللغة",
      "Settings Saved": "تم حفظ الإعدادات",
      "Your preferences have been updated successfully.": "تم تحديث تفضيلاتك بنجاح.",
      "Translation Demo": "عرض الترجمة",
      "Examples of static and dynamic translations": "أمثلة على الترجمات الثابتة والديناميكية",
      "Static Translations": "الترجمات الثابتة",
      "Dynamic Content Translation": "ترجمة المحتوى الديناميكي",
      "Show Translation Examples": "إظهار أمثلة الترجمة",
      "Hide Demo": "إخفاء العرض"
    }
  },
  hi: {
    translation: {
      "Dashboard": "डैशबोर्ड",
      "Upload Content": "सामग्री अपलोड करें",
      "Flashcards": "फ्लैशकार्ड",
      "Quizzes": "प्रश्नोत्तरी",
      "Smart Notes": "स्मार्ट नोट्स",
      "Settings": "सेटिंग्स",
      "Language Settings": "भाषा सेटिंग्स",
      "Default App Language": "डिफ़ॉल्ट ऐप भाषा",
      "This sets the app's interface language": "यह ऐप के इंटरफेस की भाषा सेट करता है",
      "Automatically translate uploaded content": "अपलोड की गई सामग्री का स्वचालित रूप से अनुवाद करें",
      "Save Language Settings": "भाषा सेटिंग्स सहेजें",
      "Settings Saved": "सेटिंग्स सहेजी गईं",
      "Your preferences have been updated successfully.": "आपकी प्राथमिकताएँ सफलतापूर्वक अपडेट कर दी गई हैं।",
      "Translation Demo": "अनुवाद डेमो",
      "Examples of static and dynamic translations": "स्थिर और गतिशील अनुवादों के उदाहरण",
      "Static Translations": "स्थिर अनुवाद",
      "Dynamic Content Translation": "गतिशील सामग्री अनुवाद",
      "Show Translation Examples": "अनुवाद उदाहरण दिखाएं",
      "Hide Demo": "डेमो छिपाएं"
    }
  },
  kn: {
    translation: {
      "Dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      "Upload Content": "ವಿಷಯವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      "Flashcards": "ಫ್ಲಾಷ್‌ಕಾರ್ಡ್‌ಗಳು",
      "Quizzes": "ರಶ್ನೋತ್ತರಗಳು",
      "Smart Notes": "ಸ್ಮಾರ್ಟ್ ನೋಟ್ಸ್",
      "Settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
      "Language Settings": "ಭಾಷಾ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
      "Default App Language": "ಡೀಫಾಲ್ಟ್ ಅಪ್ಲಿಕೇಶನ್ ಭಾಷೆ",
      "This sets the app's interface language": "ಇದು ಅಪ್ಲಿಕೇಶನ್‌ನ ಇಂಟರ್ಫೇಸ್ ಭಾಷೆಯನ್ನು ಹೊಂದಿಸುತ್ತದೆ",
      "Automatically translate uploaded content": "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ವಿಷಯವನ್ನು ಸ್ವಯಂಚಾलಿತವಾಗಿ ಅನುವಾದಿಸಿ",
      "Save Language Settings": "ಭಾಷಾ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಉಳಿಸಿ",
      "Settings Saved": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು ಉಳಿಸಲಾಗಿದೆ",
      "Your preferences have been updated successfully.": "ನಿಮ್ಮ ಆದ್ಯತೆಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ.",
      "Translation Demo": "ಅನುವಾದ ಡೆಮೋ",
      "Examples of static and dynamic translations": "ಸ್ಥಿರ ಮತ್ತು ಡೈನಾಮಿಕ್ ಅನುವಾದಗಳ ಉದಾಹರಣೆಗಳು",
      "Static Translations": "ಸ್ಥಿರ ಅನುವಾದಗಳು",
      "Dynamic Content Translation": "ಡೈನಾಮಿಕ್ ವಿಷಯ ಅನುವಾದ",
      "Show Translation Examples": "ಅನುವಾದ ಉದಾಹರणಗಳನ್ನು ತೋರಿಸಿ",
      "Hide Demo": "ಡೆಮೋ ಮರೆಮಾಡಿ"
    }
  },
  te: {
    translation: {
      "Dashboard": "డాష్‌బోర్డ్",
      "Upload Content": "కంటెంట్‌ను అప్‌లోడ్ చేయండి",
      "Flashcards": "ఫ్లాష్‌కార్డ్‌లు",
      "Quizzes": "క్విజ్‌లు",
      "Smart Notes": "స్మార్� నోట్స్",
      "Settings": "సెట్టింగ్‌లు",
      "Language Settings": "భాష సెట్టింగ్‌లు",
      "Default App Language": "డిఫాల్ట్ యాప్ భాష",
      "This sets the app's interface language": "ఇది యాప్ యొక్క ఇంటర్‌ఫేస్ భాషను సెట్ చేస్తుంది",
      "Automatically translate uploaded content": "అప్‌లోడ్ చేసిన కంటెంట్‌ను స్వయంచాలకంగా అనువదించండి",
      "Save Language Settings": "భాష సెట్టింగ్‌లను సేవ్ చేయండి",
      "Settings Saved": "సెట్టింగ్‌లు సేవ్ చేయబడ్డాయి",
      "Your preferences have been updated successfully.": "మీ ప్రాధాన్యతలు విజయవంతంగా నవీకరించబడ్డాయి.",
      "Translation Demo": "అనువాద డెమో",
      "Examples of static and dynamic translations": "స్థిరమైన మరియు డైనమిక్ అనువాదాల ఉదాహరణలు",
      "Static Translations": "స్థిరమైన అనువాదాలు",
      "Dynamic Content Translation": "డైనమిక్ కంటెంట్ అనువాదం",
      "Show Translation Examples": "అనువాద ఉదాహరणలను చూపించు",
      "Hide Demo": "డెమోను దాచు"
    }
  },
  ta: {
    translation: {
      "Dashboard": "டாஷ்போர்டு",
      "Upload Content": "உள்ளடக்கத்தை பதிவேற்றவும்",
      "Flashcards": "ஃபிளாஷ்கார்டுகள்",
      "Quizzes": "வினாடி வினாக்கள்",
      "Smart Notes": "ஸ்மார்ட் நோட்ஸ்",
      "Settings": "அமைப்புகள்",
      "Language Settings": "மொழி அமைப்புகள்",
      "Default App Language": "இயல்புநிலை ஆப் மொழி",
      "This sets the app's interface language": "இது பயன்பாட்டின் இடைமுக மொழியை அமைக்கிறது",
      "Automatically translate uploaded content": "பதிவேற்றிய உள்ளடக்கத்தை தானாகவே மொழிபெயர்க்கவும்",
      "Save Language Settings": "மொழி அமைப்புகளை சேமிக்கவும்",
      "Settings Saved": "அமைப்புகள் சேமிக்கப்பட்டன",
      "Your preferences have been updated successfully.": "உங்கள் விருப்பங்கள் வெற்றிகரமாக புதுப்பிக்கப்பட்டன.",
      "Translation Demo": "மொழிபெயர்ப்பு டெமோ",
      "Examples of static and dynamic translations": "நிலையான மற்றும் டைனமிக் மொழிபெயர்ப்புகளுக்கான எடுத்துக்காட்டுகள்",
      "Static Translations": "நிலையான மொழிபெயர்ப்புகள்",
      "Dynamic Content Translation": "டைனமிக் உள்ளடக்க மொழிபெயர்ப்பு",
      "Show Translation Examples": "மொழிபெயர்ப்பு எடுத்துக்காட்டுகளைக் காட்டு",
      "Hide Demo": "டெமோவை மறைக்கவும்"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("studybuddy_language") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // React already safes from xss
    }
  });

export default i18n;
