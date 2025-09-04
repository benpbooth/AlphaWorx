import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  
    useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 50) {
          headerRef.current.classList.add('shadow-md');
        } else {
          headerRef.current.classList.remove('shadow-md');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      ref={headerRef}
      className="fixed w-full z-50 transition-all duration-300 bg-white border-b border-gray-100"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
                           <div className="flex items-center">
                                      <div className="flex items-center space-x-2">
                     {/* Clean text-only SaaS logo */}
                     <div className="flex items-center relative group">
                        <div className="flex items-center space-x-3">
                          {/* Female AI Agent Icon */}
                          <motion.div
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-sm">
                              <defs>
                                <linearGradient id="agentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#06B6D4" />
                                  <stop offset="50%" stopColor="#3B82F6" />
                                  <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                                <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#4F46E5" />
                                  <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                              </defs>
                              
                              {/* Head circle */}
                              <circle cx="20" cy="16" r="8" fill="url(#agentGradient)" opacity="0.9"/>
                              
                              {/* Hair/headset */}
                              <path d="M12 12 C12 8, 16 6, 20 6 C24 6, 28 8, 28 12 L28 14 C28 10, 24 8, 20 8 C16 8, 12 10, 12 14 Z" fill="url(#hairGradient)"/>
                              
                              {/* Eyes */}
                              <circle cx="17" cy="15" r="1.5" fill="white"/>
                              <circle cx="23" cy="15" r="1.5" fill="white"/>
                              <circle cx="17" cy="15" r="0.8" fill="#1E40AF"/>
                              <circle cx="23" cy="15" r="0.8" fill="#1E40AF"/>
                              
                              {/* Nose */}
                              <ellipse cx="20" cy="17.5" rx="0.8" ry="1.2" fill="white" opacity="0.6"/>
                              
                              {/* Smile */}
                              <path d="M18 19 Q20 21 22 19" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                              
                              {/* Body/shoulders */}
                              <ellipse cx="20" cy="32" rx="12" ry="6" fill="url(#agentGradient)" opacity="0.8"/>
                              
                              {/* Tech elements */}
                              <circle cx="32" cy="12" r="2" fill="#10B981" opacity="0.7">
                                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
                              </circle>
                              <circle cx="8" cy="18" r="1.5" fill="#F59E0B" opacity="0.7">
                                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite"/>
                              </circle>
                              <circle cx="30" cy="25" r="1" fill="#EF4444" opacity="0.7">
                                <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite"/>
                              </circle>
                            </svg>
                          </motion.div>
                          
                          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                            AgentEva
                          </h1>
                        </div>
                       </div>
                   </div>
                 </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
                               <nav className="flex space-x-8">
                     <a href="#services" className="text-black hover:text-black transition-colors text-lg font-normal" style={{ fontFamily: 'League Spartan, sans-serif' }}>Services</a>
                     <a href="#about" className="text-black hover:text-black transition-colors text-lg font-normal" style={{ fontFamily: 'League Spartan, sans-serif' }}>About</a>
                     <a href="#contact" className="text-black hover:text-black transition-colors text-lg font-normal" style={{ fontFamily: 'League Spartan, sans-serif' }}>Contact</a>
                   </nav>
                               <a 
                     href="/login" 
                     className="px-6 py-2 rounded-full text-white font-medium hover:shadow-lg transition-all text-lg"
                     style={{ 
                       fontFamily: 'League Spartan, sans-serif',
                       backgroundColor: '#407bff'
                     }}
                   >
                     Login
                   </a>
          </div>
          

          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
                                 <nav className="flex flex-col space-y-4">
                       <a
                         href="#services"
                         className="text-black hover:text-black transition-colors py-2 text-lg font-normal"
                         style={{ fontFamily: 'League Spartan, sans-serif' }}
                         onClick={() => setIsMenuOpen(false)}
                       >
                         Services
                       </a>
                       <a
                         href="#about"
                         className="text-black hover:text-black transition-colors py-2 text-lg font-normal"
                         style={{ fontFamily: 'League Spartan, sans-serif' }}
                         onClick={() => setIsMenuOpen(false)}
                       >
                         About
                       </a>
                       <a
                         href="#contact"
                         className="text-black hover:text-black transition-colors py-2 text-lg font-normal"
                         style={{ fontFamily: 'League Spartan, sans-serif' }}
                         onClick={() => setIsMenuOpen(false)}
                       >
                         Contact
                       </a>
                                   <a 
                       href="/login" 
                       className="px-6 py-2 rounded-full text-white font-medium hover:shadow-lg transition-all text-lg text-center"
                       style={{ 
                         fontFamily: 'League Spartan, sans-serif',
                         backgroundColor: '#407bff'
                       }}
                       onClick={() => setIsMenuOpen(false)}
                     >
                       Login
                     </a>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 