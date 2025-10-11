import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  link: string;
  color?: string;
}

const colorClasses: Record<string, string> = {
  "blue-300": "border-blue-300 bg-blue-300",
  "red-300": "border-[#F2867E] bg-red-300",
  "green-300": "border-[#4BBB83] bg-green-300",
  "yellow-300": "border-[#F4D375] bg-yellow-300",
};

export const TeamCard = ({
  name,
  role,
  image,
  link,
  color = "blue-300",
}: TeamCardProps) => {
  const classes = colorClasses[color];

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center gap-4 w-[10rem]"
    >
      <div
        className={`relative w-[104px] h-[104px] rounded-full border-4 overflow-hidden ${
          classes.split(" ")[0]
        }`}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-full transition-transform duration-300"
        />
        <div
          className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity ${
            classes.split(" ")[1]
          }`}
        />
      </div>
      <div className="flex flex-col gap-y-1 items-center text-center">
        <p className="font-medium text-lg">{name}</p>
        <p className="text-gray-500 text-lg">{role}</p>
      </div>
    </a>
  );
};
