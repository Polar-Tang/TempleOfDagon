// import { useEffect, useState } from 'react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./banner.css"
import { ReactElement, useEffect, useState, createElement } from 'react';
import ImageProduct from './ImageProduct';

interface BannerPorps {
	images: {
		src: string;
		name: string;
	}[],
}

interface ImageProductProps {
	isProduct: boolean;
	name: string;
	src: string;
	setIsProduct: React.Dispatch<React.SetStateAction<boolean>>
  }

export function ProductPortal(
	{isProduct,
	src,
	name,
	setIsProduct,} : ImageProductProps
) {
	console.log({isProduct,
		src,
		name,
		setIsProduct,})
		useEffect(() => {
			const element = createElement(ImageProduct, {
				isProduct,
				src,
				name,
				setIsProduct,
			});
			console.log(element);
		}, []);
	
	
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
				// console.log(`Rendering image ${index + 1}: ${name}\n with src:\n ${src}`);
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
					total < 9 ? total++ : total = 0
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