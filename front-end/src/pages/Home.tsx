
import Navbar from '@/components/Navbar'
import SectionHero from '@/components/SectionHero';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import "./home.css"
import "../output.css"
import About from '@/components/About';

const Home = () => {
  return (
    <div className='place-items-center'>
      <Navbar />
      <SectionHero />
      <About/>
        <div className='w-full h-90 items-center justify-center block bg-black'>
          <h2 className='text-white text-4xl font-burtonNT text-center'>Tattoos</h2>
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src="/bald-ink.png" srcSet="/bald-ink.png" alt="Image one" />}
            itemTwo={<ReactCompareSliderImage src="/bald-not-ink.png" srcSet="/bald-not-ink.png" alt="Image two" />}
          />
      </div>
    </div>
  )
}

export default Home