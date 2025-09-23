import React from 'react';

interface UniversalSlideBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'magazine' | 'minimal' | 'hero';
  withHeader?: boolean;
  headerContent?: React.ReactNode;
}

const UniversalSlideBackground: React.FC<UniversalSlideBackgroundProps> = ({ 
  children, 
  className = "",
  variant = 'default',
  withHeader = false,
  headerContent
}) => {
  // Determine background overlay opacity based on variant
  const getOverlayOpacity = () => {
    switch (variant) {
      case 'magazine': return 'bg-background/98';
      case 'minimal': return 'bg-background/90';
      case 'hero': return 'bg-background/85';
      default: return 'bg-background/95';
    }
  };

  // Determine logo opacity based on variant and screen size
  const getLogoOpacity = () => {
    return 'opacity-3 sm:opacity-5 md:opacity-8';
  };

  return (
    <div className={`min-h-screen min-h-[100dvh] bg-background relative overflow-hidden ${className}`}>
      {/* Consistent Background Logo */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/roots-logo-new.png" 
          alt="Roots Community Health Logo" 
          className={`w-full h-full object-contain ${getLogoOpacity()}`}
          loading="lazy"
        />
        <div className={`absolute inset-0 ${getOverlayOpacity()}`}></div>
      </div>
      
      {/* Optional Magazine-style Header */}
      {withHeader && headerContent && (
        <div className="relative z-10 border-b border-border/20">
          {headerContent}
        </div>
      )}
      
      {/* Content with proper mobile optimization */}
      <div className="relative z-10 pb-safe">
        {children}
      </div>
    </div>
  );
};

export default UniversalSlideBackground;