// import { useEffect, useState } from 'react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./banner.css"
import { ReactElement, useRef, useState } from 'react';
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
	const wrapperRef = useRef<HTMLDivElement>(null);

	gsap.registerPlugin(useGSAP);
	
	useGSAP(() => {
		// const wraperHTML = wrapperRef.current;

		const scrollableWidth: number = 4000 // wraperHTML?.scrollWidth 
		const imageFraction: number = scrollableWidth / 20

		console.log("This are the scrollable width",scrollableWidth)
		ScrollTrigger.config({
			limitCallbacks: true,
			ignoreMobileResize: true
		});


		gsap.set(".image", {
			x: (i) => i * imageFraction
		  });

		const animation = gsap.to(".wrapper", {
			x: `-=${scrollableWidth}`,
			duration: 20,
			ease: "none",
			modifiers: {
				x: gsap.utils.unitize(x => parseFloat(x) % (20 * imageFraction)) 
			},
			repeat: -1
		});

		return () => {
			animation.kill();
		};
	}, [])

	return (
		<div className='banner-wrapper h-full flex items-center'>
			<div ref={wrapperRef} className='wrapper flex items-center justify-center'>
				<ImageSection images={images} />
				<ImageSection images={images} />

			</div>
		</div>
	);
}