import type React from "react"

import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SecondNavbar from "@/components/SecondNavbar"
import { CartContext } from "@/context/CartContext"


export default function CardDetailsForm() {
    
    const { cartProductsState } = useContext(CartContext)
    

    // const [cartItems, setCartItems] = useState<Product[]>([])
    // const [isLoading, setIsLoading] = useState(true)
    const [isProcessing, setIsProcessing] = useState(false)

    // Form state
    const [formData, setFormData] = useState({
        cardNumber: "",
        cardholderName: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
        address: "",
        country: "US",
    })

    const validCardDetails = {
        cardholderName: "Robert Olmstead",
        cardNumber: "5901459740715409",
        expiryMonth: "3",
        expiryYear: "2033",
        cvv: "457",
        country: "usa",
        address: "777 The fisherman, Insmouth, Massachusetts"
    }

    const autoComplete = () => {
        setFormData({
            cardNumber: validCardDetails.cardNumber,
            cardholderName: validCardDetails.cardholderName,
            expiryYear: validCardDetails.expiryYear,
            expiryMonth: validCardDetails.expiryMonth,
            cvv: validCardDetails.cvv,
            address: validCardDetails.address,
            country: validCardDetails.country
        })
    }

    // Form errors
    const [errors, setErrors] = useState<Record<string, string>>({})

    // // Load cart items from session storage
    // useEffect(() => {
    //     try {
    //         const storedCart = sessionStorage.getItem("cart")
    //         if (storedCart) {
    //             setCartProductsState(JSON.parse(storedCart))
    //         }
    //     } catch (error) {
    //         console.error("Failed to load cart from session storage:", error)

    //     } finally {
    //         setIsLoading(false)
    //     }
    // }, [])

    // Calculate totals
    const subtotal = cartProductsState.reduce((sum, item) => sum + item.price, 0)
    const shipping = subtotal > 100 ? 0 : 10
    const total = subtotal + shipping

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        // Format card number with spaces
        if (name === "cardNumber") {
            const formatted = value
                .replace(/\s/g, "")
                .replace(/(\d{4})/g, "$1 ")
                .trim()
            setFormData({ ...formData, [name]: formatted })
            return
        }

        setFormData({ ...formData, [name]: value })
    }

    // Handle select changes
    const handleSelectChange = (name: string, value: string | number) => {
        setFormData({ ...formData, [name]: value })
    }

    // Validate form
    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        // Card number validation (16 digits)
        if (!/^\d{4}\d{4}\d{4}\d{4}$/.test(formData.cardNumber)) {
            newErrors.cardNumber = "Please enter a valid 16-digit card number"
        }

        // Cardholder name validation
        if (!formData.cardholderName.trim()) {
            newErrors.cardholderName = "Cardholder name is required"
        }

        // Expiry validation
        if (!formData.expiryMonth) {
            newErrors.expiryMonth = "Required"
        }

        if (!formData.expiryYear) {
            newErrors.expiryYear = "Required"
        }

        // CVV validation (3-4 digits)
        if (!/^\d{3,4}$/.test(formData.cvv)) {
            newErrors.cvv = "Enter a valid 3-4 digit CVV"
        }

        // Address validation
        if (!formData.address.trim()) {
            newErrors.address = "Address is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const fetchCheckout = async () => { 
        // const dataHTTP = 
        const dataHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/checkout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(formData)
        })
        const response = await dataHTTP.json()
        if (response.response.ok) {
            window.location.href = response.response.payload.detail;
        } else {
            console.log("ERROR")
        }
    }

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {

            return
        }

        setIsProcessing(true)

        // Simulate payment processing
        setTimeout(() => {
            try {
                fetchCheckout()
                // Clear cart after successful payment
                //sessionStorage.removeItem("cart")
                // Redirect to success page
                // router.push("/checkout/success")
            } catch (error) {
                console.error("Error processing payment:", error)

                setIsProcessing(false)
            }
        }, 2000)
    }

    // Generate years for expiry select
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i)

    return (
        <SecondNavbar>

            <div className="min-h-screen bg-black text-white p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <Link to="/new/checkout/cart" className="flex items-center text-zinc-400 hover:text-white transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Cart
                        </Link>
                    </div>

                    <div className="w-full flex flex-row gap-10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-2">
                            <CreditCard className="h-8 w-8" />
                            Checkout
                        </h1>

                        <Button className="text-3xl bg-green-800 hover:bg-green-900 hover:cursor-pointer md:text-4xl font-bold mb-8 flex items-center gap-2"
                            onClick={autoComplete}
                        >
                            Autocomplete
                        </Button>

                    </div>
                    {cartProductsState.length === 0 ? (
                        <Card className="bg-zinc-900 border-zinc-800 text-white">
                            <CardContent className="pt-6">
                                <div className="text-center py-12">
                                    <CreditCard className="h-12 w-12 mx-auto mb-4 text-zinc-500" />
                                    <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                                    <p className="text-zinc-400 mb-6">Add some products to your cart before checkout.</p>
                                    <Link to="/">
                                        <Button>Continue Shopping</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="md:col-span-2">
                                <form onSubmit={handleSubmit}>
                                    <Card className="bg-zinc-900 border-zinc-800 text-white mb-6">
                                        <CardHeader>
                                            <CardTitle>Payment Information</CardTitle>
                                            <CardDescription className="text-zinc-400">
                                                Enter your card details to complete your purchase
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="cardNumber">Card Number</Label>
                                                    <Input
                                                        id="cardNumber"
                                                        name="cardNumber"
                                                        placeholder="1234 5678 9012 3456"
                                                        className="bg-zinc-800 border-zinc-700 text-white"
                                                        value={formData.cardNumber}
                                                        onChange={handleChange}
                                                        maxLength={16}
                                                    />
                                                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                                                </div>

                                                <div>
                                                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                                                    <Input
                                                        id="cardholderName"
                                                        name="cardholderName"
                                                        placeholder="John Doe"
                                                        className="bg-zinc-800 border-zinc-700 text-white"
                                                        value={formData.cardholderName}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
                                                </div>

                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="col-span-1">
                                                        <Label htmlFor="expiryMonth">Month</Label>
                                                        <Select
                                                            value={formData.expiryMonth}
                                                            onValueChange={(value) => handleSelectChange("expiryMonth", value)}
                                                        >
                                                            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                                                <SelectValue placeholder="MM" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                                                                {Array.from({ length: 12 }, (_, i) => {
                                                                    const month = (i + 1).toString()
                                                                    return (
                                                                        <SelectItem key={month} value={month}>
                                                                            {month}
                                                                        </SelectItem>
                                                                    )
                                                                })}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.expiryMonth && <p className="text-red-500 text-sm mt-1">{errors.expiryMonth}</p>}
                                                    </div>

                                                    <div className="col-span-1">
                                                        <Label htmlFor="expiryYear">Year</Label>
                                                        <Select
                                                            value={formData.expiryYear}
                                                            onValueChange={(value) => handleSelectChange("expiryYear", value)}
                                                        >
                                                            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                                                <SelectValue placeholder="YY" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                                                                {years.map((year) => (
                                                                    <SelectItem key={year} value={year.toString()}>
                                                                        {year}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.expiryYear && <p className="text-red-500 text-sm mt-1">{errors.expiryYear}</p>}
                                                    </div>

                                                    <div className="col-span-1">
                                                        <Label htmlFor="cvv">CVV</Label>
                                                        <Input
                                                            id="cvv"
                                                            name="cvv"
                                                            placeholder="123"
                                                            className="bg-zinc-800 border-zinc-700 text-white"
                                                            value={formData.cvv}
                                                            onChange={handleChange}
                                                            maxLength={4}
                                                        />
                                                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-zinc-900 border-zinc-800 text-white">
                                        <CardHeader>
                                            <CardTitle>Billing Address</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <Label htmlFor="address">Address</Label>
                                                <Input
                                                    id="address"
                                                    name="address"
                                                    placeholder="123 Main St"
                                                    className="bg-zinc-800 border-zinc-700 text-white"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                />
                                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                            </div>



                                            <div className="grid grid-cols-2 gap-4">
                                                <div>

                                                </div>

                                                <div>
                                                    <Label htmlFor="country">Country</Label>
                                                    <Select
                                                        value={formData.country}
                                                        onValueChange={(value) => handleSelectChange("country", value)}
                                                    >
                                                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                                            <SelectValue placeholder="Select country" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                                                            <SelectItem value="usa">United States</SelectItem>
                                                            <SelectItem value="CA">Canada</SelectItem>
                                                            <SelectItem value="UK">United Kingdom</SelectItem>
                                                            <SelectItem value="AU">Australia</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button type="submit" className="w-full hover:cursor-pointer hover:bg-green-900" disabled={isProcessing}>
                                                {isProcessing ? "Processing..." : "Complete Payment"}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </form>
                            </div>

                            <div>
                                <Card className="bg-zinc-900 border-zinc-800 text-white sticky top-4">
                                    <CardHeader>
                                        <CardTitle>Order Summary</CardTitle>
                                        <CardDescription className="text-zinc-400">
                                            {cartProductsState.length} {cartProductsState.length === 1 ? "item" : "items"} in your cart
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="max-h-64 overflow-y-auto pr-2">
                                            {cartProductsState.map((item, i) => (
                                                <div key={i} className="flex justify-between py-2">
                                                    <div className="flex-1">
                                                        <p>{item.title}</p>

                                                    </div>
                                                    <p>${item.price}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <Separator className="bg-zinc-800 my-4" />

                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-zinc-400">Subtotal</span>
                                                <span>${subtotal.toFixed(2)}</span>
                                            </div>
                                            
                                            <div className="flex justify-between">
                                                <span className="text-zinc-400">Shipping</span>
                                                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                            </div>
                                            <Separator className="bg-zinc-800 my-2" />
                                            <div className="flex justify-between font-bold">
                                                <span>Total</span>
                                                <span>${total.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-center text-zinc-400 text-sm">
                                            <ShieldCheck className="h-4 w-4 mr-2" />
                                            <span>Secure checkout powered by Stripe</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </SecondNavbar>
    )
}
