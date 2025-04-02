import ProductCard from "@/components/cards/ProductCard"
import { SkeletonCard } from "@/components/cards/SkelectonCard"
import useAddProductCart from "@/hooks/useAddProductCart"
// import ProductsPage from "./ProductsPage"
// import ProductsMock from "@/mocks/productsMock"
import SecondNavbarStore from "@/components/SecondNavbarStore"
import { useContext, useEffect } from "react"
import { LayoutContext } from "@/context/LayoutContext"
import useProducts from "@/hooks/useProducts"

const ProductsList = () => {

  const addToCart = useAddProductCart()
  
  const { setisSingleProduct } = useContext(LayoutContext)
  useEffect(() => {
    setisSingleProduct(true)
  }, [])

  const {productsState } =useProducts()
  return (
    <SecondNavbarStore>

      {
        !productsState
          ?
          Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          )
          )
          : productsState.map((product) => (
            <ProductCard product={product} addToCart={addToCart} />
          ))}
    </SecondNavbarStore>
  )
}

export default ProductsList