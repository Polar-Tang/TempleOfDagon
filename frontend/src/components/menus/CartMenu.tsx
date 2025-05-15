import { CartContext } from '@/context/CartContext'
import { useContext, useEffect } from 'react'
import { ProductCardDelete } from '../buttons/ProcuctCardButons'
import ImgComponent from '../ImageComponent'

const CartMenu = () => {
  const { cartProductsState, setCartProductsState } = useContext(CartContext)
  useEffect(() => {
    const cartProductStoredString = sessionStorage.getItem("cart")
    if (cartProductStoredString) {
      const cardProdutcsStored = JSON.parse(cartProductStoredString)
      setCartProductsState(cardProdutcsStored)
    }
  }, [])

 

  // const cartProducts: Products = JSON.parse(window.localStorage.getItem('cart') || '[]')
  console.log("The product is:", cartProductsState)
  return (
    cartProductsState &&
    cartProductsState.map((item, index) => (
      <div key={index}  className="flex justify-between m-auto pb-2 border-b border-gray-200">
      <ImgComponent src={item.image_url} alt={item.title} className="w-18 h-12 rounded-full " />
      <div className="flex flex-col">
        <h3 className="text-xl">{item.title}</h3>
        <span className="text-xl text-gray-500">${item.price}</span>
      </div>
      <div className="flex align-middle items-center justify-center"> 
      {/* <Button className='md:ml-4 hover:bg-red-400' onClick={() => deleteProductCart(item._id, index)}>
        <Trash2 />

      </Button> */}
      <ProductCardDelete className='md:ml-4 hover:bg-red-400' id={item._id} position={index}/>
      </div>
    </div>
    ))
  )
}

export default CartMenu