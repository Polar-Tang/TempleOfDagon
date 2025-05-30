import multer from "multer"
import { fileURLToPath } from 'url'
import { createProductController, deleteProductController, getAllProductController, getProductByIdController, updateProductController, createCommentController, responseCommentController } from '../controllers/product.controller.js'
import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import cors from 'cors'
import corsOptions from "../helpers/utils/corsOptions.js"
import ENVIRONMENT from "../config/environment.js"

const productRouter = express.Router()
console.log("The main module", process.mainModule)

const buffer = multer.memoryStorage()
const upload = multer({
  storage: buffer,
  // limits file storage
  limits: {
    fileSize: 5 * 1024 * 1024
  },
})

productRouter.get('/', getAllProductController)
productRouter.post('/', authMiddleware(['admin', 'user']), upload.single('file'), createProductController)
productRouter.options('/', cors(corsOptions))

productRouter.get('/:id', getProductByIdController)
productRouter.delete('/:id', authMiddleware(['admin', 'user']), deleteProductController)
productRouter.post('/:id',  authMiddleware(['admin', 'user']), createCommentController)
productRouter.put('/:id', authMiddleware(['admin', 'user']), updateProductController)
productRouter.options('/:id', cors(corsOptions))

productRouter.post('/post/:id',  authMiddleware(['admin', 'user']), responseCommentController)
productRouter.options('/post/:id', cors(corsOptions))

export default productRouter