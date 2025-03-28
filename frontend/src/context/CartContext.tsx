import React, { createContext } from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
// import SidebarTrigger  from "@/components/buttons/SidebarTrigger"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AppSidebar } from '@/components/menus/SideBar'

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
              <AppSidebar />  
                <div className="flex flex-col w-full">
                <Navbar/>
                    {children}
                <Footer/>
                </div>
            </SidebarProvider>
        </CartContext.Provider>
    )
}

export default CartProvider
