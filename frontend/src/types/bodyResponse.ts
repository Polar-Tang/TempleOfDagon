import { Product, Products } from './products'

export interface BodyResponse {
    ok: boolean
    status: number
    message: string
    payload: {
        ProductSearched: Products
        detail?: string
    }
}

export interface ResponseCartObject {
    _id: string
    cartId: string
    detailProducts: Product[]
}