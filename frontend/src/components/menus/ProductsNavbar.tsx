import { ChevronDown, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"

const ProductsNavbar = () => {
    return (
        <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="outline" className="text-gray-300 border-gray-700 bg-gray-900 flex items-center gap-2">
                <span>Sort by activity</span>
                <ChevronDown className="h-4 w-4" />
            </Button>

            <div className="flex items-center border border-gray-700 rounded-md overflow-hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none bg-gray-900 text-gray-300">
                    <Grid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none bg-gray-900 text-gray-300">
                    <List className="h-4 w-4" />
                </Button>
            </div>

            <Button className="ml-2 bg-white text-black hover:bg-gray-200 flex items-center gap-2">
                <span>Add New...</span>
                <ChevronDown className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default ProductsNavbar