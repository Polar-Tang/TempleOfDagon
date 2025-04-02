
import ProductCard from "@/components/cards/ProductCard"
import SecondNavbarStore from "@/components/SecondNavbarStore"
import { SkeletonCard } from "@/components/cards/SkelectonCard"
import { useContext } from "react"
import ProductsProvider, { ProductsContext } from '@/context/ProductsContext'
import useAddProductCart from "@/hooks/useAddProductCart"


const ProductsList = () => {
  const {productsState} = useContext(ProductsContext)

  const addToCart = useAddProductCart()

  return (
    <>
      {
        !productsState
          ?
        Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index} />
          )
          )
          : productsState.map((product) => (
            <ProductCard product={product} addToCart={addToCart}/>
        ))}
    </>
  )
}

export default function ProductsPage() {


  return (
    <ProductsProvider >
      <SecondNavbarStore>
        <ProductsList />
      </SecondNavbarStore>
    </ProductsProvider>

  )
}

