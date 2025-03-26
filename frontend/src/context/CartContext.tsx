import React, { createContext } from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import SidebarTrigger  from "@/components/buttons/SidebarTrigger"
import { AppSidebar } from "@/components/SideBar"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const CartContext = createContext("")

export interface LayoutProps {
    children: React.ReactNode
}

export const CartProvider = ({ children }: LayoutProps) => {

    const hello: string = "Auth provider is working"

    return (
        <CartContext.Provider value={
            hello
        }>
            <SidebarProvider>
                <div className="flex flex-col w-full">
                <AppSidebar /> 
                <Navbar/>
                    {children}
                    <Footer/>
                </div>
            </SidebarProvider>
        </CartContext.Provider>
    )
}

export default CartProvider
