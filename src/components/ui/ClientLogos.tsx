import React from "react";

interface ClientLogoProps {
  name: string;
  className?: string;
}

const ClientLogo: React.FC<ClientLogoProps> = ({ name, className = "" }) => {
  const getLogoSrc = (name: string) => {
    switch (name) {
      case "Alabama Rx Card":
        return "/logos/alabama-logo.png";
      case "Texas Drug Card":
        return "/logos/texas-drug-logo.png";
      case "California Rx Card":
        return "/logos/california-logo.png";
      case "Louisiana Drug Card":
        return "/logos/index-louisiana-logo.png";
      case "Georgia Drug Card":
        return "/logos/georgia-logo.png";
      case "South Carolina Drug Card":
        return "/logos/south-carolina-logo.png";
      case "Smallcakes Cupcakery":
        return "/logos/smallcakes.jpeg";
      case "United Networks of America":
        return "/logos/una-logo.png";
      case "Florida Rx Card":
        return "/logos/florida-logo.png";
      case "Louisiana Dental Plan":
        return "/logos/ldp.jpg";
      default:
        return "";
    }
  };

  const logoSrc = getLogoSrc(name);

  if (logoSrc) {
    // Special cases for smaller logos
    const isGeorgiaDrugCard = name === "Georgia Drug Card";
    const isLouisianaDentalPlan = name === "Louisiana Dental Plan";
    
    let logoHeight = 'h-16'; // default size
    if (isGeorgiaDrugCard) logoHeight = 'h-12';
    if (isLouisianaDentalPlan) logoHeight = 'h-12';
    
    return (
      <div className={`${className}`}>
        <img 
          src={logoSrc} 
          alt={`${name} logo`} 
          className={`${logoHeight} w-auto object-contain`}
        />
      </div>
    );
  }

  // Fallback for any logos not yet created
  return (
    <div className={`bg-black text-white px-6 py-4 rounded-lg font-semibold text-center ${className}`}>
      {name}
    </div>
  );
};

export default ClientLogo; 