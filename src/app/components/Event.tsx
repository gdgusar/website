import Image from "next/image";
import React from "react";
import Belt from "./Belt";

const Event: React.FC = () => {
  return (
    <div className="w-full mx-auto md:px-12 relative">
      <div className="w-full ml-4 md:ml-0 flex justify-center items-center mb-4">
        <h2
          className="text-4xl md:text-5xl font-sora mb-8 text-center uppercase text-white bg-gradient-to-r from-google-lightBlue to-google-lightYellow bg-clip-text text-transparent"
          style={{
            textShadow:
              "0 0 3px rgba(150, 150, 150, 0.8), 0 0 5px rgba(150, 150, 150, 0.6), 0 0 1px rgba(150, 150, 150, 0.4)",
          }}
        >
          Events
        </h2>
        <Image
          src={"/assets/svgs/arrow.svg"}
          width={80}
          height={80}
          alt="arrow"
          className="w-24 md:w-20"
        />
      </div>
      <div className="w-full">
        <div className="w-full h-12 relative z-10">
          <Image
            src={"/assets/svgs/latest-event-ribbon.svg"}
            alt="team"
            fill={true}
            style={{ objectFit: "cover" }}
            className=""
          />
        </div>
        <div className="my-16 px-12 md:my-20 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 md:px-36 relative">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className={`relative w-full frame`}>
              <div className="relative">
                <div
                  className={`absolute w-[400px] h-[400px] inset-0 bg-google-blue blur-3xl opacity-50 brightness-75 -z-20`}
                ></div>
                <Image
                  src={"/assets/svgs/event-frame.svg"}
                  alt={index.toString()}
                  width={240}
                  height={240}
                  className="w-full z-10"
                />
                <Image
                  src={"/assets/images/event-1.jpg"}
                  alt={index.toString()}
                  width={640}
                  height={800}
                  className="w-full p-10 md:p-7 lg:p-11 absolute inset-1 object-cover rounded-lg -z-10"
                />

                <div className="w-16 h-16 absolute inset-8 flex flex-col items-center justify-center">
                  <p className="text-black font-semibold font-sans text-lg">
                    23 NOV 2024
                  </p>
                </div>
              </div>
              <div className="py-4 flex justify-around items-center ">
                <h3 className="text-2xl font-sora font-bold text-white">
                  Text {index}
                </h3>
                <p className="text-lg font-sora text-white">name of {index}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* past event section */}
      <div className="w-full">
        <div className="w-full h-12 relative z-10">
          <Image
            src={"/assets/svgs/past-event-ribbon.svg"}
            alt="team"
            fill={true}
            style={{ objectFit: "cover" }}
            className=""
          />
        </div>
        <div className="my-16 px-12 md:my-20 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 md:px-36 relative">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className={`relative w-full frame`}>
              <div className="relative">
                <div
                  className={`absolute w-[400px] h-[400px] inset-0 bg-google-blue blur-3xl opacity-50 brightness-75 -z-20`}
                ></div>
                <Image
                  src={"/assets/svgs/event-frame.svg"}
                  alt={index.toString()}
                  width={240}
                  height={240}
                  className="w-full z-10"
                />
                <Image
                  src={"/assets/images/event-1.jpg"}
                  alt={index.toString()}
                  width={640}
                  height={800}
                  className="w-full p-10 md:p-7 lg:p-11 absolute inset-1 object-cover rounded-lg -z-10"
                />

                <div className="w-16 h-16 absolute inset-8 flex flex-col items-center justify-center">
                  <p className="text-black font-semibold font-sans text-lg">
                    23 NOV 2024
                  </p>
                </div>
              </div>
              <div className="py-4 flex justify-around items-center ">
                <h3 className="text-2xl font-sora font-bold text-white">
                  Text {index}
                </h3>
                <p className="text-lg font-sora text-white">name of {index}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
