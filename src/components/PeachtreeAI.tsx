import React from "react";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import About from "./sections/About";
import Contact from "./sections/Contact";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";
import { Chatbot } from "./Chatbot";

interface AIBusinessWebsiteProps {
  companyName?: string;
  primaryColor?: string;
  accentColor?: string;
  ctaText?: string;
}

const PeachtreeAI: React.FC<AIBusinessWebsiteProps> = ({
  companyName = "Peachtree.AI",
  primaryColor = "#000000",
  accentColor = "#000000",
  ctaText = "Login"
}) => {
  return (
    <div className="font-sans text-gray-800">
      <Header ctaText={ctaText} />
      <Hero ctaText={ctaText} />
      <Services />
      <About companyName={companyName} />
      <Contact companyName={companyName} />
      <CTA />
      <Footer companyName={companyName} />
      
      {/* Chatbot - positioned at bottom right */}
      <Chatbot
        primaryColor="#000000"
        title="Chat with UNA"
        placeholder="How can we help you today?"
      />
    </div>
  );
};

export default PeachtreeAI; 