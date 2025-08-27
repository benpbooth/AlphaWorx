import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";

interface ContactProps {
  companyName: string;
}

const Contact: React.FC<ContactProps> = ({ companyName }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      info: "(225) 964-0551"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      info: "benpaulboothgmail.com"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      info: "2620 Milford Lane\nAlpharetta, GA 30009"
    }
  ];

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-gray-50 overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0">
        {/* Large floating orbs */}
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-blue-100 rounded-full opacity-10"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-32 right-16 w-32 h-32 bg-purple-100 rounded-full opacity-10"
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-100 rounded-full opacity-10"
          animate={{
            x: [0, 35, 0],
            y: [0, -20, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-32 right-1/3 w-28 h-28 bg-yellow-100 rounded-full opacity-10"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Floating particles with fixed positions */}
        {[
          { left: 12.99, top: 13.27, x: 30, y: -25, scale: 0.8, duration: 12, delay: 0 },
          { left: 91.25, top: 12.88, x: -40, y: 35, scale: 1.2, duration: 15, delay: 1 },
          { left: 43.16, top: 25.04, x: 20, y: -30, scale: 0.6, duration: 18, delay: 2 },
          { left: 49.98, top: 44.16, x: -25, y: 15, scale: 1.0, duration: 14, delay: 3 },
          { left: 7.03, top: 77.69, x: 35, y: -20, scale: 0.9, duration: 16, delay: 4 },
          { left: 52.08, top: 67.84, x: -30, y: 25, scale: 0.7, duration: 13, delay: 1.5 },
          { left: 70.03, top: 90.49, x: 15, y: -35, scale: 1.1, duration: 17, delay: 2.5 },
          { left: 36.02, top: 80.17, x: -20, y: 30, scale: 0.8, duration: 11, delay: 3.5 }
        ].map((particle, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 bg-blue-400 rounded-full opacity-40`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              x: [0, particle.x, 0],
              y: [0, particle.y, 0],
              scale: [1, particle.scale, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(90deg, #407bff 1px, transparent 1px),
                               linear-gradient(180deg, #407bff 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px', '0px 0px']
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
                Ready to Get Started?
              </span>
            </motion.div>
            
            {/* Dynamic "Get in Touch" with gradient text */}
            <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6 relative"
              style={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              <motion.span
                className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Get in Touch
              </motion.span>
              
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/15 via-blue-500/15 to-purple-600/15 blur-lg -z-10"
                animate={{ 
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.9, 1.08, 0.9]
                }}
                transition={{ 
                  duration: 4.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.h2>
            
            {/* Dynamic subtitle with animated highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto relative"
              style={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              Ready to transform your business with 24/7 AI support? Let's discuss your needs.
            </motion.div>
          </div>

          {/* Sleek Contact Cards */}
          <div className="flex flex-col lg:flex-row gap-4 mb-16 max-w-4xl mx-auto">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 * index
                }}
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                className="flex-1 group cursor-pointer"
              >
                <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 hover:bg-white hover:border-blue-200/60 transition-all duration-300 overflow-hidden">
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/30 to-blue-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  
                  <div className="relative z-10 flex items-center space-x-4">
                    {/* Minimal icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center text-white group-hover:bg-gray-600 transition-colors duration-300">
                        {contact.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="text-sm font-semibold text-gray-900 mb-1"
                        style={{ fontFamily: 'League Spartan, sans-serif' }}
                      >
                        {contact.title}
                      </h3>
                      <p 
                        className="text-sm text-blue-600 font-medium whitespace-pre-line group-hover:text-blue-700 transition-colors duration-300"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {contact.info}
                      </p>
                    </div>
                    
                    {/* Subtle arrow indicator */}
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-5 h-5 text-gray-400">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="p-8 md:p-12">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <h3 
                    className="text-2xl font-bold mb-4 text-gray-900"
                    style={{ fontFamily: 'League Spartan, sans-serif' }}
                  >
                    Message Sent Successfully!
                  </h3>
                  <p 
                    className="text-gray-600 text-lg"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <div>
                  <div className="text-center mb-8">
                    <h3 
                      className="text-2xl font-bold mb-2 text-gray-900"
                      style={{ fontFamily: 'League Spartan, sans-serif' }}
                    >
                      Send us a Message
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <motion.label 
                        htmlFor="name" 
                        className="block text-gray-700 font-medium mb-2"
                        style={{ fontFamily: 'League Spartan, sans-serif' }}
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        Name
                      </motion.label>
                      <motion.input 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 bg-white"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        placeholder="Your name"
                        required
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <motion.label 
                        htmlFor="email" 
                        className="block text-gray-700 font-medium mb-2"
                        style={{ fontFamily: 'League Spartan, sans-serif' }}
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        Email
                      </motion.label>
                      <motion.input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 bg-white"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        placeholder="your@email.com"
                        required
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <motion.label 
                        htmlFor="message" 
                        className="block text-gray-700 font-medium mb-2"
                        style={{ fontFamily: 'League Spartan, sans-serif' }}
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        Message
                      </motion.label>
                      <motion.textarea 
                        id="message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 bg-white resize-none"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        placeholder="Tell us about your business needs..."
                        required
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-center"
                    >
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                        style={{ fontFamily: 'League Spartan, sans-serif' }}
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </motion.button>
                    </motion.div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;