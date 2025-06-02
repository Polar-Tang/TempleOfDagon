// import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./banner.css"
import { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { ProductPortalContext } from '@/context/ProductPortalContext'
import { ImagesProducts } from '@/types/products'
import ProductsMock from '@/mocks/productsMock'
import { selectedImage } from '@/types/ContextTypes'
import ProductCardPortal from './cards/ProductCardPortal'

export function ImageSection({ images }: ImagesProducts): ReactElement<any | void, any | void> {

	const { setIsProductPortalOpen,
		setSelectedImage,
		isProductPortalOpen,
	} = useContext(ProductPortalContext)

	const renderProductPortal = (e: React.MouseEvent<HTMLButtonElement>) => {
		const imgElement = e.target as HTMLImageElement
		const product = ProductsMock.find((p) => p._id === imgElement.id)
		if (imgElement.tagName === 'IMG') {
			
			const dataProduct = {
				image_url: product?.image_url,
				_id: imgElement.id,
				description: product?.description,
				category: product?.category,
				price: product?.price ,
				title: product?.title,
			} as selectedImage
			console.log("Data product: ",dataProduct)
			setSelectedImage(dataProduct)
			setIsProductPortalOpen(true)
		}

	}
	console.log("Selected image: ", isProductPortalOpen)
	return (
		<div className={`images`}>
				  {isProductPortalOpen && <ProductCardPortal/>}		
			{images.map((img, index) => {
				return (
					<div className='image h-full' key={index}>
						<button onClick={(e) => renderProductPortal(e)} >
							<img src={img.image_url} alt={img.title} id={img._id} className='h-50 max-w-50' />
						</button>
					</div>
				)
			})}
		</div>
	)
}

export default function Banner({ images }: ImagesProducts) {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const [animationState, setanimationState] = useState<gsap.core.Tween>()
	const { isProductPortalOpen, selectedImage } = useContext(ProductPortalContext)
	const isSelectedImageEmpty = (selectedImage.title && selectedImage.image_url) == ""


	gsap.registerPlugin(useGSAP)

	useGSAP(() => {
		const scrollableWidth: number = 4000
		const imageWIdht: number = 202
		const totalImages: number = 20

		ScrollTrigger.config({
			limitCallbacks: true,
			ignoreMobileResize: true
		})

		gsap.set(".image", {
			x: (i) => i * imageWIdht
		})


		const animation = gsap.to(".wrapper", {
			x: `-=${scrollableWidth}`,
			duration: totalImages * 2,
			ease: "none",
			modifiers: {
				x: gsap.utils.unitize(x => parseFloat(x) % (totalImages * imageWIdht))
			},
			repeat: -1,
		})

		setanimationState(animation)

		return () => {
			animation.kill()
		}
	}, [])

	useEffect(() => {
		if (isProductPortalOpen && animationState && !isSelectedImageEmpty) {
			animationState.pause();
		} else if (animationState) {
			animationState.play();
		}
	}, [isProductPortalOpen, isSelectedImageEmpty]);

	return (
		<div className='banner-wrapper h-full flex items-center'>
			<div ref={wrapperRef} className='wrapper flex items-center justify-center'>
				<ImageSection images={images} />
				<ImageSection images={images} />

			</div>
		</div>
	)
}


