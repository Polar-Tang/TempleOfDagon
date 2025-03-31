import express from 'express'
import statusRouter from './routes/status.route.js'
import authRouter from './routes/auth.route.js'
import mongoose from './config/db.config.js'
import cors from 'cors'
import productRouter from './routes/product.route.js'
import errorHandlerMiddleware from './middlewares/error.middleware.js'
// import pool from './config/dbMysql.config.js'
import ProductRepository from './repositories/product.repository.js'
import cartRouter from './routes/cart.route.js'
import corsOptions from './helpers/utils/corsOptions.js'
import Product from './models/product.models.js'
import createProducts from './helpers/scripts/seedMongod.js'
// import userRouter from './routes/users.route.js'



const port = 3000
const app = express()

app.use(cors(corsOptions))

app.disable('x-powered-by')
app.disable('If-None-Match')

app.use(express.json({limit: '3mb' }))
app.use(express.urlencoded({ extended: true }))

// app.use('/api/status', statusRouter)

app.use('/api/auth', authRouter)

app.use('/api/products', productRouter)

// app.use('/api/users', userRouter )

app.use('/api/cart', cartRouter)


// THE MIDDLEWARE OF ERROR AT LAST
app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log(`Example app listening on local host  http://localhost:${port}`)
})