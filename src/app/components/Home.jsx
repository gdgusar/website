import React from 'react';
import Image from 'next/image';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#141414] relative">
            <div className="absolute inset-0 flex items-center justify-center">
                <Image
                    src="./assets/Tunnel.svg"
                    alt="Tunnel Background"
                    layout="fill"
                    objectFit="contain"
                    className="opacity-50 p-4"
                />
            </div>
            <div className="z-10 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-blue-600 font-sora mb-4">GDG-USAR</h1>
                <p className="mt-4 text-base md:text-lg text-[#a92a2a]">This is a boilerplate component.</p>
            </div>
        </div>
    );
};

export default Home;