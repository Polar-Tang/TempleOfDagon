import React, { useContext, useEffect } from 'react'
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ProductSearchContext } from '@/context/ProductSearchContext'
import ProductsMock from '@/mocks/productsMock'
import { BodyResponse } from '@/types/bodyResponse'
// import { LayoutContext } from '@/context/LayoutContext'
// import ProductsNavbar from './menus/ProductsNavbar'

const SecondNavbarStore = ({ children }: { children: React.ReactNode }) => {
    const { setProductsState, productsState, setIsFilter, setMemoProductState, memoProductState, isFilter } = useContext(ProductSearchContext)
    // console.log("Children", setProductsState(searchIpunt?.value))

    const fetchAllProducts = async (): Promise<BodyResponse> => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`)
        const data = await response.json()
        setProductsState(data.payload.ProductSearched);
        return data
    }


    console.log("Memo products: ", memoProductState)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const results = ProductsMock.filter((product) => {
            console.log("Value ", value)
            return product.title.toLowerCase().includes(value.toLowerCase())
        })
        const resultsByFilter = memoProductState.filter((product) => {
            console.log("Value ", value)
            return product.title.toLowerCase().includes(value.toLowerCase())
        })

        if (!Boolean(value)) {
            if (memoProductState.length > 0 && isFilter) {
                setProductsState(memoProductState)
                return
            } else {
                setProductsState(ProductsMock)
                return
            }
        }
        if (isFilter) {
            setProductsState(resultsByFilter)
            return
        }
        if (!isFilter) {
            setProductsState(results)
            return
        }
        console.log("VALUE ",)
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
                            <select
                                className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 border border-gray-700 text-white text-xs rounded px-2 py-1 focus:outline-none"
                                onChange={(e) => {
                                    const value = e.target.value
                                    if (value === "all") {
                                        fetchAllProducts()
                                    } else {
                                        const results = ProductsMock.filter(
                                            (product) => product.category && product.category.toLowerCase() === value.toLowerCase()
                                        )
                                        setMemoProductState(results)
                                        setProductsState(results)
                                        setIsFilter(true)
                                    }
                                }}
                            >
                                <option value="all">All</option>
                                <option value="Magic">Magic</option>
                                <option value="stone">Stone</option>
                                <option value="meat">Meat</option>
                                <option value="art">Art</option>
                                <option value="metal">Metal</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        </>

                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 justify-items-center`
                    }>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SecondNavbarStore