import express from 'express'
import { createProductController, deleteProductController, getAllProductController, getProductByIdController, updateProductController } from '../controllers/product.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import cors from 'cors'
import corsOptions from '../helpers/utils/corsOptions.js'

const productRouter = express.Router()

productRouter.get('/', getAllProductController)
productRouter.post('/', authMiddleware(['admin']), createProductController)
productRouter.options('/', cors(corsOptions))

productRouter.get('/:id', getProductByIdController)
productRouter.delete('/:id', authMiddleware(['admin']), deleteProductController)
productRouter.put('/:id',  authMiddleware(['admin']), updateProductController)
productRouter.options('/:id', cors(corsOptions))



export default productRouter