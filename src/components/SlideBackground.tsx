import React from 'react';

interface SlideBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const SlideBackground: React.FC<SlideBackgroundProps> = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen bg-background relative overflow-hidden ${className}`}>
      {/* Consistent Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/roots-logo-brand.png" 
          alt="Roots Community Health Logo" 
          className="w-full h-full object-contain opacity-5"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/95"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SlideBackground;