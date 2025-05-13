import React, { useCallback, useContext, useState } from 'react'
import type { ResponseCartObject } from "@/types/bodyResponse"
import { CartContext } from '@/context/CartContext'
import { Product } from '@/types/products'

const useAddProductCart = () => {

  // const { setbasketIdState } = useContext(CartContext)
  const { setCartProductsState } = useContext(CartContext)
  const [IsAddCartSuccess, setIsAddCartSuccess] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Add product to cart
  const addToCart = useCallback(async (e: React.MouseEvent) => {
    const product = e.target as HTMLButtonElement
    const grandparent = product.parentElement?.parentElement
    setIsAnimating(true);

    const resposHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "_id": grandparent?.id })
    })

    // GET BODY
    const data = await resposHTTP.json();
    const CartObjetc = data.response.payload.ProductSearched as ResponseCartObject
    const cartProductsArray = CartObjetc.detailProducts as Product[]
    // button animation
    setIsAddCartSuccess(true)
    setTimeout(() => {
      setIsAddCartSuccess(false)
      setIsAnimating(false)
    }, 2000)
    // update state and session storage
    sessionStorage.setItem('cart', JSON.stringify(cartProductsArray))
    setCartProductsState(cartProductsArray)
  }, [])

  return {
    addToCart,
    IsAddCartSuccess,
    isAnimating
  }
}
export default useAddProductCart