import { ThumbsUp } from 'lucide-react'
import { Button } from '../ui/button'
import { useContext, useState } from "react"
import { AlertDestructive } from '../AlertErrorComponent'
import { AlertProps } from '@/types/AlertTypes'
import { AuthContext } from "@/context/AuthContext"
import { BodyResponseAny } from '@/types/bodyResponse'
import Cookies from 'js-cookie'

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
        console.log("Status res: ", HTTPData.ok)
        // preferences
        const unsignedJWT = Cookies.get('preferences')
        console.log(unsignedJWT)
        if (unsignedJWT) {
            const [headerBase64, payloadBase64] = unsignedJWT.split('.');

            const payloadJson = atob(payloadBase64)
            const preferences = JSON.parse(payloadJson)
            console.log("The funasdfgjkdszfiokghjdfa páyloasdf ", preferences)
            setpreferences(preferences)
        }
        if (HTTPData.ok) {
            let alertData = { title: `${HTTPData.message}`, description: ``, variant: "default" } as AlertProps
            setDialogMessage(alertData)
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
                {(preferences?.productId?.includes(product_id)) ? <ThumbsUp className='s-4 text-blue-500' /> : <ThumbsUp className='s-6 text-gray-400' />}
            </Button>
            {open && <AlertDestructive title={dialogMessage.title} description={dialogMessage.description} variant={dialogMessage.variant} />}
        </>
    )
}

export default LikeProductButton