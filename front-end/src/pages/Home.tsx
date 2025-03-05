
import Navbar from '@/components/Navbar'
import SectionHero from '@/components/SectionHero';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import "./home.css"
import "../output.css"
import "../components/banner.css"
import About from '@/components/About';
import Banner from '@/components/Banner';
import { images } from '/public/data';

const Home = () => {
  return (
    <div className='place-items-center'>
      <Navbar />
      <SectionHero />
      <Banner images={images}/>
      <About/>
        <div className='w-full h-90 items-center justify-center block bg-black'>
          <h2 className='text-white text-4xl font-burtonNT text-center'>Tattoos</h2>
      </div>
    </div>
  )
}

export default Home