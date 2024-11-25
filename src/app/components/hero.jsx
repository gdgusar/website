import React from 'react';
import Image from 'next/image';
import Scene from './Scene';

const Hero = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden">
      {/* Tunnel SVG with proper responsiveness */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src="/assets/svgs/Tunnel.svg"
            layout="fill"
            priority
            alt="Tunnel"
            className="object-cover" // Ensures it covers the entire background without stretching
          />
        </div>
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* GDG-USAR Text */}
      <div className="absolute bottom-1/4 z-10 text-center w-full">
        <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
          GDG-USAR
        </h1>
      </div>
    </div>
  );
};

export default Hero;
