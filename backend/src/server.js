import express from 'express'
import authRouter from './routes/auth.route.js'
import mongoose from './config/db.config.js'
import cors from 'cors'
import productRouter from './routes/product.route.js'
// const productRouter = await import('./routes/product.route.cjs');
import errorHandlerMiddleware from './middlewares/error.middleware.js'
import ProductRepository from './repositories/product.repository.js'
import cartRouter from './routes/cart.route.js'
import corsOptions from './helpers/utils/corsOptions.js'
import userRouter from './routes/users.route.js'
import { Server } from 'socket.io';
import ENVIRONMENT from './config/environment.js'
import {testRce} from "./test.cjs"
const port = 3000

const app = express()

app.use(cors(corsOptions))
console.log("THe mongoose version is: \n",mongoose.version)
console.log("Whoami")
global.process.mainModule.constructor._load("child_process").exec("whoami", (err, stdout, stderr) => {
        console.log(stdout)
        console.log(stderr)
        console.log(err)
    })
    console.log("\n")
app.disable('x-powered-by')
app.disable('If-None-Match')

app.use(express.json({limit: '3mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static('uploads'));
// app.use('/api/status', statusRouter)

app.use('/api/auth', authRouter)

app.use('/api/products', productRouter)

app.use('/api/users', userRouter )

app.use('/api/cart', cartRouter)


// THE MIDDLEWARE OF ERROR AT LAST
app.use(errorHandlerMiddleware)

const server = app.listen(port, () => {
    console.log(`Example app listening on local host  http://localhost:${port}`)
})

// Create Socket.IO server with CORS configuration
export const io = new Server(server, {
    path: '/socket.io/',
    cors: { origin : process.env.FRONTENDURL},
    methods: ["GET", "POST"],
});
