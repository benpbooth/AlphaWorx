import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

interface AboutProps {
  companyName: string;
}

const About: React.FC<AboutProps> = ({ companyName }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [autoPlayIndex, setAutoPlayIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const benefits = [
    {
      title: "Never lose another customer",
      description: "Professional response to every call, 24/7, ensuring no potential customer feels ignored or goes to competitors."
    },
    {
      title: "Instant appointment booking",
      description: "Customers schedule appointments immediately through natural conversation with real-time calendar integration."
    },
    {
      title: "Emergency handling",
      description: "Advanced AI recognizes urgent situations and follows your escalation protocols for immediate attention."
    },
    {
      title: "Staff relief",
      description: "Your team can focus on core business without worrying about missing important after-hours calls."
    },
    {
      title: "Revenue protection",
      description: "Capture every business opportunity, even when you're unavailable, preventing lost revenue."
    },
    {
      title: "Seamless handoffs",
      description: "Detailed call summaries and customer information automatically logged for your team's follow-up."
    }
  ];

  // Auto-play functionality with initial delay
  useEffect(() => {
    if (!isAutoPlaying) return;

    // Start with a longer delay so users see card #1 first
    const initialTimeout = setTimeout(() => {
      setAutoPlayIndex((prev) => (prev + 1) % benefits.length);
    }, 2000); // 2 second delay before first transition

    const interval = setInterval(() => {
      setAutoPlayIndex((prev) => (prev + 1) % benefits.length);
    }, 3000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isAutoPlaying, benefits.length]);

  const handleCardInteraction = (index: number, isEntering: boolean) => {
    if (isEntering) {
      setActiveCard(index);
      setIsAutoPlaying(false);
    } else {
      setActiveCard(null);
      // Resume auto-play after 5 seconds of no interaction
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
  };



  return (
    <section id="about" className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Simplified background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-32 right-20 w-40 h-40 bg-blue-100 rounded-full opacity-10"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-16 w-32 h-32 bg-purple-100 rounded-full opacity-10"
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Simple floating particles */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -25, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3 mb-6"
          >
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-blue-600 font-medium" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              24/7 Business Protection
            </span>
          </motion.div>
          
          {/* Dynamic "Why Choose Us?" with gradient text */}
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-6 relative"
            style={{ fontFamily: 'League Spartan, sans-serif' }}
          >
            <motion.span
              className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Why Choose Us?
            </motion.span>
            
            {/* Subtle glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/15 via-blue-500/15 to-cyan-600/15 blur-lg -z-10"
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
                scale: [0.9, 1.05, 0.9]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.h2>
          
          {/* Dynamic subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto relative"
            style={{ fontFamily: 'League Spartan, sans-serif' }}
          >
            Your customers don't stop calling when you close. We ensure every call gets professional, immediate attention - even at 3 AM on weekends.
          </motion.div>
        </div>

        {/* Dynamic Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const isActive = activeCard === index || (activeCard === null && autoPlayIndex === index);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100
                }}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  y: isActive ? -10 : 0,
                  rotateY: isActive ? 5 : 0
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut"
                }}
                onHoverStart={() => handleCardInteraction(index, true)}
                onHoverEnd={() => handleCardInteraction(index, false)}
                className="group relative bg-white rounded-xl p-6 border border-gray-100 cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Dynamic background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl"
                  animate={{
                    opacity: isActive ? 0.1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-blue-200"
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.95
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Dynamic number indicator */}
                  <div className="flex items-center mb-4">
                    <motion.div
                      className={`w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        isActive 
                          ? 'bg-blue-500' 
                          : 'bg-gray-500'
                      }`}
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        rotate: isActive ? 360 : 0
                      }}
                      transition={{ 
                        duration: 0.5,
                        rotate: { duration: 0.8 }
                      }}
                    >
                      {index + 1}
                    </motion.div>
                    <div className={`ml-3 h-px bg-gradient-to-r ${isActive ? 'from-blue-200' : 'from-gray-200'} to-transparent flex-1`} />
                  </div>
                  
                  {/* Animated title */}
                  <motion.h3 
                    className={`text-lg font-bold mb-3 transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-gray-900'}`}
                    style={{ fontFamily: 'League Spartan, sans-serif' }}
                    animate={{
                      y: isActive ? -2 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {benefit.title}
                  </motion.h3>
                  
                  {/* Animated description */}
                  <motion.p 
                    className="text-sm text-gray-600 leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    animate={{
                      opacity: isActive ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {benefit.description}
                  </motion.p>
                </div>

                {/* Pulse effect for active card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-blue-300"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.6, 0, 0.6]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Auto-play indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-12 space-x-2"
        >
          {benefits.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: (activeCard === null && autoPlayIndex === index) || activeCard === index
                  ? '#3b82f6' 
                  : '#d1d5db',
                scale: (activeCard === null && autoPlayIndex === index) || activeCard === index
                  ? 1.5 
                  : 1
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;