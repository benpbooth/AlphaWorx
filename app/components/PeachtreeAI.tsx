"use client";

import React from "react";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import About from "./sections/About";
import Contact from "./sections/Contact";

import Footer from "./sections/Footer";
// import Chatbot from "./Chatbot/Chatbot";

interface AIBusinessWebsiteProps {
  companyName?: string;
  primaryColor?: string;
  accentColor?: string;
  ctaText?: string;
}

const PeachtreeAI: React.FC<AIBusinessWebsiteProps> = ({
      companyName = "A3 Solutions",
  primaryColor = "#407bff",
  accentColor = "#407bff",
  ctaText = "Login"
}) => {
  return (
    <div className="font-sans text-gray-800">
      <Header ctaText={ctaText} />
      <Hero ctaText={ctaText} />
      <Services />
      <About companyName={companyName} />
      <Contact companyName={companyName} />
      <Footer companyName={companyName} />
      
      {/* Chatbot temporarily disabled */}
      {/* <Chatbot
        primaryColor="#000000"
        title="Chat with UNA"
        placeholder="How can we help you today?"
      /> */}
    </div>
  );
};

export default PeachtreeAI; 