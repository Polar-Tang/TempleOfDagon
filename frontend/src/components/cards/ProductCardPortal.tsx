import { Button } from "@/components/ui/button"
import { ProductPortalContext } from "@/context/ProductPortalContext";
import { useContext, useEffect } from "react";
import ReactDOM from 'react-dom';
import { AiOutlineClose } from "react-icons/ai";


const ProductCardPortal = () => {
  const {
    isProductPortalOpen,
    setIsProductPortalOpen,
    selectedImage,
  } = useContext(ProductPortalContext)
  
  useEffect(() => {
    setIsProductPortalOpen(true)
  }, [])
  if (!isProductPortalOpen) return null

  return ReactDOM.createPortal(
    <div className={`fixed portal-product w-full h-dvh top-0 left-0 z-100 flex items-center`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}>
      <div className="w-full max-w-md mx-auto bg-white">
        {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950"></div>  */}
        <div className="flex justify-end p-2">
          <Button onClick={() => setIsProductPortalOpen(false)}>
            <AiOutlineClose />
          </Button>
        </div>
        <img
          src={selectedImage.src}
          alt="Product Image"
          width={600}
          height={400}
          className="w-full h-64 object-cover"
          style={{ aspectRatio: "600/400", objectFit: "cover" }}
        />
        <div className="p-4 space-y-2">
          <h3 className="text-xl font-semibold">{selectedImage.name}</h3>
          <p className="text-gray-500 dark:text-gray-400">This is a description of the product.</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">$49.99</span>
            <Button>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ProductCardPortal