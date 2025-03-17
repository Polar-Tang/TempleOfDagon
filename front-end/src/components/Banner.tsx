// import { useEffect, useState } from 'react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./banner.css"
import { useRef, useState } from 'react';

interface BannerPorps {
	images: {
		src: string;
		name: string;
	}[],
}

interface Index {
	index: string
}

export function ImageSection({ images, index }: BannerPorps & Index) {

	return (
		<div className={`images flex image-wrapper-${index}`}>
			{images.map(({ src, name }) => (
				<div className='image h-full'>
					<img src={src} alt={name} className='h-50 max-w-50' />
				</div>
			))}
		</div>
	);
}

export default function Banner({ images }: BannerPorps) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [imageListState, setImageListState] = useState(images)


	gsap.registerPlugin(useGSAP);
	gsap.registerPlugin(ScrollTrigger)

	useGSAP(() => {
		const wrapper = wrapperRef.current;
		const wraperHTML: HTMLElement = document.querySelector(".wrapper")!;

		ScrollTrigger.defaults({
			scroller: document.documentElement
		});

		ScrollTrigger.config({
			limitCallbacks: true,
			ignoreMobileResize: true
		});

		const imagesElementsList: HTMLElement[] = gsap.utils.toArray(".image")

		const animation = gsap.to(".wrapper", {
		  x: -wraperHTML?.scrollWidth + window.innerWidth ,
		  duration: 20,
		  ease: "none",
		  repeat: -1
		});

		let total: number = 0


		ScrollTrigger.create({
			trigger: ".banner-wrapper",
			scroller: ".banner-wrapper",
			start: "left left",
			// end: () => "+=" + "3000",
			end: () => "+=" + wraperHTML?.scrollWidth,
			scrub: 1,
			markers: true,
			horizontal: true,
			onUpdate: () => {
				const lastImage = imagesElementsList[9]
				
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
				<ImageSection images={imageListState} index="1" />
				{/* <ImageSection images={images} index="2" /> */}

			</div>
		</div>
	);
}