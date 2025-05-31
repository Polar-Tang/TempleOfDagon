import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Repeat, ThumbsUp } from "lucide-react"
import type { Product } from "@/types/products"
import { ProcuctAddCardButton, ProductCardDetail } from "../buttons/ProcuctCardButons"


export default function ProductCard({ product, liked_ids }: {
  product: Product,
  liked_ids: string[] | undefined 
  // addToCart: (e: React.MouseEvent) => void,
}) {
  const { _id,
    title,
    price,
    image_url } = product
    console.log(liked_ids)
  return (
    <Card key={_id} id={_id} className="justify-items-center w-full overflow-hidden border-none shadow-none bg-trasparent">
      <CardContent className="p-4 flex flex-col items-center">
        <div className="mb-2 h-48 w-full relative flex items-center justify-center">
          { (liked_ids && liked_ids.includes(_id)) && <ThumbsUp className="s-14 text-white absolute float-right"/>}
          <img
            src={image_url}
            alt="Nature's Miracle Urine Destroyer"
            className="object-fit h-full rounded-lg max-w-[200px]"
          />
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-lg text-white font-medium">
            {title}
            <br />
          </h3>

          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-lg font-bold text-white">{price}$</span>
            {/* <span className="text-sm text-white line-through">$12.99</span> */}
          </div>

          <div className="flex items-center justify-center text-sm text-gray-700 mt-1">
            <span className="fon</svg>t-semibold text-white">{price}</span>
            <div className="flex items-center ml-1">
              <Repeat className="h-3 w-3 text-green-700 mr-1" />
              <span className="text-xs">repeat delivery</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
      <ProductCardDetail classes={"w-full"} id={_id} />

      <ProcuctAddCardButton classes={"w-full transition-all duration-300"} />
      </CardFooter>
    </Card>
  )
}
