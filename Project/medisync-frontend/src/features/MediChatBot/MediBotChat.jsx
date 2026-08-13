import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

const MediBotChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am MediBot. Type an out-of-stock medicine name to get instant generic substitutes and alternative brands.',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeKeyAlias, setActiveKeyAlias] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle message submission
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputPrompt.trim() || loading) return;

    const userMessage = inputPrompt.trim();

    // Append user query to UI
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInputPrompt('');
    setLoading(true);

    try {
      // Call Spring Boot Gateway Endpoint
      const response = await fetch('http://localhost:8080/api/chat/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Enable if JWT protected
        },
        body: JSON.stringify({
          prompt: userMessage,
          context: 'Pharmacy Billing Terminal',
        }),
      });

      const data = await response.json();

      if (response.ok && (data.reply || data.response)) {
        const botReply = data.reply || data.response;

        // Capture key alias if forwarded by Spring Boot Gateway
        if (data.key_used) {
          setActiveKeyAlias(data.key_used);
        }

        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: botReply, keyUsed: data.key_used },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: 'Unable to fetch substitute recommendations right now.' },
        ]);
      }
    } catch (error) {
      console.error('MediBot Gateway Error:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Network connection issue: Ensure Spring Boot and FastAPI microservices are running.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* FIXED SCREEN CONTAINER: Anchored at bottom-right during dashboard scrolling */
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* 🟢 FLOATING CHAT DRAWER */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-emerald-100 flex flex-col overflow-hidden mb-4 transition-all duration-300 transform scale-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-2.5">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-semibold text-sm tracking-wide">MediBot Assistant</h3>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-200 animate-pulse" />
                </div>
                <span className="text-[11px] text-emerald-100 flex items-center mt-0.5 font-mono">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block mr-1.5 animate-ping"></span>
                  {activeKeyAlias ? `Key: ${activeKeyAlias}` : 'Llama 3.1 • Round-Robin Engine'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="bg-emerald-100 text-emerald-800 p-1.5 rounded-full mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className="flex flex-col max-w-[82%]">
                  <div
                    className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none shadow-md font-medium'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Displays key rotation info if returned */}
                  {msg.keyUsed && (
                    <span className="text-[10px] text-slate-400 mt-1 ml-1 font-mono">
                      Processed via {msg.keyUsed}
                    </span>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="bg-slate-200 text-slate-700 p-1.5 rounded-full mt-1 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center space-x-2 text-slate-500 text-xs mt-2 pl-1">
                <Bot className="w-4 h-4 text-emerald-600 animate-bounce" />
                <span className="flex items-center font-medium">
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5 text-emerald-600" />
                  Searching active ingredient matches...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2">
            <input
              type="text"
              placeholder="e.g. Substitute for Paracetamol 500mg..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="flex-1 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={loading || !inputPrompt.trim()}
              className="bg-emerald-600 text-white p-2.5 rounded-xl hover:bg-emerald-700 disabled:opacity-40 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* 🔵 STATIC FLOATING TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center focus:outline-none ring-4 ring-emerald-500/20 group relative"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
          </>
        )}
      </button>
    </div>
  );
};

export default MediBotChat;