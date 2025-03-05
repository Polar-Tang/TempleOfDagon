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
		imagesHTML.forEach(img => img.classList.remove('animate-paused'));
	}
	const touchStart = () => {
		setGatewayAnimateState(true)
		imagesHTML.forEach(img => img.classList.add('animate-paused'));
	}
	useEffect(() => {
		const imagesContainer = document.querySelector('.wrapper .images'); // Get the main image wrapper
  		if (!imagesContainer) return; // Prevent errors if the element is not found

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


	console.log(imagesHTML)


	return (
		<div className={`images ${gatewayAnimateState ? 'animate-paused' : 'animate-running'}`}>
			{images.map(({ src, name }) => (
				<div className='image'>
					<img src={src} alt={name} />
				</div>
			))}
		</div>
	);
}

export default function Banner({ images }: BannerPorps) {
	return (
		<div className='banner-wrapper'>
			<div className='wrapper'>
				<ImageSection images={images} />
				<ImageSection images={images} />
			</div>
		</div>
	);
}