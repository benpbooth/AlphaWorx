import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import LiveChatDemo from "../ui/LiveChatDemo";

interface HeroProps {
  ctaText: string;
}

const Hero: React.FC<HeroProps> = () => {
  const [typewriterText, setTypewriterText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const words = useMemo(() => ["Forward-Thinking Organizations", "Growing Businesses", "Busy Practices", "Small Teams", "Peace of Mind"], []);
  const fullText = "AI Integration for ";
  
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let index = 0;
    let typeInterval: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;
    
    // Clear text first
    setTypewriterText("");
    
    // Small delay before starting to type
    const startDelay = setTimeout(() => {
      typeInterval = setInterval(() => {
        if (index <= currentWord.length) {
          setTypewriterText(currentWord.substring(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
          // Wait 2 seconds before moving to next word
          timeoutId = setTimeout(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }, 2000);
        }
      }, 80);
    }, 100);
    
    return () => {
      clearTimeout(startDelay);
      if (typeInterval) clearInterval(typeInterval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentWordIndex, words]);




           return (
          <section className="relative min-h-screen bg-white overflow-hidden">
            {/* Checkered grid background (upright, non-animated) */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(0deg, #407bff 1px, transparent 1px), linear-gradient(90deg, #407bff 1px, transparent 1px)`,
                  backgroundSize: '60px 60px',
                  backgroundPosition: '0 0'
                }}
              />
            </div>
            
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="flex flex-col lg:flex-row items-center min-h-[70vh]">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            {/* Simple, clean content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              {/* Clean Heading */}
              <div className="mb-6">
                <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-left leading-tight"
                    style={{ fontFamily: 'League Spartan, sans-serif', color: '#1a1a1a' }}>
                  <span>{fullText}</span>
                                          <span style={{ color: '#407bff' }}>
                          {typewriterText}
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            style={{ color: '#407bff' }}
                          >
                            |
                          </motion.span>
                        </span>
                </h1>
              </div>

              {/* Clean Subtext */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl text-gray-600 mb-6 leading-relaxed"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                We specialize in integrating agentic AI into existing business systems.
              </motion.p>

              {/* Simple CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex gap-4"
              >
                <motion.a 
                  href="/login"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-lg text-white font-medium transition-colors"
                  style={{ 
                    fontFamily: 'League Spartan, sans-serif',
                    backgroundColor: '#407bff'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.backgroundColor = '#3366e6';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.backgroundColor = '#407bff';
                  }}
                >
                  Try for free →
                </motion.a>
                <motion.a 
                  href="/login"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-lg border font-medium transition-colors"
                  style={{ 
                    fontFamily: 'League Spartan, sans-serif',
                    borderColor: '#407bff',
                    color: '#407bff'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.backgroundColor = '#407bff';
                    target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.backgroundColor = 'transparent';
                    target.style.color = '#407bff';
                  }}
                >
                  Book a demo →
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

                           {/* Live Chat Demo */}
                 <div className="lg:w-1/2 flex justify-center lg:justify-end">
                   <motion.div
                     initial={{ opacity: 0, x: 50 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, delay: 0.4 }}
                     className="relative max-w-lg w-full"
                   >
                     <LiveChatDemo />
                   </motion.div>
                 </div>
        </div>
      </div>

    </section>
  );
};



export default Hero;