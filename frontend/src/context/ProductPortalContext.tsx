import ProductCardPortal from '@/components/cards/ProductCardPortal'
import React, { createContext, useState } from 'react'

interface ProductCardPortalProps {
    isProductPortalOpen: boolean
    selectedImage: selectedImage
    setIsProductPortalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedImage: React.Dispatch<React.SetStateAction<selectedImage>>,

  }
type selectedImage = {
    src: string
    name: string
}

export const ProductPortalContext = createContext({} as ProductCardPortalProps)

export const ProductPortalProvider = ({ children }: {children: React.ReactNode}) => {

    const [isProductPortalOpen, setIsProductPortalOpen] = useState<boolean>(false)
	const [selectedImage, setSelectedImage] = useState<selectedImage>({ src: '', name: '' })



    return (
        <ProductPortalContext.Provider value={{
            setIsProductPortalOpen,
            isProductPortalOpen,
            selectedImage,
            setSelectedImage,
        }}>
            <ProductCardPortal/>
            {children}
            
        </ProductPortalContext.Provider>
    )
}

export default ProductPortalProvider