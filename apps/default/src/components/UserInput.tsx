import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles } from 'lucide-react';

interface UserInputProps {
  onSubmit: (input: string) => void;
  isProcessing: boolean;
}

const sampleQuestions = [
  "How can I scale my startup to R10M revenue?",
  "Should I raise venture capital or bootstrap?",
  "What's the best pricing strategy for my product?",
  "How do I fire underperforming employees?",
  "Should I pivot my business model?",
  "What marketing channels should I focus on?"
];

export const UserInput: React.FC<UserInputProps> = ({ onSubmit, isProcessing }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set height based on content, with a minimum of single line
      const scrollHeight = textareaRef.current.scrollHeight;
      const lineHeight = 24; // Approximate line height
      const minHeight = lineHeight + 16; // Single line + padding
      textareaRef.current.style.height = `${Math.max(minHeight, scrollHeight)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input would be implemented here
  };

  return (
    <div className="p-2 md:p-4 bg-gray-900/90 backdrop-blur-sm border-t-4 border-green-500/50">
      {/* Sample Questions - Green Theme */}
      {!input && !isProcessing && (
        <div className="mb-2 md:mb-3">
          <p className="text-sm text-gray-300 mb-2 font-medium">💡 Try asking the moguls:</p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {sampleQuestions.slice(0, 3).map((question, index) => (
              <button
                key={index}
                onClick={() => handleSampleQuestion(question)}
                className="px-2 md:px-3 py-1.5 md:py-2 text-xs bg-green-600/20 hover:bg-green-600/40 text-green-300 rounded-full border border-green-500/30 hover:border-green-400/50 transition-all duration-200 hover:scale-105 animate-border-pulse"
              >
                {/* Show shortened text on mobile */}
                <span className="md:hidden">
                  {question.length > 25 ? question.substring(0, 25) + '...' : question}
                </span>
                <span className="hidden md:inline">{question}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Input Form - Darker with Green Accents */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-gray-800 rounded-xl md:rounded-2xl border-2 border-green-500/30 focus-within:border-green-400 transition-all duration-300 shadow-lg animate-border-glow">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask the business moguls anything... (e.g., 'How do I scale my startup?')"
            className="w-full bg-transparent text-white placeholder-gray-400 p-2 md:p-3 pr-14 md:pr-20 resize-none focus:outline-none max-h-32 md:max-h-40 text-sm md:text-base overflow-hidden"
            disabled={isProcessing}
            rows={1}
            style={{ minHeight: '40px' }}
          />

          {/* Input Controls - Green Theme */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 md:space-x-2">
            {/* Voice Input Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-1.5 md:p-2 rounded-full transition-all duration-200 border ${
                isListening
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/25 border-red-400'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border-green-500/30 hover:border-green-400/50'
              }`}
              disabled={isProcessing}
              title="Voice Input"
            >
              <Mic className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Submit Button - Green Theme */}
            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className={`p-1.5 md:p-2 rounded-full transition-all duration-200 border-2 ${
                input.trim() && !isProcessing
                  ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-green-500/25 hover:scale-105 border-green-500/50 animate-green-glow'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed border-gray-600'
              }`}
              title="Send Message"
            >
              {isProcessing ? (
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Status and Help Text - Green Accents */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-1.5 md:mt-2 text-xs md:text-sm space-y-1 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-400">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
            <span className="text-xs md:text-sm">AI-powered business insights from legendary entrepreneurs</span>
          </div>
          <div className="text-gray-500 text-xs md:text-sm">
            {isProcessing ? (
              <span className="text-green-400 font-medium">🤖 Moguls are thinking...</span>
            ) : (
              <span className="hidden md:inline">Press Enter to send • Shift+Enter for new line</span>
            )}
          </div>
        </div>
      </form>

      {/* Voice Input Indicator - Green Theme */}
      {isListening && (
        <div className="absolute inset-0 bg-red-500/10 rounded-xl md:rounded-2xl border-2 border-red-500/50 animate-pulse pointer-events-none" />
      )}

      {/* Quick Action Buttons - Green Theme */}
      <div className="mt-2 md:mt-3 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-3">
        <button
          onClick={() => handleSampleQuestion("How can I scale my startup to R10M revenue?")}
          disabled={isProcessing}
          className="w-full md:w-auto px-3 md:px-4 py-2 bg-green-600/20 hover:bg-green-600/40 text-green-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 border border-green-500/30 text-sm animate-border-pulse"
        >
          💰 Scaling to R10M
        </button>
        <button
          onClick={() => handleSampleQuestion("Should I raise venture capital or bootstrap?")}
          disabled={isProcessing}
          className="w-full md:w-auto px-3 md:px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 border border-emerald-500/30 text-sm animate-border-pulse"
        >
          🚀 Funding
        </button>
        <button
          onClick={() => handleSampleQuestion("What's the best marketing strategy for my business?")}
          disabled={isProcessing}
          className="w-full md:w-auto px-3 md:px-4 py-2 bg-teal-600/20 hover:bg-teal-600/40 text-teal-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 border border-teal-500/30 text-sm animate-border-pulse"
        >
          📈 Marketing
        </button>
      </div>
    </div>
  );
};