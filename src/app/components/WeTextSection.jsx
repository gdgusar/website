import Image from "next/image";
import React from "react";

const WeTextSection = () => {
  const Images = ['game-console', 'hashtag', 'earth', 'mikes'];

return (
    <div className="gap-36 w-full h-screen flex-center mx-auto">
        <div className="relative uppercase space-y-4 py-6 text-google-grey font-sora text-4xl pl-4 border-l-4 before:content-[''] before:absolute before:-left-[13px] before:top-8 before:w-5 before:h-5 before:rounded-full before:bg-google-lightGrey before:opacity-85" >
            <div className="border-b-4">we enjoy</div>
            <div>we evolve</div>
            <div>we develop</div>
            <div>we support</div>
        </div>
        <div className="relative">
        <Image src={'/assets/svgs/frame.svg'} width={400} height={400} alt="frame" priority/>
        <Image
            className="w-36 grid-image hover:scale-item"
            src={`/assets/illustrations/${Images[0]}.png`}
            alt="game console"
            width={400}
            height={400}
            priority
          />
        </div>
    </div>
);
};

export default WeTextSection;
