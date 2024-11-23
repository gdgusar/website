import React from 'react';
import Image from 'next/image';

const hero = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      {/* Tunnel SVG */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/assets/svgs/Tunnel.svg"
          layout="fill"
          alt="Tunnel"
          className="object-contain"
        />
      </div>

      {/* GDG-USAR Text */}
      <div className="absolute bottom-1/4 z-10 text-center">
        <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
          GDG-USAR
        </h1>
      </div>
    </div>
  );
};

export default hero;
