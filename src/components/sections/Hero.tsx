import React from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import ClientLogo from "../ui/ClientLogos";

interface HeroProps {
  ctaText: string;
}

const Hero: React.FC<HeroProps> = ({ ctaText }) => {
  const clientLogos = [
    {
      id: 1,
      name: "Louisiana Dental Plan"
    },
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
    <section className="relative pt-24 pb-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-center md:text-left"
              style={{ color: '#000000', fontFamily: 'League Spartan, sans-serif' }}
            >
              AI Integration for Growing Businesses
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-6"
              style={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              We specialize in integrating agentic AI into existing business systems.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <a 
                href="https://v0-dentist-ai-platform.vercel.app" 
                className="px-8 py-3 rounded-full bg-black text-white font-medium hover:shadow-lg transition-all text-center"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                {ctaText}
              </a>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                <ImageWithFallback
                  src="/photos/convo.png"
                  alt="AI Chat Conversation Interface"
                  className="rounded-lg shadow-2xl w-3/5 mx-auto border-4 border-gray-100"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 hidden md:block border-2 border-gray-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm font-medium">AI-Powered Chat Demo</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Client Logos Carousel */}
      <div className="py-8 bg-black mt-44">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-full mx-auto overflow-hidden">
            {/* Smooth scrolling marquee */}
            <motion.div
              className="flex items-center space-x-16"
              animate={{ x: [0, '-50%'] }}
              transition={{ 
                repeat: Infinity, 
                duration: 60, 
                ease: 'linear',
                repeatDelay: 0
              }}
            >
              {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, idx) => (
                <div key={`${logo.id}-${idx}`} className="flex items-center justify-center h-16 min-w-[160px] flex-shrink-0">
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