"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'customer' | 'ai';
  delay: number;
}

const LiveChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const conversation = useMemo((): Message[] => [
    { id: 1, text: "Hi! I need to schedule a dental cleaning.", sender: 'customer' as const, delay: 1000 },
    { id: 2, text: "I'd be happy to help you schedule that! When would work best for you?", sender: 'ai' as const, delay: 1800 },
    { id: 3, text: "Do you have anything available next week?", sender: 'customer' as const, delay: 1200 },
    { id: 4, text: "Yes! I have Tuesday at 2pm or Thursday at 10am available. Which works better?", sender: 'ai' as const, delay: 2000 },
    { id: 5, text: "Tuesday at 2pm sounds perfect!", sender: 'customer' as const, delay: 1000 },
    { id: 6, text: "Great! I'll book you for Tuesday, March 12th at 2:00pm with Dr. Smith. Can I get your name and phone number?", sender: 'ai' as const, delay: 2200 },
    { id: 7, text: "Sure! It's Sarah Johnson, 555-0123", sender: 'customer' as const, delay: 1300 },
    { id: 8, text: "Perfect! You're all set, Sarah. I'll send you a confirmation text. See you Tuesday at 2pm! 😊", sender: 'ai' as const, delay: 2000 }
  ], []);

  // Smooth scroll to bottom function
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Clear any existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (currentMessageIndex >= conversation.length) {
      // Reset the conversation after a pause
      timeoutRef.current = setTimeout(() => {
        setMessages([]);
        setCurrentMessageIndex(0);
        setIsTyping(false);
        setTypingText('');
      }, 3000);
      return;
    }

    const currentMessage = conversation[currentMessageIndex];
    
    timeoutRef.current = setTimeout(() => {
      if (currentMessage.sender === 'ai') {
        setIsTyping(true);
        setTypingText('');
        
        // Simulate typing
        let currentChar = 0;
        intervalRef.current = setInterval(() => {
          if (currentChar <= currentMessage.text.length) {
            setTypingText(currentMessage.text.slice(0, currentChar));
            currentChar++;
          } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsTyping(false);
            setTypingText('');
            setMessages(prev => [...prev, currentMessage]);
            setCurrentMessageIndex(prev => prev + 1);
            // Scroll to bottom after message is added
            setTimeout(scrollToBottom, 100);
          }
        }, 50);
      } else {
        setMessages(prev => [...prev, currentMessage]);
        setCurrentMessageIndex(prev => prev + 1);
        // Scroll to bottom after message is added
        setTimeout(scrollToBottom, 100);
      }
    }, currentMessage.delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentMessageIndex, conversation]);

  // Scroll to bottom when typing starts or when typing text updates
  useEffect(() => {
    if (isTyping) {
      scrollToBottom();
    }
  }, [isTyping, typingText]);

  return (
    <div className="relative max-w-md mx-auto">
      {/* Chat Interface - Modern */}
      <div 
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        style={{ width: '320px', height: '480px' }}
      >
        {/* Chat Header - Sleek Dark */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">Smile Dental</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <p className="text-gray-300 text-xs">Online now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container - Sleek */}
        <div 
          ref={messagesContainerRef}
          className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-100"
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[220px] px-4 py-3 rounded-2xl text-sm ${
                    message.sender === 'customer'
                      ? 'bg-blue-500 text-white rounded-br-md shadow-lg'
                      : 'bg-white text-gray-800 shadow-md border border-gray-200 rounded-bl-md'
                  }`}
                >
                  <p className="leading-relaxed">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator - Sleek */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="max-w-[220px] px-4 py-3 rounded-2xl rounded-bl-md bg-white text-gray-800 shadow-md border border-gray-200">
                <p className="text-sm leading-relaxed">
                  {typingText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1"
                  >
                    |
                  </motion.span>
                </p>
              </div>
            </motion.div>
          )}
          
          {/* Invisible div to scroll to */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Sleek & Compact */}
        <div className="border-t border-gray-200 bg-white px-3 py-4">
          <div className="flex items-end space-x-2">
            <div className="flex-1 bg-gray-50 rounded-full px-3 border border-gray-200 h-7 flex items-center">
              <p className="text-gray-400 text-xs leading-none">Type your message...</p>
            </div>
            <button className="w-7 h-7 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Live Demo Badge - Smaller */}
      <div className="absolute -bottom-2 right-4 bg-white rounded-lg shadow-lg px-3 py-1.5 border">
        <div className="flex items-center">
          <div className="w-1.5 h-1.5 rounded-full mr-2 bg-green-400 animate-pulse"></div>
          <span className="text-xs font-medium text-gray-700">Live demo</span>
        </div>
      </div>
    </div>
  );
};

export default LiveChatDemo;
