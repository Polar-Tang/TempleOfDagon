import React, { useEffect } from 'react'
import '../output.css'
import "../pages/home.css"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

const SectionHero = () => {
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.fromTo(".headline", 
      { strokeDashoffset: 1000 }, 
      { strokeDashoffset: 0, duration: 3, ease: "power2.out" }
    );
  }, []);
  
  
  return (
    <div className="relative bg-[url(/public/darkCastle.webp)] bg-cover bg-norepeat w-full h-100 flex items-center justify-center bg-gradient-to-b from-withe to-black bg-no-repeat">
    <div className="absolute h-100 w-full bg-gradient-to-b from-trasparent to-black z-10"></div>

    <svg width="600" height="200" viewBox="0 0 600 200" className="relative z-20">
        <text x="50%" y="50%" textAnchor="middle" className="headline text-9xl font-burtonNT">
          Welcome to Halloween
        </text>
      </svg>
</div>

  )
}

export default SectionHero