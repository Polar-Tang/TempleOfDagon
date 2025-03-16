// import '../output.css'
// import "../pages/home.css"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { Input } from "@/components/ui/input"
import { FaMagnifyingGlass } from "react-icons/fa6";

const SectionHero = () => {
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.fromTo(".headline", 
      { strokeDashoffset: 1000 }, 
      { strokeDashoffset: 0, duration: 3, ease: "power2.out" }
    );
  }, []);
  
  
  return (
    <div className="relative bg-[url(/public/darkCastle.webp)] bg-cover bg-no-repeat w-full h-full flex flex-col items-center justify-center">
    <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-black z-0"></div>
  
    <h1 className="flex flex-1 items-center text-white text-lg font-burtonNT z-10">
      Welcome to Halloween
    </h1>
  
    <div className="w-70 flex items-center z-10">
      <Input type="text" placeholder="Cositas maravillosas" 
        className="w-50 text-white rounded-md border-purple-500 focus:border-purple-500/50 focus:outline-none z-20" 
      />
      <FaMagnifyingGlass className="w-20 text-white z-20" />
    </div>
  </div>
  

  )
}

export default SectionHero