import React from 'react'

import BreadCrumbsNav from './menus/BreadCrumbsNav'
// import { LayoutContext } from '@/context/LayoutContext'
// import ProductsNavbar from './menus/ProductsNavbar'

const SecondNabvarProductStore = ({ children }: { children: React.ReactNode}) => {
 

    return (
        <div className="min-h-screen w-screen bg-black text-white">
            <header className="border-b border-gray-800 top-0 w-full h-15 px-4 py-2">
            </header>
            <main className="container mx-auto px-4 py-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <BreadCrumbsNav />
                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-[1fr,_2fr]`}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SecondNabvarProductStore