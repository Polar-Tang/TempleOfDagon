import SectionHero from '@/components/SectionHero';
import "./home.css"
import "../output.css"
import Banner from '@/components/Banner';
import ProductsMock from '@/mocks/productsMock';
import ProductPortalProvider from '@/context/ProductPortalContext';

const Home = () => {

  const images = ProductsMock.map((image) => {
    return {
      src: image.image_url,
      name: image.title
    }
  }
  )
  // const {ProductsMock.image_url, productsMock.title} = images

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