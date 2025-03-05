import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { FaCartShopping, FaBars } from "react-icons/fa6";
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { DropdownMenuCheckboxes } from "../components/DropdownNavbar"

const Navbar = () => {

    const [isVisible, setIsVisible] = useState(true)
    const [dropdownState, setDropdownState] = useState(false)
    const [lastScrollPosition, setLastScrollPosition] = useState(0)

    const handleScroll = (): void => {
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

        console.log("Is it visible? ", isVisible)

        console.log("Current scroll thing ", window.pageYOffset)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollPosition])

    const navClasses = {
        linkClass: "text-blue-500 hover:text-blue-700 font-medium px-2 py-1 rounded-md hover:bg-gray-100 text-lg"
    }

    // ${isVisible ? 'translate-y-0' : 'transform -translate-y-full'}

    return (
        <div className="w-full z-100 bg-transparent absolute top-0 left-0 right-0">
            <nav className={`bg-transparent w-full h-15 text-white flex justify-between items-center px-4 py-2 ${isVisible ? 'translate-y-0' : 'transform -translate-y-full'}`}>
            <DropdownMenuCheckboxes />
            <Link className={`${navClasses.linkClass}`} to="/">
                <img className="h-10 w-40" alt="Logo de la empresa" src="/LOGO.png" />
            </Link>
            <Link to={"/cart"} className={`${navClasses.linkClass}`}>
                <FaCartShopping  />
            </Link>
            </nav>
            <div className={`w-full h-10 bg-red-400 ${dropdownState ? 'block' : 'hidden'}`}></div>
        </div>
    )
}

export default Navbar

