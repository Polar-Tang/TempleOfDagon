
import Navbar from '@/components/Navbar'
import SectionHero from '@/components/SectionHero';
import "./home.css"
import "../output.css"
import Banner from '@/components/Banner';
import { images } from '../utils/data';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <>
    <div className='place-items-center h-dvh bg-black grid 
  grid-cols-1 
  grid-rows-[5fr_4fr]
  flex'>
      <Navbar />
      <SectionHero />
      <Banner images={images}/>
    </div>
    <Footer/>
    </>
  )
}

export default Home