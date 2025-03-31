export type categories = "magic" | "candy" | "snacks" | "drinks" | "toys" | "accessories" | "clothes" | "home" | "pets" | "others"


export type Products = {
    _id: string,
    title: string,
    image_url: string,
    price: number,
    category?: categories,
    description?: string,
    seller_id?: string,
    stock?: number,
    createdAt?: string,
    updatedAt?: string
}[]

export type Product = {
    _id: string,
    title: string,
    image_url: string,
    price: number,
    category?: categories,
    description?: string,
    seller_id?: string,
    stock?: number,
    createdAt?: string,
    updatedAt?: string
}

export interface BannerPorps {
    images: {
        src: string
        name: string
    }[]
}