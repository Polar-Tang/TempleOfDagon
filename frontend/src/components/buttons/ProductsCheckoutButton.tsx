import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '@/context/CartContext'

const ProductsCheckoutButton = () => {
    const {basketIdState, setbasketIdState} = useContext(CartContext)
    //const navigate = useNavigate()
        // send the form data to the backend
        
        useEffect(() => {
            const cookies = document.cookie.split(";")
        const baskerCookie = cookies.find((val) => {
            return val.includes("basketId")
        })
        const basketId = baskerCookie?.substring(10)
        basketId && setbasketIdState(basketId)
        }, [basketIdState])
        
  return (
    <Link 
    to={`/new/checkout/cart`}
    // onClick={handleCheckout}
    >
      See all products
    </Link >
  )
}

export default ProductsCheckoutButton

