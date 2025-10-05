import { useState, useEffect, useRef } from "react";
import { X, Volume2, VolumeX, ChevronUp, ChevronDown, MessageSquare } from "lucide-react";

const AIAssistantPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: string, content: string}>>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  
  const elementRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    console.log('Setting up AI assistant...');
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      console.log('Showing AI assistant...');
      setIsVisible(true);
      // Add a small delay for smooth animation
      setTimeout(() => {
        setIsLoaded(true);
        console.log('AI assistant loaded');
        
        // Automatically initialize with greeting after popup appears
        setTimeout(() => {
          console.log('Starting greeting initialization...');
          initializeWithGreeting();
        }, 500); // Wait 0.5 seconds after popup appears
      }, 100);
    }, 10000);

    // Initialize speech synthesis
    initializeVoiceFeatures();

    return () => clearTimeout(timer);
  }, []);

  const initializeWithGreeting = async () => {
    try {
      console.log('Initializing with greeting...');
      const response = await fetch('http://localhost:8000/api/v1/agent/greeting', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const greeting = data.response;
        console.log('Received greeting:', greeting);
        
        // Add greeting to conversation history
        setConversationHistory([{ role: 'assistant', content: greeting }]);
        
        // Speak the greeting automatically
        speak(greeting);
        console.log('Greeting spoken');
      } else {
        console.error('Failed to get greeting:', response.status);
        // Fallback greeting
        const fallbackGreeting = "Welcome to RecursX Innovations! How can I assist you today?";
        setConversationHistory([{ role: 'assistant', content: fallbackGreeting }]);
        speak(fallbackGreeting);
      }
    } catch (error) {
      console.error('Error getting initial greeting:', error);
      // Fallback greeting
      const fallbackGreeting = "Welcome to RecursX Innovations! How can I assist you today?";
      setConversationHistory([{ role: 'assistant', content: fallbackGreeting }]);
      speak(fallbackGreeting);
    }
  };

  const triggerGreeting = () => {
    console.log('Manual greeting triggered');
    initializeWithGreeting();
  };

  const initializeVoiceFeatures = () => {
    // Initialize Speech Synthesis only
    synthRef.current = window.speechSynthesis;
  };

  const speak = (text: string) => {
    if (synthRef.current && !isSpeaking) {
      // Stop any ongoing speech
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.2; // Higher pitch for female voice
      utterance.volume = 0.8;

      // Try to use a female voice
      const voices = synthRef.current.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('woman') ||
        voice.name.toLowerCase().includes('zira') || // Windows female voice
        voice.name.toLowerCase().includes('samantha') || // macOS female voice
        voice.name.toLowerCase().includes('karen') || // macOS female voice
        voice.name.toLowerCase().includes('susan') || // macOS female voice
        voice.name.toLowerCase().includes('victoria') // macOS female voice
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
        console.log('Using female voice:', femaleVoice.name);
      } else {
        console.log('No female voice found, using default');
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Clear current message
    setCurrentMessage("");

    // Add user message to history
    const newHistory = [...conversationHistory, { role: 'user', content: message }];
    setConversationHistory(newHistory);

    try {
      // Call backend API
      const response = await fetch('http://localhost:8000/api/v1/agent/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          conversation_history: newHistory
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = data.response;
        
        // Add AI response to history
        setConversationHistory([...newHistory, { role: 'assistant', content: aiResponse }]);
        
        // Speak the response
        speak(aiResponse);
      } else {
        console.error('Error calling AI agent:', response.statusText);
        // Add error message to history
        setConversationHistory([...newHistory, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }]);
      }
    } catch (error) {
      console.error('Error calling AI agent:', error);
      // Add error message to history
      setConversationHistory([...newHistory, { 
        role: 'assistant', 
        content: 'Sorry, I encountered a connection error. Please check if the backend is running.' 
      }]);
    }
  };

  const handleClose = () => {
    setIsLoaded(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep within viewport bounds
      const maxX = window.innerWidth - (elementRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (elementRef.current?.offsetHeight || 0);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (elementRef.current) {
      const touch = e.touches[0];
      const rect = elementRef.current.getBoundingClientRect();
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      const touch = e.touches[0];
      const newX = touch.clientX - dragOffset.x;
      const newY = touch.clientY - dragOffset.y;
      
      // Keep within viewport bounds
      const maxX = window.innerWidth - (elementRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (elementRef.current?.offsetHeight || 0);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset]);

  if (!isVisible) return null;

  return (
    <div 
      ref={elementRef}
      className={`fixed z-50 transform transition-all duration-300 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      style={{
        left: position.x || '50%',
        top: position.y || 'auto',
        bottom: position.y ? 'auto' : '24px',
        transform: position.x ? 'translateX(0)' : 'translateX(-50%)'
      }}
    >
      {/* Main UI Element */}
      <div 
        className={`bg-transparent backdrop-blur-sm rounded-xl border border-white/20 select-none ${
          isDragging ? 'shadow-lg' : ''
        } ${isExpanded ? 'p-4' : 'px-6 py-3'}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 p-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:shadow-lg shadow-red-500/20 transition-all duration-200 z-10"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <X className="w-3 h-3 text-white" />
        </button>

        {/* Main Content */}
        <div className="flex items-center space-x-3">
          {/* GIF Animation */}
          <div className="flex-shrink-0">
            <img 
              src="/3.gif" 
              alt="RecursX AI Assistant" 
              className="w-10 h-10 rounded-full object-cover"
              draggable={false}
            />
          </div>

          {/* Text Content */}
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-white drop-shadow-lg">
              RecursX AI
            </h3>
            
            {/* Status indicators */}
            <div className="flex items-center space-x-1">
              {isSpeaking && (
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              )}
              {!isSpeaking && conversationHistory.length === 0 && (
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              )}
              {!isSpeaking && conversationHistory.length > 0 && (
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              )}
            </div>
          </div>

          {/* Voice Controls */}
          <div className="flex items-center space-x-2 ml-2">
            {/* Speaker Button */}
            <button
              onClick={isSpeaking ? stopSpeaking : () => {}}
              className={`p-2 rounded-full transition-all duration-200 ${
                isSpeaking 
                  ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/20' 
                  : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-lg'
              }`}
              onMouseDown={(e) => e.stopPropagation()}
              title={isSpeaking ? 'Stop speaking' : 'Voice output enabled'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Manual Greeting Button */}
            <button
              onClick={triggerGreeting}
              className="p-2 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:shadow-lg shadow-blue-500/20 transition-all duration-200"
              onMouseDown={(e) => e.stopPropagation()}
              title="Trigger greeting"
            >
              👋
            </button>

            {/* Expand/Collapse Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 rounded-full transition-all duration-200 ${
                isExpanded 
                  ? 'bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/20' 
                  : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 hover:shadow-lg shadow-orange-500/20'
              }`}
              onMouseDown={(e) => e.stopPropagation()}
              title={isExpanded ? 'Collapse chat' : 'Expand chat'}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 animate-bounce" />
              ) : (
                <MessageSquare className="w-4 h-4" />
              )}
            </button>
            
            {/* Test Greeting Button (for debugging) */}
            {conversationHistory.length === 0 && (
              <button
                onClick={initializeWithGreeting}
                className="p-2 rounded-full bg-blue-500/20 text-blue-100 hover:bg-blue-500/30 transition-colors"
                onMouseDown={(e) => e.stopPropagation()}
                title="Initialize greeting"
              >
                <div className="w-4 h-4">👋</div>
              </button>
            )}
          </div>
        </div>

        {/* Expanded Conversation Area */}
        {isExpanded && (
          <div className="mt-4 max-h-60 overflow-y-auto">
            <div className="space-y-3">
              {conversationHistory.length === 0 && (
                <div className="text-white/70 text-sm text-center py-4">
                  Initializing RecursX AI Assistant...
                </div>
              )}
              
              {conversationHistory.length > 0 && (
                <div className="text-white/70 text-xs text-center py-2 border-b border-white/10">
                  RecursX AI Assistant is ready
                </div>
              )}
              
              {conversationHistory.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-500/20 text-blue-100' 
                      : 'bg-white/10 text-white'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {currentMessage && (
                <div className="flex justify-end">
                  <div className="max-w-xs px-3 py-2 rounded-lg text-sm bg-blue-500/20 text-blue-100">
                    {currentMessage}
                  </div>
                </div>
              )}
            </div>
            
            {/* Text Input */}
            <div className="mt-3 flex space-x-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(currentMessage)}
                placeholder="Ask me anything about RecursX..."
                className="flex-1 px-3 py-2 bg-white/10 text-white placeholder-white/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                onMouseDown={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => handleSendMessage(currentMessage)}
                className="px-3 py-2 bg-blue-500/20 text-blue-100 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                onMouseDown={(e) => e.stopPropagation()}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantPopup;
