import React from 'react';
import Image from 'next/image';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/assets/svgs/Tunnel.svg"
                    alt="Tunnel Background"
                    fill
                    priority
                    sizes="100vh"
                    className="opacity-100 object-contain p-2 md:p-8 lg:p-12"
                />
            </div>
            <div className="z-10 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-blue-600 font-sora mb-4">GDG-USAR</h1>
                <p className="mt-4 text-base md:text-lg text-[#a92a2a] font-noto-sans">This is a boilerplate component.</p>
            </div>
        </div>
    );
};

export default Home;