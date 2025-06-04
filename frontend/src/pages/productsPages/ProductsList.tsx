import ProductCard from "@/components/cards/ProductCard"
import { SkeletonCard } from "@/components/cards/SkelectonCard"
// import ProductsPage from "./ProductsPage"
// import ProductsMock from "@/mocks/productsMock"
import SecondNavbarStore from "@/components/SecondNavbarStore"
import { useContext, useEffect } from "react"
import { ProductSearchContext } from "@/context/ProductSearchContext"
import { AuthContext } from "@/context/AuthContext"
// import { Products } from "@/types/products"
// import ProductsMock from "@/mocks/productsMock"
// const [productsState, setProductsState] = useState<Products>(ProductsMock)


const ProductsList = () => {

  const { setisSingleProduct } = useContext(ProductSearchContext)

  useEffect(() => {
    setisSingleProduct(true)
  }, [])

  const { productsState } = useContext(ProductSearchContext)
  
  const { preferences } = useContext(AuthContext)
  console.log("Preferences; ", preferences)
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
            <ProductCard product={product} liked_ids={Array.isArray(preferences?.productId) ? preferences.productId : []} />
          ))}
    </SecondNavbarStore>
  )
}

export default ProductsList