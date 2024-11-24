'use client';
import Image from "next/image";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const WeTextSection = () => {
  // Images to display on hover
  const Images = ['game-console', 'hashtag', 'earth', 'mikes'];
  // Refs for circle and underline
  const circleRef = useRef();
  const underlineRef = useRef();
  const hoverTimeoutRef = useRef(null);
  const resetTimeoutRef = useRef(null);
  // Active text and image on hover
  const [activeText, setActiveText] = useState('');
  const [activeImage, setActiveImage] = useState(Images[0]);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(circleRef.current, {
      x: activeText ? activeText.offsetLeft - 16 : 0,
      y: activeText ? activeText.offsetTop - 36 : 0,
      duration: 0.5,
      ease: "power2.out",
    })
    .to(underlineRef.current, {
      width: activeText ? activeText.offsetWidth : 0,
      top: activeText ? activeText.offsetTop + activeText.offsetHeight - 16 : 0,
      duration: 0.3,
      ease: "power2.out",
    }, "<");
  }, [activeText]);

  const handleTextMouseOver = (e) => {
    clearTimeout(resetTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveText(e.target);
      setActiveImage(Images[e.target.dataset.index]);
      setIsHovered(true);
    }, 100);
  };

  const handleTextMouseOut = () => {
    clearTimeout(hoverTimeoutRef.current);
    resetTimeoutRef.current = setTimeout(() => {
      setActiveText(null);
      setIsHovered(false);
    }, 700);
  };

  return (
    <div className="gap-36 w-full h-screen flex-center mx-auto ">
      <div className="relative uppercase space-y-4 py-6 text-google-grey font-sora text-4xl pl-4 border-l-4">
        <div ref={circleRef} className="absolute -left-[12px] top-12 w-5 h-5 rounded-full bg-google-lightGrey bg-opacity-85"></div>
        <div ref={underlineRef} className="absolute top-16 w-full left-4 h-1 bg-google-lightGrey transition-all duration-400 ease-out"></div>
        <div onMouseOver={handleTextMouseOver} onMouseOut={handleTextMouseOut} data-index="0" className={`${activeText?.dataset?.index === '0' ? 'text-google-lightGrey' : ''} transition-colors duration-300`}>we enjoy</div>
        <div onMouseOver={handleTextMouseOver} onMouseOut={handleTextMouseOut} data-index="1" className={`${activeText?.dataset?.index === '1' ? 'text-google-lightGrey' : ''} transition-colors duration-300`}>we evolve</div>
        <div onMouseOver={handleTextMouseOver} onMouseOut={handleTextMouseOut} data-index="2" className={`${activeText?.dataset?.index === '2' ? 'text-google-lightGrey' : ''} transition-colors duration-300`}>we develop</div>
        <div onMouseOver={handleTextMouseOver} onMouseOut={handleTextMouseOut} data-index="3" className={`${activeText?.dataset?.index === '3' ? 'text-google-lightGrey' : ''} transition-colors duration-300`}>we support</div>
      </div>
      <div className="relative">
        <div className={`w-40 h-40 grid-image bg-google-lightGrey rounded-full blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-50' : 'opacity-0'}`}></div>
        <Image className="rotate-1" src={'/assets/svgs/frame.svg'} width={400} height={400} alt="frame" priority/>
        <Image
          className={`w-40 grid-image hover:scale-item transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          src={`/assets/illustrations/${activeImage}.png`}
          alt={activeImage}
          width={400}
          height={400}
          priority
        />
      </div>
    </div>
  );
};

export default WeTextSection;
