import ENVIRONMENT from '../../config/environment.js'

const corsOptions = {
    origin: `${process.env.FRONTENDURL}`,
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}
export default corsOptions