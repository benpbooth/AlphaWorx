import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Calendar, AlertTriangle, MessageCircle, Settings, ChevronLeft, ChevronRight } from "lucide-react";

const Services: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  
  const services = [
    {
      id: 1,
      title: "After-Hours Reception",
      description: "Handle calls when you're closed",
      detail: "Never miss a call again. Our AI receptionist answers professionally 24/7, even when your office is closed.",
      icon: <Phone className="w-8 h-8" />,
      time: "24/7"
    },
    {
      id: 2,
      title: "Smart Scheduling",
      description: "Book appointments automatically",
      detail: "Seamlessly book appointments directly from phone calls, syncing with your existing calendar systems.",
      icon: <Calendar className="w-8 h-8" />,
      time: "Real-time"
    },
    {
      id: 3,
      title: "Urgent Situation Triage",
      description: "Route critical cases appropriately",
      detail: "Intelligent call routing ensures urgent matters reach the right person immediately, while routine calls are handled efficiently.",
      icon: <AlertTriangle className="w-8 h-8" />,
      time: "Instant"
    },
    {
      id: 4,
      title: "Business Q&A",
      description: "Answer common customer questions",
      detail: "Provide instant answers to frequently asked questions about your services, hours, pricing, and policies.",
      icon: <MessageCircle className="w-8 h-8" />,
      time: "Immediate"
    },
    {
      id: 5,
      title: "Custom Setup",
      description: "Tailored to your business protocols",
      detail: "Completely customized to match your business voice, protocols, and specific industry requirements.",
      icon: <Settings className="w-8 h-8" />,
      time: "Ongoing"
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoRotating, services.length]);

  const nextService = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prev) => (prev + 1) % services.length);
    setTimeout(() => setIsAutoRotating(true), 10000); // Resume auto-rotation after 10s
  };

  const prevService = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    setTimeout(() => setIsAutoRotating(true), 10000); // Resume auto-rotation after 10s
  };

  const goToService = (index: number) => {
    setIsAutoRotating(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoRotating(true), 10000); // Resume auto-rotation after 10s
  };

  // Calculate positions for 3D carousel
  const getCardStyle = (index: number) => {
    const totalCards = services.length;
    const angleStep = 360 / totalCards;
    const currentAngle = (index - currentIndex) * angleStep;
    const radius = 320;
    
    const x = Math.sin((currentAngle * Math.PI) / 180) * radius;
    const z = Math.cos((currentAngle * Math.PI) / 180) * radius;
    const rotateY = -currentAngle;
    
    // Calculate opacity and scale based on position
    const normalizedZ = (z + radius) / (2 * radius); // 0 to 1
    const opacity = Math.max(0.3, normalizedZ);
    const scale = 0.7 + (normalizedZ * 0.3); // 0.7 to 1
    
    return {
      transform: `translateX(${x.toFixed(2)}px) translateZ(${z.toFixed(2)}px) rotateY(${rotateY}deg) scale(${scale.toFixed(3)})`,
      opacity: opacity.toFixed(1),
      zIndex: Math.round(z + radius).toString()
    };
  };

  return (
    <section id="services" className="relative py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-32 right-16 w-24 h-24 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-lg"
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1, 0.8, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-lg"
          animate={{
            x: [0, 35, 0],
            y: [0, -20, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 0.9, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/4 right-20 w-4 h-4 bg-blue-500/30 rotate-45"
          animate={{
            y: [0, -40, 0],
            rotate: [45, 225, 45],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 3
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-16 w-3 h-3 bg-emerald-500/40 rounded-full"
          animate={{
            x: [0, 30, 0],
            y: [0, -25, 0],
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 4
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-2 h-8 bg-purple-500/25 rounded-full"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.5, 0.25]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 2.5
          }}
        />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(90deg, #407bff 1px, transparent 1px),
                               linear-gradient(180deg, #407bff 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '40px 40px', '0px 0px']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dynamic Header */}
        <div className="text-center mb-8">
          {/* Animated "Our Services" with gradient text */}
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 relative"
            style={{ fontFamily: 'League Spartan, sans-serif' }}
          >
            <motion.span
                              className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Our Services
            </motion.span>
            
            {/* Subtle glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-indigo-600/20 blur-xl -z-10"
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [0.8, 1.1, 0.8]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.h2>
          
          {/* Dynamic subtitle with typewriter effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto relative"
            style={{ fontFamily: 'League Spartan, sans-serif' }}
          >
            {/* Animated text with highlights */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.span
                className="inline-block"
                animate={{ 
                  color: ['#6b7280', '#3b82f6', '#6b7280'],
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  delay: 1
                }}
              >
                24/7
              </motion.span>
              {' '}business support that{' '}
              <motion.span
                className="relative inline-block"
                animate={{ 
                  color: ['#6b7280', '#10b981', '#6b7280'],
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  delay: 1.5
                }}
              >
                never sleeps
                {/* Subtle underline animation */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 2, duration: 0.8 }}
                />
              </motion.span>
            </motion.span>
            
            {/* Floating particles around the text */}
            <motion.div
              className="absolute -top-2 -right-4 w-2 h-2 bg-blue-400 rounded-full opacity-60"
              animate={{
                y: [0, -8, 0],
                x: [0, 4, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 3
              }}
            />
            <motion.div
              className="absolute -bottom-1 -left-6 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-50"
              animate={{
                y: [0, 6, 0],
                x: [0, -3, 0],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 3.5
              }}
            />
            <motion.div
              className="absolute top-1 left-1/3 w-1 h-1 bg-indigo-400 rounded-full opacity-40"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: 4
              }}
            />
          </motion.div>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative h-[550px] flex items-center justify-center">
          {/* 3D Scene Container */}
          <div 
            className="relative w-full h-full"
            style={{ 
              perspective: '1200px',
              perspectiveOrigin: 'center center'
            }}
          >
            {/* 3D Carousel */}
            <div 
              className="relative w-full h-full"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'translateZ(-320px)'
              }}
            >
              {services.map((service, index) => {
                const cardStyle = getCardStyle(index);
                const isActive = index === currentIndex;
                
                return (
                  <motion.div
                    key={service.id}
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-88 cursor-pointer ${
                      isActive ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    style={cardStyle}
                    animate={cardStyle}
                    transition={{ 
                      duration: 0.8, 
                      ease: "easeInOut",
                      opacity: { duration: 0.6 }
                    }}
                    onClick={() => !isActive && goToService(index)}
                    whileHover={isActive ? { 
                      scale: cardStyle.transform.includes('scale(1)') ? 1.05 : undefined,
                      y: -10 
                    } : {}}
                  >
                    {/* Card */}
                    <div className={`
                      w-full h-full rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20
                      ${isActive 
                        ? 'bg-white/95 shadow-blue-200/50' 
                        : 'bg-white/80 shadow-gray-200/30'
                      }
                    `}>
                      {/* Card Content */}
                      <div className="p-6 h-full flex flex-col items-center justify-center text-center">
                        {/* Icon with neutral background, blue on active */}
                        <div className={`
                          w-18 h-18 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white transition-all duration-500
                          ${isActive 
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg' 
                            : 'bg-gradient-to-br from-gray-500 to-gray-600 shadow-md'
                          }
                        `}>
                          {service.icon}
                        </div>

                        {/* Time Badge */}
                        <div className="mb-3">
                          <span className={`
                            text-sm font-medium px-4 py-2 rounded-full
                            ${isActive 
                              ? 'text-blue-700 bg-blue-100' 
                              : 'text-gray-600 bg-gray-100'
                            }
                          `} style={{ fontFamily: 'Inter, sans-serif' }}>
                            {service.time}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 
                          className={`
                            text-lg font-bold mb-2 leading-tight
                            ${isActive ? 'text-gray-900' : 'text-gray-700'}
                          `}
                          style={{ fontFamily: 'League Spartan, sans-serif' }}
                        >
                          {service.title}
                        </h3>
                        
                        {/* Description */}
                        <p 
                          className={`
                            text-sm mb-3 leading-relaxed
                            ${isActive ? 'text-gray-600' : 'text-gray-500'}
                          `}
                          style={{ fontFamily: 'League Spartan, sans-serif' }}
                        >
                          {service.description}
                        </p>

                        {/* Detail (only shown on active card) */}
                        {isActive && (
                          <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-xs text-gray-700 leading-relaxed"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {service.detail}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevService}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 z-20"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextService}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 z-20"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Enhanced Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => goToService(index)}
              className={`
                relative w-4 h-4 rounded-full transition-all duration-500 overflow-hidden
                ${index === currentIndex 
                  ? `bg-gradient-to-r from-blue-500 to-blue-600 scale-125 shadow-lg` 
                  : 'bg-gray-300 hover:bg-gray-400 scale-100'
                }
              `}
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </button>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Services;