// import { useEffect, useState } from 'react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useRef, Ref } from 'react';

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

	gsap.registerPlugin(useGSAP);
	gsap.registerPlugin(ScrollTrigger)

	useGSAP(() => {
		const tl = gsap.timeline();
		const secWrapper = document.querySelector('.image-wrapper-2') as HTMLElement;
		console.log("How fortune the man with none: ", secWrapper, "tih a length of ", secWrapper.clientWidth)
		gsap.set(".image-wrapper-2", { x: secWrapper.scrollWidth })

		const wrapper = document.querySelector(".wrapper") as HTMLElement

		tl.to(".banner-wrapper .wrapper .images", {
			x: -(wrapper.scrollWidth - wrapper.clientWidth),
		  	ease: "none", 
			scrollTrigger: {
				scrub: 1,
				trigger: ".wrapper",
				start: "top 90%",
				markers: true,
				// horizontal: true,
				end: () => `+=` + wrapper.scrollWidth,

			},
		})

		// tl.to(".image-wrapper-1", {
		// 	x: -secWrapper.scrollWidth,
		// 	duration: 5,
		// 	ease: "none",


		// });

		// tl.to(".image-wrapper-2", {
		// 	x: 0,
		// 	duration: 5,
		// 	ease: "none",

		// });

	}, []);
	// {scope: imagesContaier2}
	console.log("")
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
	return (
		<div className='banner-wrapper h-full flex items-center'>
			<div className='wrapper flex items-center justify-center'>
				<ImageSection images={images} index="1" />
				<ImageSection images={images} index="2" />
			</div>
		</div>
	);
}

// const imagesContaier2 = useRef(images)

// const [gatewayAnimateState, setGatewayAnimateState] = useState(false)

// const imagesHTML: NodeListOf<Element> = document.querySelectorAll('.wrapper .images .image')
// const touchEnd = () => {
// 	setGatewayAnimateState(false)
// 	imagesHTML.forEach(img => img.classList.remove('animate-paused'));
// }
// const touchStart = () => {
// 	setGatewayAnimateState(true)
// 	imagesHTML.forEach(img => img.classList.add('animate-paused'));
// }
// useEffect(() => {
// 	const imagesContainer = document.querySelector('.wrapper .images');
// 	if (!imagesContainer) return; // Prevent errors if the element is not found
// 	console.log("The image container",imagesContainer)

// 	imagesContainer.addEventListener("touchstart", touchStart)
// 	imagesContainer.addEventListener("touchend", touchEnd)
// 	imagesContainer.addEventListener("mouseover", touchStart)
// 	imagesContainer.addEventListener("mouseleave", touchEnd)

// 	return () => {
// 		imagesContainer.removeEventListener("touchstart", touchStart)
// 		imagesContainer.removeEventListener("touchend", touchEnd)
// 		imagesContainer.removeEventListener("mouseover", touchStart)
// 		imagesContainer.removeEventListener("mouseleave", touchEnd)
// 	}

// }, [])

// ${gatewayAnimateState ? 'animate-paused' : 'animate-running'}