import React, { useContext, useEffect } from 'react'
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import useProducts from '@/hooks/useProducts'
import ProductsMock from '@/mocks/productsMock'
import ProductsNavbar from './menus/ProductsNavbar'
import BreadCrumbsNav from './menus/BreadCrumbsNav'
import { LayoutContext } from '@/context/LayoutContext'

const SecondNavbarStore = ({ children }: { children: React.ReactNode}) => {
    const { setProductsState, productsState } = useProducts()
    // console.log("Children", setProductsState(searchIpunt?.value))
    const {isSingleProduct} = useContext(LayoutContext)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const results = ProductsMock.filter((product) => {
            return product.title.toLowerCase().includes(value.toLowerCase())
        })

        setProductsState(results)
        if (!value) {
            setProductsState(ProductsMock)
        }
        console.log("Results", results, "for value", value)
    }

    // This function is utilized in a input and is changing the productsState to results, however this render only once. I need to use a useEffect to render the products assuming every change. But remember that
    useEffect(() => {
        handleSearch
    }, [productsState])

    return (
        <div className="min-h-screen w-screen bg-black text-white">
            <header className="border-b border-gray-800 top-0 w-full h-15 px-4 py-2">
            </header>
            <main className="container mx-auto px-4 py-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        {
                            isSingleProduct
                                ?
                                <> <div className="relative w-full md:w-auto flex-1 max-w-3xl">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <Input
                                        placeholder="Search Repositories and Projects..."
                                        className="pl-10 bg-gray-900 border-gray-700 h-10 w-full"
                                        onChange={handleSearch}
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs text-gray-400">
                                        <span>⌘</span>
                                        <span>K</span>
                                    </div>
                                </div>
                                    <ProductsNavbar />
                                </>

                                : <BreadCrumbsNav />}
                    </div>

                    <div className={ isSingleProduct 
                    ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 justify-items-center`
                    : `grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-[1fr,_2fr]`}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SecondNavbarStore