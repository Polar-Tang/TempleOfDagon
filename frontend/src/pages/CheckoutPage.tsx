import { useContext, useEffect, useState } from "react"
import { Download, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { CartContext } from "@/context/CartContext"
import { ProductCardDelete } from "@/components/buttons/ProcuctCardButons"
import type { Product } from "@/types/products"
import { generateInvoice} from "@/lib/helpers/generateIncoive"
import { deleteProductCart } from "@/hooks/deleteProductCart"

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
  

  // Load cart items from session storage
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



  // Generate invoice
  

  // Clear cart
  const clearCart = () => {
    setCartProductsState([])
    try {
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
  const decreaseQuantity = (_id: string, index: number) => { 
    deleteProductCart(_id, index)
  }

  return (
    // <SecondNavbarStore>
    <div className="min-h-screen w-screen bg-black text-white">
      <header className="border-b border-gray-800 top-0 w-full h-15 px-4 py-2">
      </header>
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"></div>

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
                              <TableHead className="text-white w-[50px]"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {productsListWithQuantity.map((item, index) => 
                            {  const {_id, title, price, image_url} = item.product
                            return (
                              <TableRow key={_id} className="border-zinc-800">
                                <TableCell className="font-medium flex flex-col">
                                  <div>
                                  {title}
                                  </div>
                                  <div>
                                    <img src={image_url} />
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">${price.toFixed(2)}</TableCell>
                                <TableCell className="text-center">
                                  <div className="flex items-center justify-center">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 rounded-full bg-zinc-800 border-zinc-700 text-white"
                                      onClick={() => decreaseQuantity(_id, index)}
                                    >
                                      <span className="sr-only">Decrease quantity</span>
                                      <span>-</span>
                                    </Button>
                                    <span className="mx-2 w-8 text-center">{item.quantity}</span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 rounded-full bg-zinc-800 border-zinc-700 text-white"
                                      // onClick={() => decreaseQuantity(_id, item.quantity + 1)}
                                    >
                                      <span className="sr-only">Increase quantity</span>
                                      <span>+</span>
                                    </Button>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">${(price * item.quantity).toFixed(2)}</TableCell>
                                <TableCell>
                                  <ProductCardDelete
                                    className="text-zinc-400 hover:text-white hover:bg-red-400"
                                    id={_id}
                                    position={index}
                                  />
                                </TableCell>
                              </TableRow>)}
                            )}
                          </TableBody>
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
                        <Button className="w-full" onClick={generateInvoice}>
                          <Download className="mr-2 h-4 w-4" />
                          Generate Invoice
                        </Button>
                        <Button className="w-full">Proceed to Checkout</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main >
    </div >
    // </SecondNavbarStore>
  )
}
