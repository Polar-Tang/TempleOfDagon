import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

interface ImgComponentProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  portalClassName?: string
  imageClassName?: string
}

export default function ImgComponent({
  src,
  alt,
  width,
  height,
  className = "",
  portalClassName = "",
  imageClassName = "",
}: ImgComponentProps) {
  const [showPortal, setShowPortal] = useState(false)
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    // Create portal container when component mounts
    if (typeof window !== "undefined" && !portalContainer) {
      const div = document.createElement("div")
      div.id = "img-portal-container"
      setPortalContainer(div)
      document.body.appendChild(div)
    }

    // Cleanup function to remove portal container
    return () => {
      if (portalContainer && document.body.contains(portalContainer)) {
        document.body.removeChild(portalContainer)
      }
    }
  }, [portalContainer])

  useEffect(() => {
    // Prevent scrolling when portal is open
    if (showPortal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [showPortal])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowPortal(false)
    }
  }

  useEffect(() => {
    if (showPortal) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [showPortal])

  const openPortal = () => setShowPortal(true)
  const closePortal = () => setShowPortal(false)

  const ImagePortal = () => {
    if (!portalContainer) return null

    return createPortal(
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 ${portalClassName}`}
        onClick={(e) => {
          // Close portal when clicking the background
          if (e.target === e.currentTarget) {
            closePortal()
          }
        }}
      >
        <div className="relative max-h-[90vh] max-w-[90vw]">
          <button
            onClick={closePortal}
            className="absolute -right-4 -top-4 rounded-full bg-white p-1 text-black shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            className={`max-h-[85vh] max-w-[85vw] rounded-lg object-contain ${imageClassName}`}
          />
        </div>
      </div>,
      portalContainer,
    )
  }

  return (
    <>
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        onClick={openPortal}
        className={`cursor-pointer transition-transform hover:scale-[1.02] ${className}`}
      />
      {showPortal && <ImagePortal />}
    </>
  )
}
