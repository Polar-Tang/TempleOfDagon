import { ThumbsUp } from 'lucide-react'
import { Button } from '../ui/button'
import { useContext, useState } from "react"
import { AlertDestructive } from '../AlertErrorComponent'
import { AlertProps } from '@/types/AlertTypes'
import { AuthContext } from "@/context/AuthContext"
import { BodyResponseAny } from '@/types/bodyResponse'

const LikeProductButton = ({ product_id, setnumberLikesState }: { product_id: string, setnumberLikesState: React.Dispatch<React.SetStateAction<number>> }) => {

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
         const preferencesToken = res.headers.get("x-preferences-token")
          console.log("#The preferrences header ", preferencesToken)
          if (preferencesToken) {
            const asdf = preferencesToken.split('.');
            const payloadJson = atob(asdf[1])
            console.log("The payload ", payloadJson) // The payload null
            const preferences = JSON.parse(payloadJson)
            setpreferences(preferences)
          }
        if (HTTPData.ok) {
            let alertData = { title: `${HTTPData.message}`, description: ``, variant: "default" } as AlertProps
            setDialogMessage(alertData)
            if (HTTPData.message === "Product liked!") {
                setnumberLikesState((prev) => prev + 1)
            } else {
                setnumberLikesState((prev) => prev - 1)
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
    console.log("Prefences: ",preferences)

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