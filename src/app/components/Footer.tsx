import Image from "next/image";
import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { SOCIALS } from "../../utils/constants";
import Link from "next/link";

const Footer: React.FC = () => {
  const getIcon = (name:string, color:string) => {
    switch (name.toLowerCase()) {
      case "instagram":
        return <FaInstagram className="mr-2" style={{ color }} />;
      case "linkedin":
        return <FaLinkedin className="mr-2" style={{ color }} />;
      case "x (twitter)":
        return <FaTwitter className="mr-2" style={{ color }} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-w-full px-0 sm:px-12 md:px-8 xl:px-48 pt-8 pb-1 mt-4 bg-google-black text-white capitalize border-t border-white/10">
      <div className="w-full h-full bg-black absolute inset-0 opacity-30 backdrop-blur-3xl"></div>
      <div className="w-full relative gap-8 py-2 flex flex-col sm:flex-row justify-center items-start ">
        <div className="w-full md:w-auto flex items-center justify-center md:justify-start px-10">
          <Link href="https://gdg.community.dev/gdg-on-campus-university-school-of-automation-robotics-delhi-india/" passHref>
          <div className="relative">
            <Image
              src="/assets/GDG-logo.svg"
              alt="logo"
              width={200}
              height={50}
              style={{ width: "100%", height: "auto" }}
              loading="lazy"
              
            />
            <span className="text-google-lightGrey font-sora text-lg absolute -right-4 -top-2">
              &copy;
            </span>
          </div>
          </Link>
        </div>
        <div className="max-w-[600px] w-full md:w-auto  flex justify-around items-center md:justify-center md:gap-12">
          <div>
            <h1 className="text-xl font-light font-sora mb-4 uppercase">
              Socials
            </h1>
            {SOCIALS && SOCIALS.length > 0 && SOCIALS.map(({ name, link, color }) => (
              <Link key={name} href={link} passHref>
                <div className="flex items-center font-noto-sans mb-1">
                  {getIcon(name, color)}
                  <span>{name}</span>
                </div>
              </Link>
            ))}
          </div>
          <div>
            <h1 className="text-xl font-light uppercase mb-4 font-sora">
              Navigate
            </h1>
            <div className="flex flex-col justify-center font-noto-sans">
              <Link href="#aboutUs" className="mb-1" passHref><span>about us</span></Link>
              <Link href="#events" className="mb-1" passHref><span>events</span></Link>
              <Link href="#ourTeam" className="mb-1" passHref><span>Our team</span></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-2 items-center justify-center my-4">
        <HiOutlineShieldCheck />
        <span>MADE BY GDG-USAR TEAM WEBDEV</span>
      </div>
    </div>
  );
};

export default Footer;
