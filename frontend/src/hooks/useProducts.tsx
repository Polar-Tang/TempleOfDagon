import React, { useEffect, useState } from 'react'
import type { Products } from "@/types/products"
// import type {BodyResponse} from "@/types/bodyResponse"
import ProductsMock from '@/mocks/productsMock'

interface ProductCardPortalProps {
    productsState: Products
    setProductsState: React.Dispatch<React.SetStateAction<Products>>,
}

const useProducts = (): ProductCardPortalProps => {

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

    return {
            productsState,
            setProductsState,
        }
}

export default useProducts