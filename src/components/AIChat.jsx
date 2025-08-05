import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X } from 'lucide-react';

const AIChat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: "Hi! Welcome to DMart! 🏪 I'm here to help with store information, offers, directions, and services. How can I assist you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  const suggestions = [
    "Store hours",
    "Current offers",
    "Product availability",
    "Store directions",
    "Weekly deals",
    "Customer care",
    "Parking info",
    "Store services"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check if message contains any meaningful keywords
    const meaningfulKeywords = [
      'store', 'hours', 'offer', 'product', 'availability', 'direction', 'deal', 
      'customer', 'care', 'support', 'parking', 'service', 'hello', 'hi', 'hey',
      'help', 'location', 'address', 'payment', 'card', 'delivery', 'home', 'thank',
      'price', 'discount', 'sale', 'open', 'close', 'phone', 'number', 'contact',
      'return', 'exchange', 'refund', 'warranty', 'brand', 'quality', 'fresh',
      'grocery', 'electronics', 'clothing', 'book', 'medicine', 'pharmacy'
    ];

    const hasKeyword = meaningfulKeywords.some(keyword => message.includes(keyword));
    
    // Offline store (DMart-like) specific responses
    if (message.includes('store') && message.includes('hour')) {
      return "Our store is open Monday to Sunday from 8:00 AM to 10:00 PM. Extended hours during festivals and special occasions. Store remains closed on major national holidays.";
    }
    
    if (message.includes('current') && message.includes('offer')) {
      return "This week's hot offers: Buy 2 Get 1 Free on household items, 30% off on electronics, Fresh fruits & vegetables at special prices. Check in-store displays for more deals!";
    }
    
    if (message.includes('product') && message.includes('availability')) {
      return "You can check product availability by calling our store at +91-XXXX-XXXXX or visiting our store. Our staff will help you locate items and check stock levels.";
    }
    
    if (message.includes('store') && message.includes('direction')) {
      return "We're located at [Store Address]. Take Metro/Bus to [Nearest Station]. Free parking available. Use Google Maps and search for 'DMart [Location]' for exact directions.";
    }
    
    if (message.includes('weekly') && message.includes('deal')) {
      return "Weekly deals change every Thursday! Current highlights: Grocery combo packs, Home & kitchen appliances discount, Personal care bundle offers. Visit our deals section inside the store.";
    }
    
    if (message.includes('customer') && (message.includes('care') || message.includes('support'))) {
      return "Customer care: Call +91-XXXX-XXXXX (9 AM - 8 PM). For complaints or suggestions, meet our customer service desk at the store entrance. We're here to help!";
    }
    
    if (message.includes('parking') && message.includes('info')) {
      return "Free parking available with 200+ slots. Ground floor parking for easy access. Separate two-wheeler parking area. Security guard available 24/7. Peak hours: 6-9 PM on weekends.";
    }
    
    if (message.includes('store') && message.includes('service')) {
      return "Store services: Home delivery available, Gift wrapping service, Easy returns/exchange, Price match guarantee, Bulk order discounts, Customer loyalty program. Ask our staff for details!";
    }
    
    // Additional common queries
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to DMart family! 🏪 I'm here to help with store information, offers, directions, and services. How can I assist you today?";
    }
    
    if (message.includes('help')) {
      return "I can help you with store hours, current offers, product availability, directions, parking info, and store services. What would you like to know?";
    }
    
    if (message.includes('location') || message.includes('address')) {
      return "We're located at [Your Store Address], [City]. Near [Landmark]. Open 8 AM - 10 PM daily. Call +91-XXXX-XXXXX for more details.";
    }
    
    if (message.includes('payment') || message.includes('card')) {
      return "We accept Cash, All Credit/Debit Cards, UPI payments (GPay, PhonePe, Paytm), and Digital wallets. ATM available inside the store premises.";
    }
    
    if (message.includes('delivery') || message.includes('home')) {
      return "Home delivery available within 5km radius. Minimum order ₹500. Delivery charges ₹50. Same day delivery for orders before 3 PM. Call to place your order!";
    }
    
    if (message.includes('thank')) {
      return "You're most welcome! Happy shopping at DMart! Don't forget to check out our weekly deals and loyalty program benefits.";
    }
    
    // Handle random/unrecognized messages
    if (!hasKeyword || message.length < 3) {
      // Short, simple response when message is not understood
      return "Sorry, I didn't understand. Please try again.";
    }
    
    // Default responses for recognized but unhandled queries
    const defaultResponses = [
      "I'd be happy to help you with that! What specific information about our store do you need?",
      "Let me assist you with your query. Could you tell me more about what you're looking for?",
      "I'm here to make your shopping experience better. How can I help you today?",
      "Great question! Let me know what specific details you need about our store or services.",
      "I can help you with store information, offers, and services. What would you like to know?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = (message = null) => {
    const messageToSend = message || chatMessage.trim();
    if (!messageToSend) return;

    setChatHistory(prev => [...prev, { type: 'user', message: messageToSend }]);
    setChatMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = getAIResponse(messageToSend);
      setChatHistory(prev => [...prev, { type: 'bot', message: response }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendClick = () => {
    handleSendMessage();
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform hover:scale-105 animate-pulse"
        aria-label="Toggle AI Chatbot"
      >
        <Bot size={28} />
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 rounded-full p-2">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">CartIQ</h3>
                  <p className="text-xs opacity-90">Online now</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Container - Fixed Height with Scroll */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 min-h-0">
            <div className="space-y-4">
              {chatHistory.map((chat, idx) => (
                <div
                  key={idx}
                  className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                      chat.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-200 rounded-bl-md'
                    }`}
                  >
                    {chat.message}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 shadow-sm border border-gray-200 rounded-2xl rounded-bl-md px-4 py-2 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestions - Always show */}
              {showSuggestions && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 text-center">Quick help:</p>
                  <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Input - Fixed at Bottom */}
          <div className="border-t border-gray-200 bg-white p-4 flex-shrink-0">
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Chat input"
                disabled={isTyping}
              />
              <button
                onClick={handleSendClick}
                disabled={isTyping || !chatMessage.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-2 transition-all duration-200 transform hover:scale-105"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;