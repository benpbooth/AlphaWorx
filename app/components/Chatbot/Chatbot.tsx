"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatbotProps {
  webhookUrl?: string;
  primaryColor?: string;
  accentColor?: string;
  position?: 'bottom-right' | 'bottom-left';
  title?: string;
  placeholder?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({
  webhookUrl = 'https://benpbooth.app.n8n.cloud/webhook/d55958cb-535a-4200-82da-e4c87aa9c77e/chat',
  primaryColor = '#2563eb',
  accentColor = '#1d4ed8',
  position = 'bottom-right',
  title = 'Chat with us',
  placeholder = 'Type your message...'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey there! I'm your UNA virtual agent. What can I help you with today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate or retrieve session ID
  const getSessionId = () => {
    let sessionId = localStorage.getItem('una-chat-session');
    if (!sessionId) {
      sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('una-chat-session', sessionId);
    }
    return sessionId;
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send request with sessionId for n8n Simple Memory node
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors', // Explicitly set CORS mode
        body: JSON.stringify({
          chatInput: inputValue,  // Changed from 'message' to 'chatInput' for n8n compatibility
          sessionId: getSessionId(),  // Add sessionId for Simple Memory node
          timestamp: new Date().toISOString(),
          user: 'web-visitor',
          source: 'chatbot'
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const responseText = await response.text();
        console.log('Raw webhook response:', responseText);
        
        let content = '';
        
        // Handle streaming JSON response from n8n
        if (responseText.includes('{"type"')) {
          const lines = responseText.split('\n').filter(line => line.trim());
          lines.forEach(line => {
            try {
              const json = JSON.parse(line);
              console.log('Parsed JSON chunk:', json);
              if (json.type === 'item' && json.content) {
                content += json.content;
              }
            } catch (e) {
              console.log('Failed to parse JSON line:', line);
            }
          });
        } else {
          // Handle regular text response
          content = responseText;
        }
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: content || 'I received your message but had trouble processing it. Please try again.',
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorText = await response.text();
        console.error('Response error:', response.status, errorText);
        
        // Handle specific n8n workflow errors
        if (response.status === 500 && errorText.includes('Error in workflow')) {
          throw new Error('The chatbot service is currently experiencing issues. Please try again later or contact support.');
        }
        
        throw new Error(`HTTP ${response.status}: ${errorText || 'Failed to send message'}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // More detailed error message
      let errorText = 'Sorry, there was an error sending your message. Please try again.';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorText = 'Connection error. Please check your internet connection and try again.';
      } else if (error instanceof Error && error.message.includes('CORS')) {
        errorText = 'Connection blocked by security policy. Please contact support.';
      } else if (error instanceof Error && error.message.includes('HTTP')) {
        errorText = `Server error: ${error.message}`;
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const positionClasses = position === 'bottom-right' 
    ? 'bottom-4 right-4' 
    : 'bottom-4 left-4';

  return (
    <div className={`fixed ${positionClasses} z-50`}>
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div 
            className="px-4 py-3 text-white flex items-center justify-between"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="flex items-center">
              <MessageCircle size={20} className="mr-2" />
              <span className="font-semibold">{title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.isUser
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  style={{
                    backgroundColor: message.isUser ? primaryColor : undefined
                  }}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-white text-opacity-70' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
                style={{ 
                  focusRingColor: primaryColor + '80' 
                }}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-3 py-2 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                style={{ backgroundColor: primaryColor }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        style={{ backgroundColor: primaryColor }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default Chatbot;