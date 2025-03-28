import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Repeat } from "lucide-react"

interface Image {
  src: string,
  name: string
}

export default function ProductCard({src, name}: Image) {
  return (
    <Card className="w-full max-w-[240px] overflow-hidden border-none shadow-none bg-trasparent">
      <CardContent className="p-4 flex flex-col items-center">
        <div className="mb-2 h-48 w-full relative flex items-center justify-center">
          <img
            src={src}
            alt="Nature's Miracle Urine Destroyer"
            className="object-contain"
          />
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-lg text-white font-medium">
            {name}
            <br />
            17.5 oz.
          </h3>

          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-lg font-bold text-white">$4.32</span>
            <span className="text-sm text-white line-through">$12.99</span>
          </div>

          <div className="flex items-center justify-center text-sm text-gray-700 mt-1">
            <span className="font-semibold text-white">$4.1</span>
            <div className="flex items-center ml-1">
              <Repeat className="h-3 w-3 text-green-700 mr-1" />
              <span className="text-xs">repeat delivery</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-navy-blue hover:bg-navy-blue/90 text-white">ver más</Button>
      </CardFooter>
    </Card>
  )
}
