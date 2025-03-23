// import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import '../output.css'
import Navbar from '../components/Navbar'
// import { getParticleSystem } from './getParticleSystem'
// import * as THREE from "three";
// import getLayer from "../libs/bobbyroe/getLayer.js";
// import { OrbitControls } from 'jsm/controls/OrbitControls.js";
// const w = window.innerWidth
// const h = window.innerHeight

function Hell() {
	gsap.registerPlugin(useGSAP);

	useGSAP(() => {
		const tl = gsap.timeline({ defaults: { duration: 0.2 } });

		tl.fromTo(
			'.demon-eyes',
			{ opacity: 0, scaleY: 0 },
			{ opacity: 1, scaleY: 1, duration: 1, ease: "power2.out" }
		)
		tl.fromTo('.punch', { scale: 0 }, { scale: 1 , duration: 0.2});

		tl.fromTo(
			'.speed-line',
			{ opacity: 0, scaleY: 0, transformOrigin: "center" },
			{ opacity: 1, scaleY: 1.5, duration: 0.2, stagger: 0.05, ease: "power2.out" }
		), '<'

	});

	return (
		<>
			<Navbar/>
			<div className="w-full h-screen overflow-hidden relative flex items-center justify-center h-screen w-screen bg-white">
				<div className='punch-container absolute top-1/2 left-[70%] -translate-y-1/8'>
					<div className="speed-line absolute w-1 h-52 bg-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-0"></div>
					<div className="speed-line absolute w-1 h-52 bg-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-15"></div>
					<div className="speed-line absolute w-1 h-52 bg-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-30"></div>
					<div className="speed-line absolute w-1 h-52 bg-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
					<div className="speed-line absolute w-1 h-52 bg-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-15"></div>
					<div className="speed-line absolute w-1 h-52 bg-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-30"></div>
					<div className="speed-line absolute w-1 h-52 bg-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>

					<img src="/punch_to_face.png" className="z-4 top-1/2 punch w-60 h-50" />
				</div>
			</div>
		</>
	);
}


export default Hell