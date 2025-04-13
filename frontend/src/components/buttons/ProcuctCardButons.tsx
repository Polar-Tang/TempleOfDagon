import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import useAddProductCart from '@/hooks/useAddProductCart'
import { cn } from '@/lib/utils'

const ProcuctCardButons = ({id}: {id: string}) => {
    const {addToCart, IsAddCartSuccess, isAnimating} = useAddProductCart()

  return (
    <>
    <Button 
        className={`w-full`}
        >
          <Link to={`/tienda/${id}`}>
            <span className="text-sm text-white">Ver detalles</span>
          </Link>
    </Button>
    <Button 
    // onAnimationStart={IsAddCartSuccess} 
    onClick={addToCart}
    className={cn(
      "w-full transition-all duration-300",
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

export default ProcuctCardButons