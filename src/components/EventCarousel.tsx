import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

interface EventDetails {
  image: string;
  date: string;
  name: string;
  type?: string;
}

interface CarouselProps {
  events: EventDetails[];
  options?: any;
}

const EventCarousel: React.FC<CarouselProps> = ({ events, options }) => {
const autoplayOptions = options?.autoplay !== false ? [Autoplay({ delay: 3000, stopOnInteraction: true, playOnInit: true, stopOnMouseEnter: true })] : [];
const [emblaRef, emblaApi] = useEmblaCarousel(options, autoplayOptions);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (

    <div className="w-full my-16 px-4 lg:px-28 lg:my-20 relative select-none">
            <div className="absolute w-[400px] h-[400px] inset-0 lg:inset-20 bg-google-blue blur-3xl opacity-50 brightness-75 -z-20"></div>
            <div className="hidden lg:flex absolute w-[400px] h-[400px] right-20 inset-y-20 bg-google-blue blur-3xl opacity-50 brightness-75 -z-20"></div>
      <div className="overflow-hidden pl-8 lg:pl-16" ref={emblaRef}>
        <div className="flex gap-24 md:gap-10 lg:gap-28 px-4 lg:px-24">
          {events.map((event, index) => (
            <div key={index} className="relative frame flex-shrink-0 w-[90%] md:w-1/2">
                <div className="relative">
                <Image
                  src={"/assets/svgs/event-frame.svg"}
                  alt={index.toString()}
                  width={240}
                  height={240}
                  className="w-full z-10"
                />
                <Image
                  src={event.image}
                  alt={index.toString()}
                  width={320}
                  height={400}
                  loading="lazy"
                  placeholder="empty"
                  className="w-full h-full p-6 md:p-8 lg:p-12 absolute inset-1 object-contain rounded-lg -z-10"
                />
                <div className="w-12 h-12 md:w-24 md:h-24 absolute inset-2 sm:inset-10  md:inset-x-8 md:inset-y-2 lg:inset-6 flex flex-col items-center justify-center rounded-full">
                  <p className="text-black font-semibold font-sans  text-xs md:text-lg lg:text-md select-text" 
                   style={{ textShadow: `1px 1px 3px white` }}>
                  {event.date}
                  </p>
                </div>
                </div>
              <div className="py-4 flex justify-around items-center select-text">
                <h3 className="text-xl font-sora font-bold text-white">{event.name}</h3>
                <p className={`text-lg font-sora text-white ${!event.type && "hidden"}`}>
                 {event.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCarousel;
