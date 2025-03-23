import { Button } from "@/components/ui/button"
import ReactDOM from 'react-dom';
interface ImageProductProps {
  isProduct: boolean;
  name: string;
  source: string;
  setIsProduct: React.Dispatch<React.SetStateAction<boolean>>
}

const ImageProduct = ({isProduct, source, name, setIsProduct}: ImageProductProps)  => {
  if (!isProduct) return null;

  return ReactDOM.createPortal(
    <div className={` ${isProduct ? 'fixed' : 'hidden'} w-full h-dvh top-0 left-0 z-10 flex items-center`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}>
      <div className="w-full max-w-md mx-auto bg-white">
        {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950"></div>  */}
          <div className="flex justify-end p-2">
            <Button onClick={() => setIsProduct(false)}>Close</Button>
          </div>
          <img
            src={source}
            alt="Product Image"
            width={600}
            height={400}
            className="w-full h-64 object-cover"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />
          <div className="p-4 space-y-2">
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-500 dark:text-gray-400">This is a description of the product.</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">$49.99</span>
              <Button>Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>,
    document.body
  )
}

export default ImageProduct