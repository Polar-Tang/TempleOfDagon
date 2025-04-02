import React, { useCallback, useContext } from 'react'
import type { ResponseCartObject } from "@/types/bodyResponse"
import { CartContext } from '@/context/CartContext'
import { Product } from '@/types/products'

const useAddProductCart = () => {

  const {setCartProductsState, cartProductsState} = useContext(CartContext)

  const addToCart = useCallback(async (e: React.MouseEvent) => {
    // e.preventDefault()
    const product = e.target as HTMLButtonElement
    const grandparent = product.parentElement?.parentElement
    console.log("Add to cart is running ", grandparent)
    const resposHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
      method: 'POST',
      headers: {
        credentials: "include",
        'Content-Type': 'application/json',
        // credentials: 'include',
      },
      // headers: getAuthHeaders(),
      body: JSON.stringify({ "seller_id": grandparent?.id })
    })
    const data = await resposHTTP.json();
    const CartObjetc = data.response.payload.ProductSearched as ResponseCartObject
    const cartProductsArray = CartObjetc.detailProducts as Product[]
    setCartProductsState((prevState) => {
      console.log("prevState: ", prevState)
      const newState = [...prevState, cartProductsArray[0]]
      
      return newState

    })
    window.localStorage.setItem('cart', JSON.stringify(cartProductsState))
  }, [])

  return addToCart
}
export default useAddProductCart