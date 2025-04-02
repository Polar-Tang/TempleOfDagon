import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Repeat } from "lucide-react"
import type { Product } from "@/types/products"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "@/context/CartContext"
import { Link } from "react-router-dom"

export default function ProductCard({ product, addToCart }: {
  product: Product,
  addToCart: (e: React.MouseEvent) => void,
}) {
  const { _id,
    seller_id,
    title,
    price,
    image_url } = product

    const { cartProductsState} = useContext(CartContext)

    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    useEffect(() => {
        setIsSuccess(true)
    
        // Reset back to original color after 2 seconds
        setTimeout(() => {
          setIsSuccess(false)
        }, 2000)
      }
      , [cartProductsState])

  return (
    <Card key={_id} id={seller_id} className="justify-items-center w-full overflow-hidden border-none shadow-none bg-trasparent">
      <CardContent className="p-4 flex flex-col items-center">
        <div className="mb-2 h-48 w-full relative flex items-center justify-center">
          <img
            src={image_url}
            alt="Nature's Miracle Urine Destroyer"
            className="object-fit h-full rounded-lg max-w-[120px]"
          />
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-lg text-white font-medium">
            {title}
            <br />
          </h3>

          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-lg font-bold text-white">{price}$</span>
            {/* <span className="text-sm text-white line-through">$12.99</span> */}
          </div>

          <div className="flex items-center justify-center text-sm text-gray-700 mt-1">
            <span className="font-semibold text-white">{price}</span>
            <div className="flex items-center ml-1">
              <Repeat className="h-3 w-3 text-green-700 mr-1" />
              <span className="text-xs">repeat delivery</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
        className={`w-full transition-colors duration-300 ease-in-out ${
          isSuccess ? "bg-green-500 hover:bg-green-600 text-white" : "bg-navy-blue hover:bg-navy-blue/90 text-white"
        }`}
        onClick={addToCart}>Añadir al carrito</Button>
        <Button 
        className={`w-full transition-colors duration-300 ease-in-out`}
        >
          <Link to={`/tienda/${_id}`}>
            <span className="text-sm text-white">Ver detalles</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
