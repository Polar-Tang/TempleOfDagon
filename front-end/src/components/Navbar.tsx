import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {

    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollPosition, setLastScrollPosition] = useState(0)

    const handleScroll = () => {
        console.log("Listen carefully scrolling")
        const currentScrollPosition = window.scrollY || window.pageYOffset
        if (currentScrollPosition > lastScrollPosition) {
            setIsVisible(false)
        } else {
            setIsVisible(true)
        }

        setLastScrollPosition(currentScrollPosition)
    }

    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        console.log("Is it visible? ",isVisible)

        console.log("Current scroll thing ", window.pageYOffset)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollPosition])

    const navClasses = {
        linkClass: "text-blue-500 hover:text-blue-700 font-medium px-2 py-1 rounded-md hover:bg-gray-100 text-lg"
    }

    return (
        <NavigationMenu className={`bg-transparent text-white p-4 fixed top-0 w-full transition-transform duration-300 z-50 ${isVisible ? 'translate-y-0' : 'transform -translate-y-full'
        }`}>
            <NavigationMenuList>
                <NavigationMenuItem className="flex justify-center justify-between w-full"> 
                    <Link to="/">
                        <NavigationMenuLink className={`${navClasses.linkClass}`} >
                            Home
                        </NavigationMenuLink>
                    </Link>
                    <Link to="/infierno">
                        <NavigationMenuLink className={`${navClasses.linkClass}`} >
                            Conoce a satanás
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navbar

