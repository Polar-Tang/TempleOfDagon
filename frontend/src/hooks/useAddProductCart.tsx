import React, { useCallback, useContext, useState } from 'react'
import type { ResponseCartObject } from "@/types/bodyResponse"
import { CartContext } from '@/context/CartContext'
import { Product } from '@/types/products'

const useAddProductCart = () => {

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
      headers: {
        credentials: "include",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "seller_id": grandparent?.id })
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
    setCartProductsState((prevProducts) => [...prevProducts, cartProductsArray[0]])
    window.sessionStorage.setItem('cart', JSON.stringify(cartProductsArray[0]))
  }, [])

  return {
    addToCart,
    IsAddCartSuccess,
    isAnimating
  }
}
export default useAddProductCart