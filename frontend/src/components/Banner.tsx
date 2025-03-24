// import { useEffect, useState } from 'react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./banner.css"
import { ReactElement, useState } from 'react';
import ImageProduct from './ImageProduct';

interface BannerPorps {
	images: {
		src: string;
		name: string;
	}[],
}

export function ImageSection({ images }: BannerPorps): ReactElement<any | void, any | void> {
	const [isProduct, setIsProduct] = useState(false)
	const [selectedImage, setSelectedImage] = useState({ src: '', name: '' });

	const renderProductPortal = (e: React.MouseEvent<HTMLButtonElement>) => { 
	  const imgElement = e.target as HTMLImageElement
	  
	  if (imgElement.tagName === 'IMG') {
		const src = imgElement.src
		const name = imgElement.alt
		
		console.log(src, name)
  
		setSelectedImage({ src, name })
		setIsProduct(true)
	  }
	};
	

	return (
		<div className={`images`}>
			{images.map(({ src, name }, index) => {
				return (
					<div className='image h-full' key={index}>
						<button onClick={e => renderProductPortal(e) } >
							<img src={src} alt={name} className='h-50 max-w-50' />
						</button>
						{isProduct && (
							<ImageProduct
							  isProduct={isProduct}
							  src={selectedImage.src}
							  name={selectedImage.name}
							  setIsProduct={setIsProduct}
							/>
						  )}
					</div>
				);
			})}
		</div>
	);
}

export default function Banner({ images }: BannerPorps) {
	// const [imageListState, setImageListState] = useState(images)


	gsap.registerPlugin(useGSAP);
	gsap.registerPlugin(ScrollTrigger)

	useGSAP(() => {
		const wraperHTML: HTMLElement = document.querySelector(".wrapper")!;
		

		const imageElementsList: HTMLElement[] = gsap.utils.toArray(".image")

		const scrollableWidth: number = wraperHTML?.scrollWidth
		const imageFraction: number = scrollableWidth / imageElementsList.length

		ScrollTrigger.config({
			limitCallbacks: true,
			ignoreMobileResize: true
		});


		gsap.set(".image", {
			x: (i) => i * imageFraction
		  });

		const animation = gsap.to(".wrapper", {
			x: `-=${scrollableWidth}`,
			duration: imageElementsList.length,
			ease: "none",
			modifiers: {
				x: gsap.utils.unitize(x => parseFloat(x) % (imageElementsList.length * imageFraction)) 
			},
			repeat: -1
		});



		// ScrollTrigger.create({
		// 	trigger: ".banner-wrapper",
		// 	scroller: ".banner-wrapper",
		// 	start: "left left",
		// 	// end: "=+3000",
		// 	// end: () => `+=${scrollableWidth/2}` ,
		// 	end: () => "+=" + scrollableWidth,
		// 	scrub: 1,
		// 	markers: true,
		// 	horizontal: true,
		// });

		return () => {
			animation.kill();
		};
	}, [])

	return (
		<div className='banner-wrapper h-full flex items-center'>
			<div className='wrapper flex items-center justify-center'>
				<ImageSection images={images} />
				<ImageSection images={images} />

			</div>
		</div>
	);
}