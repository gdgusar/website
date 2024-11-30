"use client";

import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

const AboutUs = () => {
  
  const imageRefs = useRef([]);
  const frameRefs = useRef([]);

  const handleMouseEnter = (index) => {
   
    gsap.killTweensOf(imageRefs.current[index]);
    gsap.killTweensOf(frameRefs.current[index]);

    
    if (frameRefs.current[index]) {
      gsap.to(frameRefs.current[index], {
        scale: 1.1, 
      });
    }

    if (imageRefs.current[index]) {
      gsap.to(imageRefs.current[index], {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power1.out",
      });
    }
  };

  const handleMouseLeave = (index) => {

    gsap.killTweensOf(imageRefs.current[index]);
    gsap.killTweensOf(frameRefs.current[index]);

    if (imageRefs.current[index]) {
      gsap.to(imageRefs.current[index], {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power1.in",
      });
    }

    if (frameRefs.current[index]) {
      gsap.to(frameRefs.current[index], {
        scale: 1,
        rotation: 0, 
        duration: 0.5,
        ease: "power1.in",
      });
    }
  };

  const items = [
    { text: "Learn", image: "/assets/illustrations/bulb.svg" },
    { text: "Connect", image: "/assets/illustrations/hashtag.png" },
    { text: "Grow", image: "/assets/illustrations/arrow.svg" },
  ];

  return (
    <div className="p-6 py-10 w-full h-full flex flex-col items-center justify-center space-y-10">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative flex items-center space-x-[75px]"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center space-x-4 mb-5">
              <Image
                src="/assets/svgs/Exclude.svg"
                alt="miniframe"
                width={30}
                height={30}
              />
              {/* Text */}
              <p className="font-noto-sans text-[#D2E3F3] font-bold text-4xl uppercase">
                {item.text}
              </p>
            </div>
            <Image
              src="/assets/svgs/Line 1.svg"
              alt="line"
              height={10}
              width={300}
            />
          </div>
          {/* Image */}
          <div
            ref={(el) => (imageRefs.current[index] = el)} // Assign ref dynamically
            style={{
              opacity: 0,
              transform: "scale(0.8)", // Initial state for GSAP
            }}
            className="relative w-[150px] h-[150px]"
          >
            <Image
              src="/assets/svgs/customFrame.svg"
              alt="frame"
              height={200}
              width={200}
              ref={(el) => (frameRefs.current[index] = el)} // Assign frame ref dynamically
              className="absolute top-0 left-0 z-0" // Position frame at the base layer
            />
            <Image
              src={item.image}
              alt={item.text}
              height={112}
              width={112}
              className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-10 object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;