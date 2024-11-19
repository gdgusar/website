import Image from "next/image";
import BentoGrid from "./components/BentoGrid";
import Home from './components/Home';

const Page = () => {
  return(
    <div>
      <Home />
      <BentoGrid />
    </div>
  ) ;
};

export default Page;