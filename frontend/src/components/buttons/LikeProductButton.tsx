import { Heart } from 'lucide-react'
import { Button } from '../ui/button'
import { useContext, useState } from "react"
import { AlertDestructive } from '../AlertErrorComponent'
import { AlertProps } from '@/types/AlertTypes'
import { AuthContext } from "@/context/AuthContext"
import { BodyResponseAny } from '@/types/bodyResponse'

const LikeProductButton = ({ product_id }: { product_id: string }) => {

    const [open, setOpen] = useState(false)
    const [dialogMessage, setDialogMessage] = useState({title: "", description: "", variant: "destructive"} as AlertProps)
    const {setpreferences, preferences} = useContext(AuthContext)

    const likeProductApi = async (product_id: string) => {
        try {
            
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/preference/like/${product_id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            })
            const HTTPData: BodyResponseAny = await res.json()
            console.log(HTTPData)
            if (HTTPData.ok) {
                let alertData = {title: `${HTTPData.message}`, description: ``, variant: "default"} as AlertProps
                setDialogMessage(alertData) 
                const newProductIds = preferences.productId.filter(prod => prod !== product_id);
                setpreferences({ ...preferences, productId: newProductIds });
            } else if (HTTPData.status === 403) {
                let alertData = {title: `${HTTPData.message}`, description: ``, variant: "destructive"} as AlertProps
                setDialogMessage(alertData)
            }
        } catch (e) {
            console.log(e)
            let alertData: AlertProps = {title: `Something went Wrong`, description: `Sorry, Try again later!`, variant: "destructive"}
                setDialogMessage(alertData) 
        }
        setOpen(true)
        setTimeout(() => setOpen(false), 2000)
    }

    return (
        <>
            <Button onClick={() => likeProductApi(product_id)} className="ml-auto text-gray-400 hover:text-blue-500">
                <Heart className="w-6 h-6" />
            </Button>
            {open && <AlertDestructive title={dialogMessage.title} description={dialogMessage.description} variant={dialogMessage.variant} />}
        </>
    )
}

export default LikeProductButton