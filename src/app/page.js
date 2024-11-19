import Image from "next/image";
import BentoGrid from "./components/BentoGrid";
import Home from './components/Home';

const Page = () => {
  return(
    <div>
      <Home />
      {/* <h1>START FROM HERE</h1> */}
      <BentoGrid />
    </div>
  ) ;
};

export default Page;