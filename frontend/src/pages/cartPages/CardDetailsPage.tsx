import SecondNavbar from "@/components/SecondNavbar"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import DocumentPage from "./DocumentPage"
import { paymentDetail } from "@/types/PaymentDetail"
// import { PDFViewer } from "@react-pdf/renderer"

const CardDetailsPage = () => {
    const { name } = useParams()
    const location = useLocation()
    const [products, setProducts] = useState({} as paymentDetail)
    


    const queryParams = new URLSearchParams(location.search)
    const orderId = queryParams.get("order")
    const chekoutDetails = async () => {
        try {
            const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/checkout-router/${name}?order=${orderId}`, {
                method: "GET",
                credentials: "include",
            })
            if (!responseHTTP.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await responseHTTP.json()
            let infoDataEntries = data.response.payload.productsDetail as paymentDetail

            setProducts(infoDataEntries)


        } catch (error) {
            console.error('Fetch error:', error)
        }
    }

    useEffect(() => {
        if (name && orderId) {
            chekoutDetails()
        }
    }, [])
    return (
        <>
            <SecondNavbar>
                {/* <PDFViewer> */}

                    <DocumentPage data={products} />
                {/* </PDFViewer> */}


            </SecondNavbar>
        </>
    )
}

export default CardDetailsPage