import React, { createContext, useState } from 'react'
import {ProductCardPortalProps, selectedImage } from "@/types/ContextTypes"

export const ProductPortalContext = createContext({} as ProductCardPortalProps)

export const ProductPortalProvider = ({ children }: {children: React.ReactNode}) => {

    const [isProductPortalOpen, setIsProductPortalOpen] = useState<boolean>(false)
	const [selectedImage, setSelectedImage] = useState({} as selectedImage)


    return (
        <ProductPortalContext.Provider value={{
            setIsProductPortalOpen,
            isProductPortalOpen,
            selectedImage,
            setSelectedImage,
        }}>
            {children}
            
        </ProductPortalContext.Provider>
    )
}

export default ProductPortalProvider