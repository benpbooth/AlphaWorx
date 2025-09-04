import React from "react";

interface ClientLogoProps {
  name: string;
  className?: string;
}

const ClientLogo: React.FC<ClientLogoProps> = ({ name, className = "" }) => {
  // For now, show text fallbacks since we don't have the actual logo files
  // TODO: Replace with actual logo images when available
  return (
    <div className={`${className} transition-all duration-300 hover:opacity-80`}>
      <div className="text-white text-xs font-medium px-3 py-2 bg-gray-700 rounded-md whitespace-nowrap">
        {name}
      </div>
    </div>
  );
};

export default ClientLogo;
