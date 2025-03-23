// import { useEffect, useState } from 'react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./banner.css"
import { useState } from 'react';
import ImageProduct from './ImageProduct';

interface BannerPorps {
	images: {
		src: string;
		name: string;
	}[],
}

export function ImageSection({ images }: BannerPorps) {
	const [isProduct, setIsProduct] = useState(false)
	
	return (
		<div className={`images`}>
			{images.map(({ src, name }) => (
				<div className='image h-full'>
					<button onClick={() => setIsProduct(true)} >
					<img src={src} alt={name} className='h-50 max-w-50' />

					 </button> 
					{isProduct && (
               <ImageProduct 
                 isProduct={isProduct}
                 source={src}
                 name={name}
			 	setIsProduct={setIsProduct}
               />
            )}
				</div>
			))}
		</div>
	);
}

export default function Banner({ images }: BannerPorps) {
	const [imageListState, setImageListState] = useState(images)


	gsap.registerPlugin(useGSAP);
	gsap.registerPlugin(ScrollTrigger)

	useGSAP(() => {
		const wraperHTML: HTMLElement = document.querySelector(".wrapper")!;

		// const scrollableWidth: number = wraperHTML?.scrollWidth

		ScrollTrigger.defaults({
			scroller: document.documentElement
		});

		ScrollTrigger.config({
			limitCallbacks: true,
			ignoreMobileResize: true
		});

		const imagesElementsList: HTMLElement[] = gsap.utils.toArray(".image")

		const animation = gsap.to(".wrapper", {
		  x: -wraperHTML?.scrollWidth,
		  duration: 20,
		  ease: "none",
		  repeat: -1
		});

		let total: number = 0


		ScrollTrigger.create({
			trigger: ".banner-wrapper",
			scroller: ".banner-wrapper",
			start: "left left",
			end: () => "+=" + wraperHTML?.scrollWidth,
			// end: () => "+=" + wraperHTML?.scrollWidth,
			scrub: 1,
			markers: true,
			horizontal: true,
			onUpdate: () => {
				const lastImage = imagesElementsList[9]
				// const firstImage = imagesList[total]
				
				if (ScrollTrigger.isInViewport(lastImage, 0.2, true)) {
					console.log("Appending image to the end of the carousel.");
					imagesElementsList.push(lastImage)
					setImageListState((prevState) => {
						const newImages = [...prevState];
						newImages.push(images[total]);
						return newImages;
					})
					total < 9 ? total++ : total= 0
					console.log("Now total ", total)
				}
			}
		});

		    return () => {
		  	animation.kill();
		    };
	}, [])

	return (
		<div className='banner-wrapper h-full flex items-center'>
			<div className='wrapper flex items-center justify-center'>
				<ImageSection images={imageListState} />
				{/* <ImageSection images={images} index="2" /> */}

			</div>
		</div>
	);
}