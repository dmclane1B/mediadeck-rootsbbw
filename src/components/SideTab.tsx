import React from 'react';

interface SideTabProps {
  text: string;
  position?: 'left' | 'right';
  className?: string;
}

const SideTab: React.FC<SideTabProps> = ({ text, position = 'right', className = "" }) => {
  const baseClasses = "absolute top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-20 shadow-elegant animate-slide-in hidden md:flex";
  const positionClasses = position === 'right' 
    ? "right-0 rounded-l-lg" 
    : "left-0 rounded-r-lg";

  return (
    <div className={`${baseClasses} ${positionClasses} ${className}`}>
      <div className="transform rotate-90 text-lg font-medium whitespace-nowrap font-space">
        {text}
      </div>
    </div>
  );
};

export default SideTab;