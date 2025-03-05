import express from 'express'
import cors from 'cors'
import corsOptions from '../utils/corsOptions.js'
import { newProductController } from '../controllers/product.controller.js'


const authRouter = express.Router()


authRouter.post('/newproduct', newProductController)

export default authRouter