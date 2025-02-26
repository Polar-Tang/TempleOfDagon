import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

const About = () => {
    gsap.registerPlugin(useGSAP);

	useGSAP(() => {
		const tl = gsap.timeline({ defaults: { duration: 1 } });

		tl.fromTo(
			'.second-header',
			{ opacity: 0, scaleY: 0 },
			{ opacity: 1, scaleY: 1, duration: 1, ease: "power2.out" }
		)

		tl.fromTo('.casket-text', { opacity: 0 }, { opacity: 1 ,  stagger: 0.05, duration: 0.5});
		tl.fromTo(
			'.casket-img',
			{ opacity: 0, x: "-100vw" },
			{ opacity: 1, x: "0", duration: 0.5, stagger: 0.05, ease: "power2.out" }, '<'
		)

        tl.fromTo('.pet-text', { opacity: 0 }, { opacity: 1 ,  stagger: 0.05, duration: 0.5});
		tl.fromTo(
			'.pet-img',
			{ opacity: 0, x: "100vw" },
			{ opacity: 1, x: "0", duration: 0.5, stagger: 0.05, ease: "power2.out" }, '<'
		)
	});
    
    return (
        <div className='bg-black w-full flex flex-col items-center text-center px-8 py-10'>
            <h2 className='second-header font-Vollkorn text-white text-4xl mb-6'>
                Tenemoss los productos que necesitas...
            </h2>
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="flex flex-col items-center">
                    <h4 className="casket-text text-blue-500 text-xl mb-2 font-Castoro">Ataúdes</h4>
                    <img src='/casketmaker.jpg' className="casket-img w-full rounded-lg" />
                </section>
                <section className="flex flex-col items-center">
                    <h4 className="pet-text text-blue-500 text-xl mb-2">Mascotas</h4>
                    <img src='/coraline_cat.webp' className="pet-img w-full rounded-lg" />
                </section>
            </div>
        </div>
    );
};


export default About