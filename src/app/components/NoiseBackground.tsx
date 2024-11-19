import React from 'react';

interface NoiseBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const NoiseBackground: React.FC<NoiseBackgroundProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`relative isolation-auto ${className}`}>
      <div 
        className="pointer-events-none fixed inset-0 h-full w-full opacity-50 mix-blend-soft-light"
        style={{
          backgroundImage: `url(assets/svgs/nnnoise.svg)`,
          zIndex: 100
        }}
      />
      {children}
    </div>
  );
};
