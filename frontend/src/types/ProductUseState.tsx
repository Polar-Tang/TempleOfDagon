import { Products } from "./products";

export interface ProductUseState {
    productsState: Products
    setProductsState: React.Dispatch<React.SetStateAction<Products>>,
}