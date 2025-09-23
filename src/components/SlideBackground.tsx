import React from 'react';

interface SlideBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'magazine' | 'minimal';
}

const SlideBackground: React.FC<SlideBackgroundProps> = ({ 
  children, 
  className = "",
  variant = 'default'
}) => {
  return (
    <div className={`min-h-screen min-h-[100dvh] bg-background relative overflow-hidden ${className}`}>
      {/* Consistent Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/roots-logo-new.png" 
          alt="Roots Community Health Logo" 
          className={`w-full h-full object-contain opacity-5 sm:opacity-10`}
          loading="lazy"
        />
        <div className={`absolute inset-0 ${
          variant === 'magazine' 
            ? 'bg-background/98' 
            : variant === 'minimal'
            ? 'bg-background/90'
            : 'bg-background/95'
        }`}></div>
      </div>
      
      {/* Content with mobile-optimized padding */}
      <div className="relative z-10 pb-safe">
        {children}
      </div>
    </div>
  );
};

export default SlideBackground;