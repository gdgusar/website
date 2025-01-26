import Image from "next/image";
import React from "react";
import EventCarousel from "./EventCarousel";

const Event: React.FC = () => {

  const latestEvents = [
    {
      image: "/assets/images/event-1.jpg",
      date: "23 NOV 2024",
      name: "name of 1",
    },
    {
      image: "/assets/images/event-2.jpg",
      date: "23 NOV 2024",
      name: "name of 2",
    },
    {
      image: "/assets/images/event-3.jpg",
      date: "23 NOV 2024",
      name: "name of 3",
    },
    {
      image: "/assets/images/event-4.jpg",
      date: "23 NOV 2024",
      name: "name of 4",
    },
    {
      image: "/assets/images/event-5.jpg",
      date: "23 NOV 2024",
      name: "name of 5",
    },
    {
      image: "/assets/images/event-6.jpg",
      date: "23 NOV 2024",
      name: "name of 6",
    },
    {
      image: "/assets/images/event-7.jpg",
      date: "23 NOV 2024",
      name: "name of 7",
    },
    {
      image: "/assets/images/event-8.jpg",
      date: "23 NOV 2024",
      name: "name of 8",
    },
    {
      image: "/assets/images/event-9.jpg",
      date: "23 NOV 2024",
      name: "name of 9",
    },
    {
      image: "/assets/images/event-10.jpg",
      date: "23 NOV 2024",
      name: "name of 10",
    }
  ]
  const pastEvents = [
    {
      image: "/assets/images/event-1.jpg",
      date: "23 NOV 2024",
      name: "name of 1",
    },
    {
      image: "/assets/images/event-2.jpg",
      date: "23 NOV 2024",
      name: "name of 2",
    },
    {
      image: "/assets/images/event-3.jpg",
      date: "23 NOV 2024",
      name: "name of 3",
    },
    {
      image: "/assets/images/event-4.jpg",
      date: "23 NOV 2024",
      name: "name of 4",
    },
    {
      image: "/assets/images/event-5.jpg",
      date: "23 NOV 2024",
      name: "name of 5",
    },
    {
      image: "/assets/images/event-6.jpg",
      date: "23 NOV 2024",
      name: "name of 6",
    },
    {
      image: "/assets/images/event-7.jpg",
      date: "23 NOV 2024",
      name: "name of 7",
    },
    {
      image: "/assets/images/event-8.jpg",
      date: "23 NOV 2024",
      name: "name of 8",
    },
    {
      image: "/assets/images/event-9.jpg",
      date: "23 NOV 2024",
      name: "name of 9",
    },
    {
      image: "/assets/images/event-10.jpg",
      date: "23 NOV 2024",
      name: "name of 10",
    }
  ]

  return (
    <div className="w-full mx-auto md:px-12 relative" id="events">
      <div className="w-full pl-4 md:ml-0 flex justify-center items-center mb-4">
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
      {/*  latest event section */}
      <div className="w-full">
        <div className="w-full h-12 relative z-10">
          <Image
            src={"/assets/svgs/latest-event-ribbon.svg"}
            alt="latest events"
            fill={true}
            style={{ objectFit: "cover" }}
            className="w-full"
          />
        </div>

        <EventCarousel events={latestEvents} options={{ loop: true, skipSnaps: true, align: "start" }}/>
      </div>
      {/* past event section */}
      <div className="w-full">
        <div className="w-full h-12 relative z-10">
          <Image
        src={"/assets/svgs/past-event-ribbon.svg"}
        alt="past events"
        fill={true}
        style={{ objectFit: "cover" }}
        className="w-full"
          />
        </div>
        <EventCarousel events={pastEvents} options={{ loop: true, skipSnaps: true, align: "start", autoplay: false }}/>
      </div>
    </div>
  );
};

export default Event;
