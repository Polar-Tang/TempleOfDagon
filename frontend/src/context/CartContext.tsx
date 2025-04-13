// import useAddProductCart from '@/hooks/useAddProductCart'
import { Products } from '@/types/products'
import { createContext, useEffect, useState } from 'react'
import {ParentProps, ProductsCartContextProps} from "@/types/ContextTypes"

export const CartContext = createContext({} as ProductsCartContextProps)

export const CartProvider = ({ children }: ParentProps) => {

    const [cartProductsState, setCartProductsState] = useState([] as Products )
    
    // const {} = useAddProductCart()
    useEffect(() => {
        const storedCart = sessionStorage.getItem('cart');
        if (storedCart) {
        setCartProductsState(JSON.parse(storedCart));
        }
      }, []);
    
      // Save cart to sessionStorage whenever it changes
      useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cartProductsState));
      }, [cartProductsState]);
    return (
        <CartContext.Provider value={{
            cartProductsState, 
            setCartProductsState
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider