import ENVIRONMENT from '../../config/environment.js'

const corsOptions = {
    origin: `${process.env.FRONTENDURL}`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization', "Credentials", "X-Basket-Id"],
    exposedHeaders: ['X-Basket-Id', "X-Order-Id", ],
    "Access-Control-Allow-Headers": "GET, POST, PUT, DELETE"
    // preflightContinue: false, 
}
export default corsOptions