import { Heart } from 'lucide-react'
import { Button } from '../ui/button'
import { useContext, useState } from "react"
import { AlertDestructive } from '../AlertErrorComponent'
import { AlertProps } from '@/types/AlertTypes'
import { AuthContext } from "@/context/AuthContext"
import { BodyResponseAny } from '@/types/bodyResponse'

const LikeProductButton = ({ product_id }: { product_id: string }) => {

    const [open, setOpen] = useState(false)
    const [dialogMessage, setDialogMessage] = useState({ title: "", description: "", variant: "destructive" } as AlertProps)
    const { setpreferences, preferences } = useContext(AuthContext)

    const likeProductApi = async (product_id: string) => {

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/preference/like/${product_id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
            },
            credentials: "include"
        })
        const HTTPData: BodyResponseAny = await res.json()
        console.log("Status res: ",HTTPData.ok)
        if (HTTPData.ok) {
            let alertData = { title: `${HTTPData.message}`, description: ``, variant: "default" } as AlertProps
            setDialogMessage(alertData)
            if (HTTPData.message === "Product liked!") {
                console.log("The preferences before ", preferences)
                const newProductIds = [...preferences.productId, product_id];
                setpreferences({ ...preferences, productId: newProductIds });
                console.log("The preferences after ", preferences)
            } else {
                console.log("The preferences before ", preferences)
                const newProductIds = preferences.productId.filter((id) => id !== product_id);
                setpreferences({ ...preferences, productId: newProductIds });
                console.log("The preferences after ", preferences)
            }
        } else if (res.status === 403) {
            let alertData = { title: `${HTTPData.message}`, description: `Please login before like the product`, variant: "destructive" } as AlertProps
            setDialogMessage(alertData)
        } else {
            let alertData: AlertProps = { title: `Something went Wrong`, description: `Sorry, Try again later!`, variant: "destructive" }
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