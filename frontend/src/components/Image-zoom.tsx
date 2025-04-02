import type React from "react"
// import { Heart } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import CardPurchaseOptions from "@/components/cards/CardPurchaseOptions"
// import BreadCrumbsNav from '@/components/menus/BreadCrumbsNav'
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { Product } from "@/types/products"
import ProductsDetails from "@/components/ProductDetails"

interface ImageZoomProps {
  src: string
  alt: string
  magnifyAmount?: number
  className?: string,
  product: Product
}

export function ImageZoom({ src, alt, magnifyAmount = 2.5, className, product }: ImageZoomProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return

    // Get the position of the image container
    const { left, top, width, height } = imageRef.current.getBoundingClientRect()

    // Calculate cursor position relative to the image (0 to 1)
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    // Ensure values are within bounds
    const boundedX = Math.max(0, Math.min(1, x))
    const boundedY = Math.max(0, Math.min(1, y))

    setPosition({ x: boundedX, y: boundedY })
    setCursorPosition({ x: e.clientX - left, y: e.clientY - top })
  }

  return (
    <>
      <div className="space-y-4">
        <div
          ref={imageRef}
          className={cn("relative overflow-hidden rounded-lg border", className)}
          onMouseEnter={() => setShowMagnifier(true)}
          onMouseLeave={() => setShowMagnifier(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            // width={width}
            // height={height}
            className="w-full h-auto object-cover w-[150px] h-[150px]"
          />

          {/* Hover indicator */}
          {showMagnifier && (
            <div
              className="absolute border-2 border-white pointer-events-none shadow-sm bg-black/5 h-[150px] w-[150px]"
              style={{
                left: `${cursorPosition.x - 75}px`,
                top: `${cursorPosition.y - 75}px`,
                width: "150px",
                height: "150px",
                opacity: 0.5,
              }}
            />
          )}
        </div>
        </div>
        {/* Magnified view */}
        <div className="space-y-4" >
          <div
            className={cn(
              "relative overflow-hidden rounded-lg aspect-square ",
              !showMagnifier && "hidden md:block",
              showMagnifier && "md:block opacity-100",
            )}
          >
            {showMagnifier ? (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${src})`,
                  backgroundPosition: `${position.x * 100}% ${position.y * 100}%`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: `${magnifyAmount * 100}%`,
                }}
              />
            ) : (
              <div className="flex items-center h-full text-muted-foreground">
                <ProductsDetails product={product} />
              </div>
            )}
          </div>
        </div>
    </>
  )
}
