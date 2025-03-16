// import { useEffect, useState } from 'react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./banner.css"
import { useRef} from 'react';

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

	gsap.registerPlugin(useGSAP);
	gsap.registerPlugin(ScrollTrigger)

	useGSAP(() => {
		const wrapper = wrapperRef.current;
		console.log("Wrapper: ", wrapperRef)
		
		ScrollTrigger.defaults({
			scroller: document.documentElement
		  });
		  
		  ScrollTrigger.config({
			limitCallbacks: true,
			ignoreMobileResize: true
		  });
		  
	
			const images: HTMLElement[] = gsap.utils.toArray(".image")

			console.log("Wrapper: ", wrapper)
			console.log("Images array", images)
	
			wrapper?.appendChild(images[0].cloneNode(true))

			const totalWidth = images[0].offsetWidth;

			// Infinite animation
			const animation = gsap.to(".wrapper", {
			  x: -totalWidth,
			  duration: 20,
			  ease: "none",
			  repeat: -1
			});

			ScrollTrigger.create({
				trigger: ".banner-wrapper",
				start: "top top",
				end: () => "+=" + wrapper?.scrollWidth, // or something larger than your scroll width
				scrub: 1,
				onUpdate: (self) => {
				  // Control the speed of the animation based on scroll direction
				  const scrollDirection = self.getVelocity() / 1000; // Velocity of scrolling
				  gsap.to(animation, { timeScale: Math.min(Math.max(scrollDirection, 0.1), 5) }); // Adjust the scale for more control
				}
			  });

			  images.forEach(image => {
				
				ScrollTrigger.create({
				trigger: image,

					onUpdate: (self) => {
					  console.log(self.progress, " of ", image)
					}
				  });
			  })
		  
			  return () => {
				animation.kill();
				// ScrollTrigger.kill();
			  };
		// 	let scrollTween = gsap.to(wrapper, {
		// 		x: wrapper ? -(document.documentElement.clientWidth) : 0,
		// 		ease: "none",
		// 		scrollTrigger: {
		// 			trigger: wrapper,
		// 			start: "top top",
		// 			end: `+=${wrapper ?  document.documentElement.clientWidth: 0}`,
		// 			pin: true,
		// 			scrub: 0.5,
		// 		  }
		// 	});
		// 	console.log("The scroll tween: ", scrollTween)
		// 	let acc: number = 0
		// 	images.forEach(image => {
		// 		console.log("THis is the image: ", image, acc++)
		// 		gsap.to(image, {
		// 			scrollTrigger: {
		// 				trigger: wrapper,
		// 				markers: true,
		// 				start: "top top",
		// 				containerAnimation: scrollTween,
		// 				end: `+=${wrapper ?  document.documentElement.clientWidth: 0}`,
	
		// 			}
		// 		})
		// 	})

		// if (!wrapper) return;
	}, [])

	return (
		<div className='banner-wrapper h-full flex items-center'>
			<div className='wrapper flex items-center justify-center'>
				<ImageSection images={images} index="1" />
				<ImageSection images={images} index="2" /> 
			</div>
		</div>
	);
}