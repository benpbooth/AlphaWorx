import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";

interface AboutProps {
  companyName: string;
}

const About: React.FC<AboutProps> = ({ companyName }) => {
  const features = [
    "Customized AI solutions tailored to your business",
    "Seamless integration with existing systems",
    "Ongoing support and maintenance",
    "Data privacy and security compliance",
    "Scalable solutions that grow with your business",
    "ROI-focused implementation strategy"
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team working on AI solutions"
                className="rounded-lg shadow-xl w-full"
              />
            </motion.div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose {companyName}?</h2>
              <p className="text-lg text-gray-600 mb-6">
                We're not just another AI company. We focus on practical, results-driven solutions that integrate seamlessly with your existing workflows and deliver measurable ROI.
              </p>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-green-500 w-6 h-6 mr-2 flex-shrink-0 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 