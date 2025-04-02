import { Products } from "./products"
import React from "react"

export interface LayoutContextProps {
    isSingleProduct: boolean
    setisSingleProduct: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface ProductCardPortalProps {
    isProductPortalOpen: boolean
    selectedImage: selectedImage
    setIsProductPortalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedImage: React.Dispatch<React.SetStateAction<selectedImage>>,

  }
export type selectedImage = {
    src: string
    name: string
}

export interface ProductsCartContextProps {
    cartProductsState: Products
    setCartProductsState: React.Dispatch<React.SetStateAction<Products>>,
}

export interface ParentProps {
    children: React.ReactNode
}