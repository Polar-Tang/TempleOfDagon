import { useContext, useEffect, useState } from "react"
import {  ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { CartContext } from "@/context/CartContext"
import type { Product } from "@/types/products"
// import { generateInvoice} from "@/lib/helpers/generateIncoive"
import useAddProductCart from '@/hooks/useAddProductCart'
import ImgComponent from "@/components/ImageComponent"
import SecondNavbar from "@/components/SecondNavbar"
import { Link } from "react-router-dom"


type ProductWithQuantity = {
  product: Product;
  quantity: number;
};

export default function CartPage() {

  const [isLoading, setIsLoading] = useState(true)
  const { cartProductsState, setCartProductsState } = useContext(CartContext)
  const [productsListWithQuantity, setProductsListWithQuantity] = useState<ProductWithQuantity[]>([]);


  const fetchAllCartProducts = async () => {
    const productsCart = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/`, {
      method: "GET",
      credentials: "include"
    })
    return productsCart.json()
  }

  useEffect(() => {
    const updatedList: ProductWithQuantity[] = [];

    cartProductsState.forEach((element) => {
      let roundNoRepeat = true;

      updatedList.forEach(productList => {
        if (element.title === productList.product.title) {
          productList.quantity++;
          roundNoRepeat = false;
        }
      });

      if (roundNoRepeat) {
        const newProduct: ProductWithQuantity = {
          product: element,
          quantity: 1
        };

        updatedList.push(newProduct);
      }
    });

    setProductsListWithQuantity(updatedList);
  }, [cartProductsState])


  useEffect(() => {
    try {

      fetchAllCartProducts().then(
        (products) => {
          let productsDetail = products.response.payload.detail
          setCartProductsState(JSON.parse(productsDetail))
        }
      )
    } catch (error) {
      console.error("Failed to load cart from session storage:", error)
      toast("Error", {
        description: "Failed to load your cart, please try again",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    } finally {
      setIsLoading(false)
    }
  }, [])


  // Clear cart
  const clearCart = async () => {
    setCartProductsState([])
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/`, {
        method: "DELETE",
        credentials: "include"
      })
      sessionStorage.removeItem("cart")
      toast("Cart clear", {
        description: "All items have been removed from your cart",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    } catch (error) {
      console.error("Failed to clear session storage:", error)
      toast("Error", {
        description: "Failed to clear the car please try again later",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    }
  }
  const subtotal = cartProductsState.reduce((sum, item) => sum + item.price * cartProductsState.length, 0)
  const tax = subtotal * 0.1

  const total = subtotal + tax


  return (
    <SecondNavbar>
      <div className="h-dvh flex bg-black text-white p-4 md:p-8 relative w-full container">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-2">
            <ShoppingCart className="h-8 w-8" />
            Your Cart
          </h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading your cart...</p>
            </div>
          ) : productsListWithQuantity.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800 text-white">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-zinc-500" />
                  <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                  <p className="text-zinc-400">Add some products to your cart to see them here.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                  <CardHeader>
                    <CardTitle>Cart Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-zinc-800">
                          <TableHead className="text-white">Product</TableHead>
                          <TableHead className="text-white text-right">Price</TableHead>
                          <TableHead className="text-white text-center">Quantity</TableHead>
                          <TableHead className="text-white text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableCartProducts productsList={productsListWithQuantity} />
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div>
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator className="bg-zinc-800" />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    
                    <Button className="w-full">
                      <Link to="/new/checkout/order">
                      Proceed to Checkout
                      </Link>      
                      </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </SecondNavbar>

  )
}


const TableCartProducts = ({ productsList }: { productsList: ProductWithQuantity[] }) => {
  const { addToCart } = useAddProductCart()
  const { cartProductsState, setCartProductsState } = useContext(CartContext)


  const decreaseQuantity = (_id: string) => {
    const indexFound = cartProductsState.findIndex((e) => e._id === _id)
    const deleteProductCart = async (id: string, position: number) => {

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
          cartStorage.splice(position, 1)
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
      } catch (err) {
        toast("Item removed", {
          description: "The item has been removed",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })

      }

    }
    deleteProductCart(_id, indexFound)
  }

  return (
    <TableBody>
      {productsList.map((item) => {
        const { _id, title, price, image_url } = item.product
        return (
          <TableRow key={_id} className="border-zinc-800 gap-x-10 overflow-hidden">
            <TableCell className="font-medium flex flex-col items-center">

              <div className="border-radius w-20 h-auto items-right">
                <ImgComponent alt={title} src={image_url} className="object-contain -ml-5 md:-ml-4" />
              </div>
            </TableCell>
            <TableCell className="text-right">${price.toFixed(2)}</TableCell>
            <TableCell className="text-center" id={_id}>
              <div className="flex items-center justify-center" id={_id}>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-zinc-800 border-zinc-700 text-white"
                  onClick={() => decreaseQuantity(_id)}
                >
                  <span className="sr-only">Decrease quantity</span>
                  <span>-</span>
                </Button>
                <span className="mx-2 w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-zinc-800 border-zinc-700 text-white"
                  onClick={addToCart}
                >
                  <span className="sr-only">Increase quantity</span>
                  <span>+</span>
                </Button>
              </div>
            </TableCell>
            <TableCell className="text-right">${(price * item.quantity).toFixed(2)}</TableCell>

          </TableRow>)
      }
      )}
    </TableBody>
  )

}