import { comment } from "./CommentsType"

export type categories = "Magic" | "stone" | "meat" | "art" | "metal" | "others"


export interface ImagesProducts {
    images: Array<Product>;
  }
export type Products = {
    _id: string,
    title: string,
    image_url: string,
    price: number,
    category?: categories,
    seller_name?: string,
    description?: string,
    seller_id?: string,
    comments?: comment[] | string[]
    stock?: number,
    __v?: number
    createdAt?: string,
    active?: Boolean,
    updatedAt?: string,
    file?: Blob
}[]

export type Product = {
    _id: string,
    title: string,
    image_url: string,
    price: number,
    category?: categories,
    seller_name?: string,
    description?: string,
    seller_id?: string,
    comments?: comment[] | string[]
    stock?: number,
    __v?: number
    createdAt?: string,
    active?: Boolean,
    updatedAt?: string,
    file?: Blob
}

export interface BannerPorps {
    images: {
        src: string
        name: string
        _id: string
    }[]
}