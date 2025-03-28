// import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./banner.css"
import { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { ProductPortalContext } from '@/context/ProductPortalContext'

const reactWindow = window.React
import React from "react"
console.log(reactWindow === window.React);
interface BannerPorps {
	images: {
		src: string
		name: string
	}[]
}

export function ImageSection({ images }: BannerPorps): ReactElement<any | void, any | void> {
	
	const { setIsProductPortalOpen,
		setSelectedImage
	  } = useContext(ProductPortalContext)

	const renderProductPortal = (e: React.MouseEvent<HTMLButtonElement>) => {
		const imgElement = e.target as HTMLImageElement

		if (imgElement.tagName === 'IMG') {
			const src: string = imgElement.src
			const name: string = imgElement.alt

			const dataProduct = { 
				src: src, 
				name: name,
			}

			setSelectedImage(dataProduct)
			setIsProductPortalOpen(true)
		}
	}


	return (
		<div className={`images`}>
			{images.map(({ src, name }, index) => {
				return (
					<div className='image h-full' key={index}>
						<button onClick={e => renderProductPortal(e)} >
							<img src={src} alt={name} className='h-50 max-w-50' />
						</button>
					</div>
				)
			})}
		</div>
	)
}

export default function Banner({ images }: BannerPorps) {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const [animationState, setanimationState] = useState<gsap.core.Tween>()
	const { isProductPortalOpen } = useContext(ProductPortalContext)
	
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
	}, []) // SHould render on every render

	useEffect(() => {
		if (isProductPortalOpen && animationState) {
			animationState.pause();
		} else if (animationState){
			animationState.play();
		}
	  }, [isProductPortalOpen]);

	return (
		<div className='banner-wrapper h-full flex items-center'>
			<div ref={wrapperRef} className='wrapper flex items-center justify-center'>
				<ImageSection images={images} />
				<ImageSection images={images} />

			</div>
		</div>
	)
}


