import { CartContext } from '@/context/CartContext'
import { useContext, useEffect } from 'react'

const CartMenu = () => {
    const {cartProductsState} = useContext(CartContext)

    useEffect(() => {
        console.log("GET ITEM CART:", JSON.parse(window.localStorage.getItem('cart') || '[]'))
      
    }, [cartProductsState])
    
  // const cartProducts: Products = JSON.parse(window.localStorage.getItem('cart') || '[]')


  return (
    cartProductsState.map((item) => (
      <div key={item._id} id={item.seller_id} className="flex items-center justify-between p-2 border-b border-gray-200">
        <img src={item.image_url} alt={item.title} className="w-10 h-10 rounded-full" />
        <div className="flex flex-col">
          <p className="text-sm">{item.title}</p>
          <span className="text-sm text-gray-500">{item.price}</span>
        </div>
      </div>
    ))
  )
}

export default CartMenu