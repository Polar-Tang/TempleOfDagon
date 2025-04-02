<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr,_2fr] gap-8">
        {/* Left Column - Product Images */}
        <div className="space-y-4">
          <div className="border rounded-md overflow-hidden bg-white">
            </div>

        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-gray-100 text-gray-700">
              Nuevo
            </Badge>
            <span className="text-gray-500 text-sm">| +50 vendidos</span>
            <button className="ml-auto text-gray-400 hover:text-blue-500">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          <h1 className="text-2xl font-bold">
            {title}
          </h1>

          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-500 ml-1">(1)</span>
          </div>

          <div className="pt-4">
            <div className="text-3xl font-bold">$ {price}</div>
            <div className="text-gray-600">
              en 6 cuotas de $ {price/6}<sup>04</sup>
            </div>
            <button className="text-blue-500 text-sm hover:underline mt-1">Ver los medios de pago</button>
          </div>

          <div className="pt-6">
            <h3 className="font-medium text-lg">Lo que tenés que saber de este producto</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex gap-2">
                <span>•</span>
                <span>Año de publicación: {updatedAt}</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Con índice: Sí</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Volumen del libro: Volumen Único</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Género: Literatura y ficción.</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Subgénero: Clásicos.</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <CardPurchaseOptions />
        </div>
      </div>
