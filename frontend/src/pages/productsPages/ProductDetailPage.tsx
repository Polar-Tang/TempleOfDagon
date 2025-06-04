import { ImageZoom } from '@/components/Image-zoom'
import { useParams } from 'react-router-dom'
// import ProductsMock from '@/mocks/productsMock'
import {  useCallback, useEffect, useState } from 'react'
import CommentSection from './CommentSection'
import { Product } from '@/types/products'
import SecondNabvarProductStore from '@/components/SecondNabvarProductStore'
import { comment } from '@/types/CommentsType'
import FourOFourPage from '../404Page'

export default function ProductDetailPage() {

  const { id } = useParams()
  const [product, setProduct] = useState({} as Product)
  const [numberLikesState, setnumberLikesState] = useState(0)
  const [commentState, setcommentState] = useState([] as comment[])
  useEffect(() => {
    getProducts()
  }, [commentState])
  const getProducts = useCallback(async () => {
    const productFetched = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
      method: "GET"
    })
    const productData = await productFetched.json()
    setProduct(productData.payload.ProductsSearched)
    console.log("NUm state ",productData.payload.likes, numberLikesState)
    setnumberLikesState(productData.payload.likes)
  }, [product])
  
  console.log(product)
  // const product = ProductsMock.find((product) => product._id === id)
  if (Object.keys(product).length === 0) {
    return <FourOFourPage title='Product not found' redir='/store' description='The product you are looking for does not exist' />
  }


  return (
    <>
    
    <SecondNabvarProductStore>

      <ImageZoom
        product={product}
        likesNum={numberLikesState}
        src={product.image_url}
        alt={product.title}
        setnumberLikesState={setnumberLikesState}
        // width={400}
        // height={400}
        className="object-cover"
      />
    </SecondNabvarProductStore>
      <CommentSection
        commentState={commentState}
        setcommentState={setcommentState}
        desc={product.description}
        comments={Array.isArray(product.comments) && product.comments.length > 0 && typeof product.comments[0] !== 'string'
          ? (product.comments as comment[])
          : undefined}
        product_id={product._id}
      />
    </>
    


  )
}

