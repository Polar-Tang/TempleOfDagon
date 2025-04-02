import React, { createContext } from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AppSidebar } from '@/components/menus/SideBar'

export const LayoutContext = createContext("")

export interface LayoutProps {
    children: React.ReactNode
}

export const LayoutProvider = ({ children }: LayoutProps) => {

    const hello: string = "Auth provider is working"

    return (
        <LayoutContext.Provider value={
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
        </LayoutContext.Provider>
    )
}

export default LayoutProvider
