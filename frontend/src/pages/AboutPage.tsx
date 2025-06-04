import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Badge } from "@/components/ui/badge"
import { Globe } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const stats = [
    { number: "500+", label: "Happy Clients" },
    { number: "50+", label: "Team Members" },
    { number: "10+", label: "Years Experience" },
    { number: "99%", label: "Success Kills" },
]



export default function AboutPage() {
    const heroRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)
    const valuesRef = useRef<HTMLDivElement>(null)
    const teamRef = useRef<HTMLDivElement>(null)
    const storyRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations
            gsap.fromTo(".hero-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })

            gsap.fromTo(
                ".hero-subtitle",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" },
            )

            // Stats counter animation
            gsap.fromTo(
                ".stat-number",
                { textContent: 0 } as gsap.TweenVars,
                {
                    textContent: (_: number, target: HTMLElement) => target.getAttribute("data-number"),
                    duration: 2,
                    ease: "power2.out",
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                } as gsap.TweenVars,
            )

            // Values cards stagger animation
            gsap.fromTo(
                ".value-card",
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: valuesRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                },
            )

            // Team cards animation
            gsap.fromTo(
                ".team-card",
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: teamRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                },
            )

            // Story section parallax
            gsap.to(".story-bg", {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-[url(/images/banner.png)] md:bg-[url(/images/md_banner.png)] bg-cover bg-center bg-no-repeat overflow-hidden text-white">
                <div className="absolute inset-0 " />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <Badge variant="outline" className="mb-6 text-white">
                            <Globe className="w-4 h-4 mr-2" />
                            Planning to conqueer the world
                        </Badge>
                    </motion.div>

                    <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Building the Future
                    </h1>

                    <p className="hero-subtitle text-xl md:text-2xl text-secondary max-w-3xl mx-auto mb-8">
                        This is not a website… it's the hellsite, and we don't have a backend, we have a dead end. Our hell site comunicates with the dead end through http lovecraft so we can bring you our best terrifying service.
                        Suffer it, and we wish them the worst of luck
                    </p>


                </div>
            </section>

            <section ref={statsRef} className="py-20 bg-primary/50 relative">
                {/* Add a decorative top shape */}
                <div className="absolute top-0 left-0 w-full h-16 bg-primary -skew-y-1 origin-top-left"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                    <span className="stat-number" data-number={stat.number.replace(/\D/g, "")}>
                                        0
                                    </span>
                                    <span>{stat.number.replace(/\d/g, "")}</span>
                                </div>
                                <p className="text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section ref={storyRef} className="relative py-32 overflow-hidden">
                <div className="story-bg absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Story</h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="text-xl text-muted-foreground"
                            >Our mission is more antique than the human vision. We recruit people for join us and wait for the coming of our master </motion.p>

                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="prose prose-lg max-w-none text-center"
                        >
                            <p className="text-lg leading-relaxed mb-6 value-card">
                                We pray for gods which their names are ignored. It's more than beliefs, they are presages of the world
                            </p>
                            <p className="text-lg leading-relaxed value-card">
                                Today, we continue to push boundaries, embrace the Deep Ones, and speeding up the relentless world future. Our beginning is the world's end.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>


        </div>
    )
}
