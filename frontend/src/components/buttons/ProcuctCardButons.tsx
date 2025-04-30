import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import useAddProductCart from '@/hooks/useAddProductCart'
import { cn } from '@/lib/utils'

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
      <Link to={`/tienda/${id}`}>
        <span className="text-sm text-white">Ver detalles</span>
      </Link>
</Button>
  )
}
