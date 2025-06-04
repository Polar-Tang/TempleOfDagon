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
type response = {
    ok: boolean
    status: number
    message: string
    payload: any
}
export interface BodyResponseAny {
    ok: boolean
    status: number
    message: string
    payload: any
}
export interface NestedResponse {
    response: response
}
export interface ResponseCartObject {
    _id: string
    cartId: string
    detailProducts: Product[]
}