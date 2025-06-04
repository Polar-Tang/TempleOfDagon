import React, { useState, createContext } from 'react'
import type { Products } from "@/types/products"
// import type {BodyResponse} from "@/types/bodyResponse"
import ProductsMock from '@/mocks/productsMock'
import { ProductsSearchContextProps } from '@/types/ContextTypes'


export const ProductSearchContext = createContext({} as ProductsSearchContextProps)


export const ProductSearchProvider = ({ children }: { children: React.ReactNode }) => {

    const [productsState, setProductsState] = useState<Products>(ProductsMock as Products)
    // const fetchAllProducts = async (): Promise<BodyResponse> => {
    //     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`)
    //     const data = await response.json()
    //     setProductsState(data.payload.ProductSearched);
    //     return data
    // }
    const [isSingleProduct, setisSingleProduct] = useState<boolean>(false)
    const [isFilter, setIsFilter] = useState<boolean>(false)
    const [memoProductState, setMemoProductState] = useState([] as Products)



    return (
        <ProductSearchContext.Provider value={{
            productsState,
            setProductsState,
            isSingleProduct,
            setisSingleProduct,
            isFilter,
            setIsFilter,
            memoProductState,
            setMemoProductState

        }}>
            {children}

        </ProductSearchContext.Provider>
    )
}
