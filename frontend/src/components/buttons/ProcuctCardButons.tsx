import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import useAddProductCart from '@/hooks/useAddProductCart'
import { cn } from '@/lib/utils'
import { Trash2 } from "lucide-react"
import { toast } from 'sonner'
import { useCallback, useContext } from 'react'
import { CartContext } from '@/context/CartContext'

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
  const { setCartProductsState } = useContext(CartContext)

  
  const deleteProductCart = useCallback(async (id: string, position: number) => {
  
      try {
        const resposHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${id}`, {
          method: 'DELETE',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        })
    
        // GET BODY
        await resposHTTP.json();
        const cartStorageString = sessionStorage.getItem('cart')
        if (cartStorageString) {
          const cartStorage = JSON.parse(cartStorageString)
          cartStorage.splice(position,1)
          sessionStorage.setItem("cart", cartStorage)
    
          setCartProductsState(cartStorage)
          toast("Item removed", {
            description: "The item has been removed from your cart",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        } 
      } catch(err) {
        toast("Item removed", {
          description: "The item has been removed",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
  
      }
  
    }, [])
  return (
    <Button className={className} onClick={() => deleteProductCart(id, position)}>
        <Trash2 />

      </Button>
  )
}
