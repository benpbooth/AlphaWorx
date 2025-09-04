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
    // Special cases for logo sizing
    const isGeorgiaDrugCard = name === "Georgia Drug Card";
    const isSmallcakes = name === "Smallcakes Cupcakery";
    
    let logoHeight = 'h-8'; // default size (further reduced)
    if (isGeorgiaDrugCard) logoHeight = 'h-6';
    if (isSmallcakes) logoHeight = 'h-12'; // Make Smallcakes bigger but still reduced
    
    return (
      <div className={`${className} transition-all duration-300 hover:opacity-50`}>
        <img 
          src={logoSrc} 
          alt={`${name} logo`} 
          className={`${logoHeight} w-auto object-contain mx-auto transition-all duration-300`}
          style={{ 
            filter: 'brightness(0) saturate(100%) invert(1) contrast(100%) brightness(100%)',
            mixBlendMode: 'screen'
          }}
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
