import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Products } from "@/types/products"

// Sample product data


export default function ProductGrid({ products, seller_id, isOwnerState }: { products: Products, seller_id: string, isOwnerState: boolean }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
      {Object.values(products).length !== 0 ?
        products.map((product) => (
          <Card
            key={product._id}
            className="bg-gray-950 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
          >
            <div className="aspect-square relative bg-gray-900">
              <img src={product.image_url || "/placeholder.svg"} alt={product.title} className="object-cover" />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-white">{product.title}</h3>
                <Badge
                  // variant={product.sktatus === "Published" ? "default" : "outline"}
                  variant="outline"
                  className="bg-gray-800 text-white hover:bg-gray-700"
                >
                  Published
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{product.price}</span>
                {/* {product.status === "Published" && <span className="text-sm text-gray-400">{product.sales} sold</span>} */}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              { isOwnerState && <button className="text-sm text-gray-400 hover:text-white transition-colors">Edit</button>}
              <span className="text-gray-700">•</span>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">View</button>
              <span className="text-gray-700">•</span>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">Duplicate</button>
            </CardFooter>
          </Card>
        ))
        : <Card className="bg-zinc-900 border-zinc-800 text-white w-full">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No products</h2>
              <p className="text-zinc-400 mb-6">{seller_id} has no published products yet</p>

            </div>
          </CardContent>
        </Card>
      }
    </div>
  )
}
