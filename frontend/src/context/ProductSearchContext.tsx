import React, { useEffect, useState, createContext } from 'react'
import type { Products } from "@/types/products"
// import type {BodyResponse} from "@/types/bodyResponse"
import ProductsMock from '@/mocks/productsMock'
import type {ProductUseState} from '@/types/ProductUseState'


export const ProductSearchContext = createContext({} as ProductUseState)


export const ProductSearchProvider = ({ children }: {children: React.ReactNode}) => {

    const [productsState, setProductsState] = useState<Products>(ProductsMock as Products)
    // const fetchAllProducts = async (): Promise<BodyResponse> => {
    //     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`)
    //     const data = await response.json()
    //     setProductsState(data.payload.ProductSearched);
    //     return data
    // }

    

    useEffect(() => {
        // fetchAllProducts();
        setProductsState(ProductsMock)
    }, []);

    return (
        <ProductSearchContext.Provider value={{
            productsState,
            setProductsState
        }}>
            {children}
            
        </ProductSearchContext.Provider>
    )
}
