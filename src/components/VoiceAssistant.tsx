import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Mic, MicOff, Volume2, PlayCircle, PauseCircle } from 'lucide-react';

// Extend the Window interface for SpeechRecognition types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// If SpeechRecognition is not defined, define it as any to avoid TS errors
// @ts-ignore
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

type VoiceAssistantProps = {
  mode?: 'button' | 'full'; // button mode for QuickActions, full for detailed implementation
  onSpeechResult?: (text: string) => void; // Callback when speech is recognized
  speakDirections?: boolean; // For store map navigation
  directions?: string; // Directions to speak out
  className?: string;
  language?: 'en' | 'hi'; // Language selection (English or Hindi)
};

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  mode = 'button',
  onSpeechResult,
  speakDirections = false,
  directions = '',
  className = '',
  language = 'en',
}) => {
  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    // Check browser support for SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language === 'en' ? 'en-US' : 'hi-IN';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');

        setSpeechText(transcript);
        
        // If we have a final result, call the callback
        if (event.results[0].isFinal && onSpeechResult) {
          onSpeechResult(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        // Only set isListening to false if we didn't manually stop it
        if (isListening) {
          recognitionRef.current?.start();
        }
      };

      recognitionRef.current = recognition;
    } else {
      console.error('Speech recognition not supported');
    }

    // Initialize speech synthesis
    if (window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
      
      // Get available voices
      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || [];
        setAvailableVoices(voices);
        
        // Select a voice based on language preference
        const preferredLangPrefix = language === 'en' ? 'en-' : 'hi-';
        const preferredVoice = voices.find(voice => voice.lang.startsWith(preferredLangPrefix));
        
        if (preferredVoice) {
          setSelectedVoice(preferredVoice);
        } else if (language === 'hi') {
          // Fallback for Hindi - try to find any Indian voice
          const indianVoice = voices.find(voice => voice.lang.startsWith('en-IN'));
          if (indianVoice) {
            setSelectedVoice(indianVoice);
          } else if (voices.length > 0) {
            setSelectedVoice(voices[0]); // Default fallback
          }
        } else if (voices.length > 0) {
          setSelectedVoice(voices[0]); // Default fallback
        }
      };
      
      loadVoices();
      
      // Chrome requires waiting for the voiceschanged event
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    // Cleanup function
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, [onSpeechResult]);

  // Handle directions to speak when they change
  useEffect(() => {
    if (speakDirections && directions && !isSpeaking) {
      speakText(directions);
    }
  }, [directions, speakDirections]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setSpeechText('');
    setIsListening(true);
    recognitionRef.current?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current?.stop();
  };

  const speakText = useCallback((text: string) => {
    if (!synthRef.current) return;
    
    // Cancel any ongoing speech
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error', event);
      setIsSpeaking(false);
    };
    
    synthRef.current.speak(utterance);
  }, [selectedVoice]);

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Process user query - enhanced with multilingual support and wider command recognition
  const processQuery = useCallback((query: string) => {
    let response = '';
    
    // Define responses in both English and Hindi
    const translations = {
      en: {
        dairyResponse: "Milk and dairy products are in the Dairy section, located at the back of the store. Would you like me to guide you there?",
        bakeryResponse: "Bread and bakery items are in the Bakery section, located on the right side of the store. Would you like me to guide you there?",
        fruitResponse: "Fresh fruits are in the Produce section, located at the front left of the store. Would you like me to guide you there?",
        checkoutResponse: "The checkout lanes are at the front of the store. The self-checkout stations are on the right side of the checkout area.",
        vegetablesResponse: "Fresh vegetables are in the Produce section, next to the fruits, at the front left of the store.",
        meatResponse: "Meat and seafood are in their dedicated section at the back right corner of the store.",
        helpResponse: "I can help you find products, check prices, or provide directions in the store. What would you like help with?",
        thanksResponse: "You're welcome! Happy to help with your shopping experience.",
        greetingResponse: "Hello! How can I help with your shopping today?",
        fallbackResponse: "I'm sorry, I didn't understand your question. You can ask me about product locations, store services, or request assistance with your shopping."
      },
      hi: {
        dairyResponse: "दूध और डेयरी उत्पाद डेयरी सेक्शन में हैं, जो स्टोर के पीछे की तरफ स्थित है। क्या आप चाहते हैं कि मैं आपको वहां ले जाऊं?",
        bakeryResponse: "ब्रेड और बेकरी आइटम बेकरी सेक्शन में हैं, जो स्टोर के दाईं ओर स्थित है। क्या आप चाहते हैं कि मैं आपको वहां ले जाऊं?",
        fruitResponse: "ताजे फल प्रोड्यूस सेक्शन में हैं, जो स्टोर के आगे बाईं ओर स्थित है। क्या आप चाहते हैं कि मैं आपको वहां ले जाऊं?",
        checkoutResponse: "चेकआउट लेन स्टोर के सामने हैं। सेल्फ-चेकआउट स्टेशन चेकआउट क्षेत्र के दाईं ओर हैं।",
        vegetablesResponse: "ताजी सब्जियां प्रोड्यूस सेक्शन में हैं, फलों के पास, स्टोर के आगे बाईं ओर।",
        meatResponse: "मांस और समुद्री भोजन अपने समर्पित अनुभाग में स्टोर के पिछले दाएं कोने पर हैं।",
        helpResponse: "मैं आपको उत्पाद ढूंढने, कीमतें जांचने, दिशानिर्देश प्राप्त करने में मदद कर सकता हूं। आप किस प्रकार की मदद चाहते हैं?",
        thanksResponse: "आपका स्वागत है! आपके शॉपिंग अनुभव में मदद करके खुशी हुई।",
        greetingResponse: "नमस्ते! आज मैं आपकी शॉपिंग में कैसे मदद कर सकता हूं?",
        fallbackResponse: "मुझे माफ करें, मैं आपका सवाल नहीं समझा। आप मुझसे उत्पाद स्थानों, स्टोर सेवाओं के बारे में पूछ सकते हैं।"
      }
    };
    
    const t = translations[language]; // Get translations for current language
    const lowerQuery = query.toLowerCase();
    
    // Enhanced pattern matching for a wider range of commands and questions
    // Product location queries
    if ((lowerQuery.includes('where') || lowerQuery.includes('find') || lowerQuery.includes('locate') || 
         lowerQuery.includes('कहां') || lowerQuery.includes('कहा') || lowerQuery.includes('ढूंढें')) && 
        (lowerQuery.includes('milk') || lowerQuery.includes('dairy') || lowerQuery.includes('दूध'))) {
      response = t.dairyResponse;
    } 
    else if ((lowerQuery.includes('where') || lowerQuery.includes('find') || lowerQuery.includes('locate') || 
              lowerQuery.includes('कहां') || lowerQuery.includes('कहा') || lowerQuery.includes('ढूंढें')) && 
             (lowerQuery.includes('bread') || lowerQuery.includes('bakery') || lowerQuery.includes('ब्रेड'))) {
      response = t.bakeryResponse;
    }
    else if ((lowerQuery.includes('where') || lowerQuery.includes('find') || lowerQuery.includes('locate') || 
              lowerQuery.includes('कहां') || lowerQuery.includes('कहा') || lowerQuery.includes('ढूंढें')) && 
             (lowerQuery.includes('fruit') || lowerQuery.includes('apple') || lowerQuery.includes('फल'))) {
      response = t.fruitResponse;
    }
    else if ((lowerQuery.includes('where') || lowerQuery.includes('find') || lowerQuery.includes('locate') || 
              lowerQuery.includes('कहां') || lowerQuery.includes('कहा') || lowerQuery.includes('ढूंढें')) && 
             (lowerQuery.includes('checkout') || lowerQuery.includes('pay') || lowerQuery.includes('चेकआउट'))) {
      response = t.checkoutResponse;
    }
    else if ((lowerQuery.includes('where') || lowerQuery.includes('find') || lowerQuery.includes('locate') || 
              lowerQuery.includes('कहां') || lowerQuery.includes('कहा') || lowerQuery.includes('ढूंढें')) && 
             (lowerQuery.includes('vegetable') || lowerQuery.includes('veggies') || lowerQuery.includes('सब्जी'))) {
      response = t.vegetablesResponse;
    }
    else if ((lowerQuery.includes('where') || lowerQuery.includes('find') || lowerQuery.includes('locate') || 
              lowerQuery.includes('कहां') || lowerQuery.includes('कहा') || lowerQuery.includes('ढूंढें')) && 
             (lowerQuery.includes('meat') || lowerQuery.includes('chicken') || lowerQuery.includes('मांस'))) {
      response = t.meatResponse;
    }
    
    // Help and greeting
    else if (lowerQuery.includes('help') || lowerQuery.includes('मदद') || lowerQuery.includes('सहायता')) {
      response = t.helpResponse;
    }
    else if (lowerQuery.includes('thank') || lowerQuery.includes('धन्यवाद')) {
      response = t.thanksResponse;
    }
    else if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey') || 
             lowerQuery.includes('नमस्ते') || lowerQuery.includes('हैलो')) {
      response = t.greetingResponse;
    }
    else {
      response = t.fallbackResponse;
    }
    
    speakText(response);
    return response;
  }, [speakText, language]);

  // Handle speech recognition results
  useEffect(() => {
    if (!isListening && speechText && onSpeechResult) {
      const result = processQuery(speechText);
      onSpeechResult(result);
    }
  }, [isListening, speechText, onSpeechResult, processQuery]);

  // State for language selection
  const [currentLanguage, setCurrentLanguage] = useState(language);

  // Effect to update language when prop changes
  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  // Toggle language between English and Hindi
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
    
    // Update recognition language
    if (recognitionRef.current) {
      recognitionRef.current.lang = newLanguage === 'en' ? 'en-US' : 'hi-IN';
    }
    
    // Update selected voice for speech synthesis
    if (availableVoices.length > 0) {
      const preferredLangPrefix = newLanguage === 'en' ? 'en-' : 'hi-';
      const preferredVoice = availableVoices.find(voice => voice.lang.startsWith(preferredLangPrefix));
      if (preferredVoice) {
        setSelectedVoice(preferredVoice);
      } else if (newLanguage === 'hi') {
        // Fallback for Hindi - try to find any Indian voice
        const indianVoice = availableVoices.find(voice => voice.lang.startsWith('en-IN'));
        if (indianVoice) {
          setSelectedVoice(indianVoice);
        }
      }
    }
  };

  // Render button-only mode (for QuickActions)
  if (mode === 'button') {
    return (
      <div className={`relative ${className}`}>
        <div className="flex flex-col items-center">
          <button
            onClick={toggleListening}
            className={`w-12 h-12 ${isListening 
              ? 'bg-gradient-to-br from-red-500 to-red-600 animate-pulse' 
              : 'bg-gradient-to-br from-purple-500 to-purple-600'} 
              rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
            title={isListening ? "Stop Listening" : "Voice Assistant"}
          >
            {isListening ? (
              <MicOff className="h-6 w-6 text-white" />
            ) : (
              <Mic className="h-6 w-6 text-white" />
            )}
          </button>
          <span className="text-sm font-medium text-gray-800">Voice Assistant</span>
          
          <div className="mt-2 flex items-center space-x-2">
            <button 
              onClick={toggleLanguage} 
              className={`text-xs px-2 py-0.5 rounded ${currentLanguage === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              title="English"
            >
              EN
            </button>
            <button 
              onClick={toggleLanguage} 
              className={`text-xs px-2 py-0.5 rounded ${currentLanguage === 'hi' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              title="Hindi"
            >
              हिं
            </button>
          </div>
        </div>
        
        {isListening && (
          <div className="absolute -top-1 -right-1 flex space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-300"></div>
          </div>
        )}
      </div>
    );
  }

  // Render full mode with controls and text display
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${isListening 
            ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse' 
            : 'bg-gradient-to-r from-purple-500 to-purple-600'} 
            rounded-full flex items-center justify-center`}>
            {isListening ? (
              <MicOff className="h-5 w-5 text-white" />
            ) : (
              <Mic className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Voice Assistant</h3>
            <p className="text-sm text-gray-600">
              {isListening ? 
                (currentLanguage === 'en' ? 'Listening...' : 'सुन रहा हूं...') : 
                (currentLanguage === 'en' ? 'Ask me anything about the store' : 'स्टोर के बारे में कुछ भी पूछें')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Language toggle */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => currentLanguage !== 'en' && toggleLanguage()}
              className={`px-3 py-1 text-sm ${currentLanguage === 'en' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => currentLanguage !== 'hi' && toggleLanguage()}
              className={`px-3 py-1 text-sm ${currentLanguage === 'hi' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              title="Hindi"
            >
              हिं
            </button>
          </div>

          {isSpeaking && (
            <button 
              onClick={stopSpeaking}
              className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
              title="Stop Speaking"
            >
              <PauseCircle className="h-5 w-5" />
            </button>
          )}
          <button 
            onClick={toggleListening}
            className={`p-3 rounded-xl text-white ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
            } transition-colors`}
          >
            {isListening ? 
              (currentLanguage === 'en' ? 'Stop' : 'रोकें') : 
              (currentLanguage === 'en' ? 'Start Listening' : 'सुनना शुरू करें')}
          </button>
        </div>
      </div>
      
      {speakDirections && directions && (
        <div className="mb-4 bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-blue-600" />
              <h4 className="font-medium text-blue-800">Navigation Directions:</h4>
            </div>
            <button
              onClick={() => speakText(directions)}
              className="p-2 bg-blue-200 text-blue-700 rounded-full hover:bg-blue-300 transition-colors"
              title="Play Directions"
            >
              <PlayCircle className="h-4 w-4" />
            </button>
          </div>
          <p className="text-blue-700 mt-2 text-sm">{directions}</p>
        </div>
      )}
      
      {speechText && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 mb-2">I heard:</h4>
          <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
            {speechText || "..."}
          </div>
        </div>
      )}
      
      {!isListening && speechText && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 mb-2">Response:</h4>
          <div className="bg-emerald-50 rounded-lg p-3 text-gray-800">
            {processQuery(speechText)}
          </div>
        </div>
      )}
      
      <div className="mt-6 border-t border-gray-100 pt-4">
        <h4 className="font-medium text-gray-700 mb-2">{currentLanguage === 'en' ? 'Try asking:' : 'इन्हें आज़माएं:'}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {currentLanguage === 'en' ? (
            <>
              <button
                onClick={() => speakText("Where can I find milk?")}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 text-sm text-left text-gray-800 transition-colors"
              >
                "Where can I find milk?"
              </button>
              <button
                onClick={() => speakText("Where is the bakery section?")}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 text-sm text-left text-gray-800 transition-colors"
              >
                "Where is the bakery section?"
              </button>
              <button
                onClick={() => speakText("I need help finding fresh fruit.")}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 text-sm text-left text-gray-800 transition-colors"
              >
                "I need help finding fresh fruit."
              </button>
              <button
                onClick={() => speakText("Where are the checkout lanes?")}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 text-sm text-left text-gray-800 transition-colors"
              >
                "Where are the checkout lanes?"
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => speakText("मुझे दूध कहाँ मिल सकता है?")}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 text-sm text-left text-gray-800 transition-colors"
              >
                "मुझे दूध कहाँ मिल सकता है?"
              </button>
              <button
                onClick={() => speakText("बेकरी सेक्शन कहां है?")}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 text-sm text-left text-gray-800 transition-colors"
              >
                "बेकरी सेक्शन कहां है?"
              </button>
              <button
                onClick={() => speakText("मुझे ताजे फल ढूंढने में मदद चाहिए।")}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 text-sm text-left text-gray-800 transition-colors"
              >
                "मुझे ताजे फल ढूंढने में मदद चाहिए।"
              </button>
              <button
                onClick={() => speakText("चेकआउट लेन्स कहाँ हैं?")}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 text-sm text-left text-gray-800 transition-colors"
              >
                "चेकआउट लेन्स कहाँ हैं?"
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;