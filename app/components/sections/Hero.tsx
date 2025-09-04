import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ClientLogo from "../ui/ClientLogos";
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

  const clientLogos = [
    {
      id: 2,
      name: "United Networks of America"
    },
    {
      id: 3,
      name: "Georgia Drug Card"
    },
    {
      id: 4,
      name: "Alabama Rx Card"
    },
    {
      id: 5,
      name: "Texas Drug Card"
    },
    {
      id: 6,
      name: "California Rx Card"
    },
    {
      id: 7,
      name: "Louisiana Drug Card"
    },
    {
      id: 8,
      name: "South Carolina Drug Card"
    },
    {
      id: 9,
      name: "Smallcakes Cupcakery"
    },
    {
      id: 10,
      name: "Florida Rx Card"
    }
  ];




           return (
          <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
            {/* Futuristic Moving Background */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>

              {/* Floating geometric shapes */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute rounded-full ${
                    i % 3 === 0 ? 'bg-blue-400/20' : i % 3 === 1 ? 'bg-purple-400/20' : 'bg-cyan-400/20'
                  }`}
                  style={{
                    width: `${Math.random() * 100 + 50}px`,
                    height: `${Math.random() * 100 + 50}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 200 - 100, 0],
                    y: [0, Math.random() * 200 - 100, 0],
                    scale: [1, Math.random() * 0.5 + 0.8, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 5,
                  }}
                />
              ))}

              {/* Moving particles */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className={`absolute w-2 h-2 rounded-full ${
                    i % 4 === 0 ? 'bg-blue-500' : i % 4 === 1 ? 'bg-purple-500' : i % 4 === 2 ? 'bg-cyan-500' : 'bg-indigo-500'
                  }`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 400 - 200],
                    y: [0, Math.random() * 400 - 200],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 8 + 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 10,
                  }}
                />
              ))}

              {/* Animated grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
                <defs>
                  <pattern id="futuristicGrid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <motion.path
                      d="M 100 0 L 0 0 0 100"
                      fill="none"
                      stroke="url(#gridGradient)"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2,
                      }}
                    />
                  </pattern>
                  <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#futuristicGrid)" />
              </svg>

              {/* Floating hexagons */}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={`hex-${i}`}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    x: [0, Math.random() * 100 - 50, 0],
                    y: [0, Math.random() * 100 - 50, 0],
                  }}
                  transition={{
                    duration: Math.random() * 20 + 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-20">
                    <polygon
                      points="20,2 32,12 32,28 20,38 8,28 8,12"
                      fill="none"
                      stroke={i % 3 === 0 ? '#3B82F6' : i % 3 === 1 ? '#8B5CF6' : '#06B6D4'}
                      strokeWidth="1"
                    />
                  </svg>
                </motion.div>
              ))}
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

                   {/* Client Logos Carousel */}
             <div className="relative z-10 py-6 bg-gray-800 mt-15">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-xs text-gray-300 font-medium" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Trusted by leading organizations
            </p>
          </div>
          <div className="relative max-w-full mx-auto overflow-hidden">
            <motion.div
              className="flex items-center space-x-12 whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ 
                repeat: Infinity, 
                duration: 120, 
                ease: 'linear',
                repeatDelay: 0
              }}
              style={{ width: 'max-content' }}
            >
              {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, idx) => (
                <div 
                  key={`${logo.id}-${idx}`} 
                  className="flex items-center justify-center h-8 min-w-[100px] flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                >
                  <ClientLogo name={logo.name} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};



export default Hero;