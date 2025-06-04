import { Preferencess } from "./AuthProps"
import { categories, Products } from "./products"
import React from "react"

export interface LayoutContextProps {
    string: string
    setstring: React.Dispatch<React.SetStateAction<string>>,
}

export interface ProductCardPortalProps {
    isProductPortalOpen: boolean
    selectedImage: selectedImage
    setIsProductPortalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedImage: React.Dispatch<React.SetStateAction<selectedImage>>,

}


export type selectedImage = {
    _id?: string,
    title?: string,
    image_url?: string,
    price?: number,
    category?: categories,
    description?: string,
}

export interface ProductsCartContextProps {
    cartProductsState: Products
    setCartProductsState: React.Dispatch<React.SetStateAction<Products>>,
    basketIdState: string,
    setbasketIdState: React.Dispatch<React.SetStateAction<string>>,

}

export interface ParentProps {
    children: React.ReactNode
}

export type accessToken = {
    user_id: string,
    name: string,
    email: string,
    role: string
}

export interface AuthContextProps {
    isUserLogged: boolean,
    setisUserLogged: React.Dispatch<React.SetStateAction<boolean>>,
    jwe: accessToken,
    setjwe: React.Dispatch<React.SetStateAction<accessToken>>,
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>
    preferences: Preferencess
    setpreferences: React.Dispatch<React.SetStateAction<Preferencess>>
}

export interface ProductsSearchContextProps {
    productsState: Products
    setProductsState: React.Dispatch<React.SetStateAction<Products>>,
    isSingleProduct: boolean,
    setisSingleProduct: React.Dispatch<React.SetStateAction<boolean>>,
    isFilter: boolean,
    setIsFilter: React.Dispatch<React.SetStateAction<boolean>>,
    memoProductState: Products,
    setMemoProductState: React.Dispatch<React.SetStateAction<Products>>
    numberLikesState: number,
    setnumberLikesState: React.Dispatch<React.SetStateAction<number>>
}