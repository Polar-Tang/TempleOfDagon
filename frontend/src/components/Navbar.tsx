import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { DropdownMenuCheckboxes } from "./menus/DropdownNavbar"
import SidebarTrigger from "@/components/buttons/SidebarTrigger"


const Navbar = () => {

    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollPosition, setLastScrollPosition] = useState(0)
    const navigator = useNavigate()
    const handleScroll = (): void => {
        const currentScrollPosition = window.scrollY || window.pageYOffset
        if (currentScrollPosition > lastScrollPosition) {
            setIsVisible(false)
        } else {
            setIsVisible(true)
        }

        setLastScrollPosition(currentScrollPosition)
    }
const naviteHome = () => { 
    navigator("/")
}

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        // console.log("Is it visible? ", isVisible)

        // console.log("Current scroll thing ", window.pageYOffset)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollPosition])



    // ${isVisible ? 'translate-y-0' : 'transform -translate-y-full'}

    return (
        <div className="fixed top-0 w-full z-20 bg-transparent absolute top-0 left-0 right-0">
            <nav className={`bg-transparent w-full h-15 text-white flex justify-between items-center px-4 py-2  ${isVisible ? 'translate-y-0' : 'hidden'}`}>
                <DropdownMenuCheckboxes />
                <img className="h-full w-50 scale-95 hover:scale-120" alt="Temple of Dagon" onClick={naviteHome} src="/images/logo.png" />
                <SidebarTrigger />
            </nav>
        </div>
    )
}

export default Navbar

