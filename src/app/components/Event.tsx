import Image from "next/image";
import React from "react";
import Belt from "./Belt";

const Event = () => {
  return (
    <div className="w-full h-screen container mx-auto px-12">
      <div className="w-full ml-4 md:ml-0 flex justify-center items-center mb-8">
        <h2
          className="text-4xl md:text-5xl font-sora mb-8 text-center uppercase text-white bg-gradient-to-r from-google-lightBlue to-google-lightYellow bg-clip-text text-transparent"
          style={{
            textShadow:
              "0 0 3px rgba(150, 150, 150, 0.8), 0 0 5px rgba(150, 150, 150, 0.6), 0 0 1px rgba(150, 150, 150, 0.4)",
          }}
        >
          Our Team
        </h2>
        <Image
          src={"/assets/svgs/arrow.svg"}
          width={80}
          height={80}
          alt="arrow"
          className="w-24 md:w-20"
        />
      </div>
      <Belt />
    </div>
  );
};

export default Event;
