// import useAddProductCart from '@/hooks/useAddProductCart'
import { Products } from '@/types/products'
import { createContext, useState } from 'react'
import {ParentProps, ProductsCartContextProps} from "@/types/ContextTypes"

export const CartContext = createContext({} as ProductsCartContextProps)

export const CartProvider = ({ children }: ParentProps) => {

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