import { Link } from 'react-router-dom'

const BreadCrumbsNav = () => {
  return (
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link to={"/tienda"} className="text-blue-500 hover:underline">
          Volver al listado
          
        </Link>
        <span className="text-gray-500 mx-2">|</span>
        
        <div className="ml-auto flex gap-4">
          <Link to={"#"} className="text-blue-500 hover:underline">
            Compartir
          </Link>
        </div>
      </div>
  )
}

export default BreadCrumbsNav