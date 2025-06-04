import type { Product } from "@/types/products"
import LikeProductButton from './buttons/LikeProductButton'
import { formatRelativeTime } from "@/lib/helpers/formatRelativeTime"
import * as React from "react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { ProcuctAddCardButton } from "./buttons/ProductCartButons"

const ProductDetails = ({ product, likesNum, setnumberLikesState }: {
    product: Product, likesNum: number, setnumberLikesState: React.Dispatch<React.SetStateAction<number>>
}) => {
    const { title, createdAt, price, _id, category, stock } = product
    console.log("son likes", likesNum)
    return (
        <>
            <div className='p-6 bg-gray-900  space-y-6' >
                <div className="flex  items-center gap-2">

                    <LikeProductButton setnumberLikesState={setnumberLikesState} product_id={_id} />
                </div>

                <h1 className="text-6xl font-bold font-burtonNT">
                    {title}
                </h1>

                <div className="flex items-center">
                    <div className="flex">
                        Likes
                    </div>
                    <span className="text-gray-500 ml-1">{likesNum}</span>
                </div>

                <div className="pt-4">
                    <div className="text-3xl font-bold">$ {price}</div>
                    <div className="text-gray-600">
                        6 cuotes of $ {Math.round(price / 6)}
                    </div>

                    <PaymentMethods />
                </div>

                <div className="pt-6">
                    <h3 className="font-medium text-lg">Details</h3>
                    <ul className="mt-2 space-y-2">
                        <li className="flex gap-2">
                            <span>•</span>
                            <span>Stock: {stock}</span>
                        </li>
                        <li className="flex gap-2">
                            <span>•</span>
                            <span>Publish: {formatRelativeTime(createdAt)}</span>
                        </li>
                        <li className="flex gap-2">
                            <span>•</span>
                            <span>Category: {category}</span>
                        </li>

                    </ul>
                </div>
                <ProcuctAddCardButton classes="flex items-center" />
            </div>

            {/* <CardPurchaseOptions /> */}
        </>
    )
}

export default ProductDetails

const PaymentMethods = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-blue-500 text-sm hover:underline mt-1">
                    See paid methods
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Payment Methods</DialogTitle>
                    <DialogDescription>
                        We only accept the Temple of Dagon credit card
                    </DialogDescription>
                    <div className="flex justify-center">
                        <img className="w-60 md:w-100" src="/images/temple_dagon_card.png" />
                        {/* <Link to="/contact" >Get your own</Link> */}
                    </div>
                </DialogHeader>
                {/* Add your payment methods details here */}
                <DialogFooter>
                    <DialogClose asChild>
                        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Close
                        </button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}