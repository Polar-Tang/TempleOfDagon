import { ImageZoom } from '@/components/Image-zoom'
import { useParams } from 'react-router-dom'
import ProductsMock from '@/mocks/productsMock'
import SecondNavbarStore from '@/components/SecondNavbarStore'
import { useContext, useEffect } from 'react'
import { LayoutContext } from '@/context/LayoutContext'

export default function ProductDetailPage() {

  const {setisSingleProduct} = useContext(LayoutContext)
  useEffect(() => {
    setisSingleProduct(false)
  }, [])
  const { id } = useParams()
  const product = ProductsMock.find((product) => product._id === id)
  if (!product) {
    return <div className="text-red-500">Product not found</div>
  }

  

  return (
    <SecondNavbarStore>

      <ImageZoom
        product={product}
        src={product.image_url}
        alt={product.title}
        // width={400}
        // height={400}
        className="object-cover"
      />
    </SecondNavbarStore>


  )
}

