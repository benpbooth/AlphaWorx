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
          headerRef.current.classList.add('bg-white', 'shadow-md');
          headerRef.current.classList.remove('bg-transparent');
        } else {
          headerRef.current.classList.remove('bg-white', 'shadow-md');
          headerRef.current.classList.add('bg-transparent');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      ref={headerRef}
      className="fixed w-full z-50 transition-all duration-300 bg-transparent"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="relative group">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-blue-400 hover:via-purple-500 hover:to-pink-600 transition-all duration-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                  AgentEva
                </h1>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <a href="#services" className="text-black hover:text-black transition-colors text-lg" style={{ fontFamily: 'League Spartan, sans-serif' }}>Services</a>
              <a href="#about" className="text-black hover:text-black transition-colors text-lg" style={{ fontFamily: 'League Spartan, sans-serif' }}>About</a>
              <a href="#contact" className="text-black hover:text-black transition-colors text-lg" style={{ fontFamily: 'League Spartan, sans-serif' }}>Contact</a>
            </nav>
            <a 
              href="https://v0-dentist-ai-platform.vercel.app" 
              className="px-6 py-2 rounded-full bg-black text-white font-medium hover:shadow-lg transition-all text-lg"
              style={{ fontFamily: 'League Spartan, sans-serif' }}
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
      
      {/* Horizontal Divider */}
      <div className="w-full h-px bg-gray-200"></div>
      
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
                className="text-black hover:text-black transition-colors py-2 text-lg"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#about" 
                className="text-black hover:text-black transition-colors py-2 text-lg"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-black hover:text-black transition-colors py-2 text-lg"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="https://v0-dentist-ai-platform.vercel.app" 
                className="px-6 py-2 rounded-full bg-black text-white font-medium hover:shadow-lg transition-all text-lg text-center"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
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