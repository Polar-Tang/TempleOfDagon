import { createContext, useState } from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AppSidebar } from '@/components/menus/SideBar'
import type { LayoutContextProps, ParentProps } from '@/types/ContextTypes'

export const LayoutContext = createContext({} as LayoutContextProps)

export const LayoutProvider = ({ children }: ParentProps) => {

    const [isSingleProduct, setisSingleProduct] = useState<boolean>(false)

    return (
        <LayoutContext.Provider value={{
            isSingleProduct,
            setisSingleProduct
        }}>
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
