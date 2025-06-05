import ENVIRONMENT from '../../config/environment.js'

const corsOptions = {
    origin: `${process.env.FRONTENDURL}`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization', "Credentials", "X-Basket-Id"],
    exposedHeaders: ['X-Basket-Id', "X-Preferences-Token"]
    // You do NOT need to set "Access-Control-Allow-Methods" or "Access-Control-Expose-Methods" manually here.
    // The 'methods' option is enough for CORS middleware (like 'cors' in Express) to set the correct headers.
}
export default corsOptions
