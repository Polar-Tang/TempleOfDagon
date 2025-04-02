import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'

const CardPurchaseOptions = () => {
    return (
        <Card>
            <CardContent className="p-6 space-y-6">
                <div>
                    <h3 className="text-green-500 font-medium text-lg">Llega gratis mañana</h3>
                    <p className="text-blue-500 hover:underline cursor-pointer">Más formas de entrega</p>
                </div>

                <div>
                    <p className="text-green-500 font-medium">
                        Retirá gratis a partir del viernes en correos y otros puntos
                    </p>
                    <p className="text-gray-600">Comprando dentro de las próximas 10 h 2 min</p>
                    <p className="text-blue-500 hover:underline cursor-pointer">Ver en el mapa</p>
                </div>

                <div>
                    <p className="font-medium text-lg">¡Última disponible!</p>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6">Comprar ahora</Button>

                <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50 py-6">
                    Agregar al carrito
                </Button>

                <div className="pt-4">
                    <p className="text-gray-600">
                        Vendido por <span className="text-blue-500 font-medium">LIBROSDBL</span>
                    </p>
                    <p className="text-gray-600">MercadoLíder | +1000 ventas</p>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 15.5C14.21 15.5 16 13.71 16 11.5V6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6V11.5C8 13.71 9.79 15.5 12 15.5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M4.34 9.34003H19.66"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8.34 17.3401H15.66"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 15.5V19.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>1 meses de garantía de fábrica.</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default CardPurchaseOptions