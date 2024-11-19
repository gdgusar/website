import Image from "next/image";
import React from "react";

const BentoGrid: React.FC = () => {
  return (
    <div className="min-h-screen px-8">
      <div className="max-w-4xl mx-auto flex-center flex-wrap gap-0  md:gap-8">
        <div className="relative">
          <Image
            className=" w-96 h-96 md:w-80 md:h-80  "
            src="/assets/svgs/frame-square.svg"
            alt="game console frame"
            width={448}
            height={448}
          />
          <Image
            className="w-40 grid-image"
            src="/assets/illustrations/game-console.png"
            alt="game console"
            width={237}
            height={355}
          />
        </div>
        <div className="relative">
          <Image
            className="w-96 h-72"
            src="/assets/svgs/frame-rect.svg"
            alt="earth frame"
            width={640}
            height={464}
          />
          <Image
            className="w-48 grid-image"
            src="/assets/illustrations/earth.png"
            alt="earth"
            width={237}
            height={355}
          />
        </div>
        <div className="relative">
          <Image
            className="w-96 h-72"
            src="/assets/svgs/frame-rect.svg"
            alt="mikes frame"
            width={640}
            height={464}
          />
          <Image
            className="w-48 grid-image"
            src="/assets/illustrations/mikes.png"
            alt="mikes"
            width={237}
            height={355}
          />
        </div>
        <div className="relative">
          <Image
           className=" w-96 h-96 md:w-80 md:h-80  "
            src="/assets/svgs/frame-square.svg"
            alt="hashtag frame"
            width={448}
            height={448}
          />
          <Image
            className="w-56 grid-image"
            src="/assets/illustrations/hashtag.png"
            alt="hashtag"
            layout="intrinsic"
            width={237}
            height={355}
          />
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
