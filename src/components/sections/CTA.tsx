import React from "react";
import { motion } from "framer-motion";

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Track Your AI Integration Progress
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl mb-8"
          >
            Access your personalized analytics dashboard to monitor performance, track improvements, and view detailed reports on your AI integrations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a 
              href="https://v0-dentist-ai-platform.vercel.app" 
              className="px-8 py-3 rounded-full bg-white text-black font-medium hover:shadow-lg transition-all inline-block"
            >
              Access Dashboard
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 