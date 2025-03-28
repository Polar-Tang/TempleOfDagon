import SectionHero from '@/components/SectionHero';
import "./home.css"
import "../output.css"
import Banner from '@/components/Banner';
import { images } from '../utils/data';
import ProductPortalProvider from '@/context/ProductPortalContext';

const Home = () => {

  return (
    <>
    <div className='place-items-center h-dvh bg-black grid 
  grid-cols-1 
  grid-rows-[5fr_4fr]
  flex
  relative
  w-screen
  '>
      {/* <Navbar />  */}
      <SectionHero />
      <ProductPortalProvider >
        <Banner images={images}/>
      </ProductPortalProvider>
    </div>
    {/* <Footer/> */}
    </>
  )
}

export default Home