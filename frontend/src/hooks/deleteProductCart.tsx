import { CartContext } from "@/context/CartContext";
import { useCallback, useContext } from "react";
import { toast } from "sonner";

export const deleteProductCart = useCallback(async (id: string, position: number) => {
  const { setCartProductsState } = useContext(CartContext)

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