import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, MessageSquare, BarChart2, Zap, Users } from "lucide-react";

const Services: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "AI Strategy Consulting",
      description: "We help you develop a comprehensive AI strategy tailored to your business needs and goals.",
      icon: <MessageSquare className="w-12 h-12 text-blue-500" />
    },
    {
      id: 2,
      title: "Workflow Integration",
      description: "Seamlessly integrate AI solutions into your existing workflows to boost productivity and efficiency.",
      icon: <BarChart2 className="w-12 h-12 text-green-500" />
    },
    {
      id: 3,
      title: "Custom AI Solutions",
      description: "Develop bespoke AI applications designed specifically for your unique business challenges.",
      icon: <Zap className="w-12 h-12 text-purple-500" />
    },
    {
      id: 4,
      title: "AI Training & Support",
      description: "Comprehensive training and ongoing support to ensure your team maximizes the potential of AI tools.",
      icon: <Users className="w-12 h-12 text-orange-500" />
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6" style={{ color: '#000000', fontFamily: 'League Spartan, sans-serif' }}>Our Services</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            Transform your business with tailored AI solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'League Spartan, sans-serif' }}>{service.title}</h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>{service.description}</p>
              <a href="#contact" className="text-black font-medium inline-flex items-center" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Learn more <ChevronRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 