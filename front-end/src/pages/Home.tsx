
import Navbar from '@/components/Navbar'
import SectionHero from '@/components/SectionHero';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import "./home.css"
import "../output.css"
import "../components/banner.css"
import Banner from '@/components/Banner';
import { images } from '/public/data';

const Home = () => {
  return (
    <>
    <div className='place-items-center h-dvh bg-black grid 
  grid-cols-1 
  grid-rows-[3fr_2fr]'>
      <Navbar />
      <SectionHero />
      <Banner images={images}/>
    </div>
    
    </>
  )
}

export default Home