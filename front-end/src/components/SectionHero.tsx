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

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 100">
  <path id="straightPath" d="M50,50 L450,50" fill="none" stroke="transparent"/>
  
  <text font-family="cursive" font-size="24" fill="black" stroke="black" stroke-width="1">
    <textPath href="#straightPath">
      <tspan stroke-width="2" stroke-dasharray="50" stroke-dashoffset="50">
        <animate attributeName="stroke-dashoffset" from="50" to="0" begin="0s" dur="1.5s" fill="freeze"/>
        <animate attributeName="opacity" from="0" to="1" begin="0s" dur="1.5s" fill="freeze"/>
        Handwritten Text
      </tspan>
    </textPath>
  </text>
</svg>


</div>

  )
}

export default SectionHero