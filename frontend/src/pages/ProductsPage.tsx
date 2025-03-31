
import ProductCard from "@/components/cards/ProductCard"
import SecondNavbarStore from "@/components/SecondNavbarStore"
import { SkeletonCard } from "@/components/cards/SkelectonCard"
import { useContext } from "react"
import ProductsProvider, { ProductsContext } from '@/context/ProductsContext'



const ProductsList = () => {
  const {productsState} = useContext(ProductsContext)

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
            <ProductCard product={product} />
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

