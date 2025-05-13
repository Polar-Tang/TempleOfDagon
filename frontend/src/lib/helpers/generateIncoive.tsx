import { CartContext } from "@/context/CartContext"
import { useContext } from "react"
import { toast } from "sonner"


export const generateInvoice = () => {
    const { cartProductsState } = useContext(CartContext)
    const subtotal = cartProductsState.reduce((sum, item) => sum + item.price * cartProductsState.length, 0)
    const tax = subtotal * 0.1
    
    const total = subtotal + tax
    const invoiceDate = new Date().toLocaleDateString()
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`
    
    const invoiceContent = `
      INVOICE
      
      Invoice Number: ${invoiceNumber}
      Date: ${invoiceDate}
      
      ITEMS:
      ${cartProductsState
        .map((item) => `${item.title} x${cartProductsState.length} - $${(item.price * cartProductsState.length).toFixed(2)}`)
        .join("\n")}
      
      Subtotal: $${subtotal.toFixed(2)}
      Tax (10%): $${tax.toFixed(2)}
      Total: $${total.toFixed(2)}
    `

    // Create a blob and download link
    const blob = new Blob([invoiceContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `invoice-${invoiceNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast("Invoices generated", {
      description: "Your invoices has been generated",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
  }