// import useAddProductCart from '@/hooks/useAddProductCart'
import { Products } from '@/types/products'
import React, { createContext, useState } from 'react'

interface ProductsCartContextProps {
    cartProductsState: Products
    setCartProductsState: React.Dispatch<React.SetStateAction<Products>>,
}

export const CartContext = createContext({} as ProductsCartContextProps)

export interface CartProps {
    children: React.ReactNode
}

export const CartProvider = ({ children }: CartProps) => {

    const [cartProductsState, setCartProductsState] = useState([] as Products )

    // const {} = useAddProductCart()

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