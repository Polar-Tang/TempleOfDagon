import React, { createContext, useEffect, useState } from 'react'
import type { Products } from "@/types/products"
import type BodyResponse from "@/types/bodyResponse"

interface ProductCardPortalProps {
    productsState: Products
    setProductsState: React.Dispatch<React.SetStateAction<Products>>,
}

export const ProductsContext = createContext({} as ProductCardPortalProps)


export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {

    const [productsState, setProductsState] = useState<Products>([] as Products)
    const fetchAllProducts = async (): Promise<BodyResponse> => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`)
        const data = await response.json()
        return data
    }

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: BodyResponse = await fetchAllProducts();
                setProductsState(data.payload.ProductSearched);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <ProductsContext.Provider value={{
            productsState,
            setProductsState,
        }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsProvider