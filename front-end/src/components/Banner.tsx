import { useEffect, useState } from 'react';

interface BannerPorps {
	images: {
		src: string;
		name: string;
	}[];
}

export function ImageSection({ images, }: BannerPorps) {
	const [gatewayAnimateState, setGatewayAnimateState] = useState(false)

	const imagesHTML: NodeListOf<Element> = document.querySelectorAll('.wrapper .images .image')
	const touchEnd = () => {
		setGatewayAnimateState(false)
		console.log("TOUCH OUT")
		imagesHTML.forEach(img => img.classList.remove('animate-paused'));
	}
	const touchStart = () => {
		setGatewayAnimateState(true)
		console.log("TOUCH IN")
		imagesHTML.forEach(img => img.classList.add('animate-paused'));
	}
	useEffect(() => {
		const imagesContainer = document.querySelector('.wrapper .images');
  		if (!imagesContainer) return; // Prevent errors if the element is not found
		console.log("The image container",imagesContainer)

		imagesContainer.addEventListener("touchstart", touchStart)
		imagesContainer.addEventListener("touchend", touchEnd)
		imagesContainer.addEventListener("mouseover", touchStart)
		imagesContainer.addEventListener("mouseleave", touchEnd)

		return () => {
			imagesContainer.removeEventListener("touchstart", touchStart)
			imagesContainer.removeEventListener("touchend", touchEnd)
			imagesContainer.removeEventListener("mouseover", touchStart)
			imagesContainer.removeEventListener("mouseleave", touchEnd)
		}

	}, [])

	return (
		<div className={`images ${gatewayAnimateState ? 'animate-paused' : 'animate-running'}`}>
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
				<ImageSection images={images} />
				<ImageSection images={images} />
			</div>
		</div>
	);
}