import ProductCard from "@/components/cards/ProductCard"
import { SkeletonCard } from "@/components/cards/SkelectonCard"
import useAddProductCart from "@/hooks/useAddProductCart"
// import ProductsPage from "./ProductsPage"
import ProductsMock from "@/mocks/productsMock"
import SecondNavbarStore from "@/components/SecondNavbarStore"
import { useContext, useEffect } from "react"
import { LayoutContext } from "@/context/LayoutContext"

const ProductsList = () => {
    
    const addToCart = useAddProductCart()
    const {setisSingleProduct} = useContext(LayoutContext)
    useEffect(() => {
      setisSingleProduct(true)
    }, [])
    return (
      <>
        <SecondNavbarStore>
        
        {
          !ProductsMock
            ?
          Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
            )
            )
            : ProductsMock.map((product) => (
              <ProductCard product={product} addToCart={addToCart}/>
          ))}
          </SecondNavbarStore>
          
      </>
    )
  }

export default ProductsList