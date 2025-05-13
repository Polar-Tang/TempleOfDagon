import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import useAddProductCart from '@/hooks/useAddProductCart'
import { cn } from '@/lib/utils'
import { Trash2 } from "lucide-react"
import { deleteProductCart } from '@/hooks/deleteProductCart'

export const ProcuctAddCardButton = ({ classes}: {classes: string}) => {
    const {addToCart, IsAddCartSuccess, isAnimating} = useAddProductCart()

  return (
    <>
   
    <Button 
    // onAnimationStart={IsAddCartSuccess} 
    onClick={addToCart}
    className={cn(
      `${classes}`,
      isAnimating && "animate-pulse", // Tailwind's built-in pulse
      IsAddCartSuccess && "bg-green-500 scale-110" // Success state
    )}
    disabled={isAnimating}
    >
      {IsAddCartSuccess ? "✓ Added!" : "Add to Cart"}
    </Button>
    
    </>
  )
}



export const ProductCardDetail = ({id, classes}: {id: string, classes: string}) => {
  return (
    <Button 
    className={`w-full ${classes}`}
    >
      <Link to={`/store/${id}`}>
        <span className="text-sm text-white">Ver detalles</span>
      </Link>
</Button>
  )
}

export const ProductCardDelete = ({className, id, position}: {className: string, id: string, position: number}) => {

  

  return (
    <Button className={className} onClick={() => deleteProductCart(id, position)}>
        <Trash2 />

      </Button>
  )
}
