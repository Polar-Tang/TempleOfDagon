import express from 'express'
import { createProductController, deleteProductController, getAllProductController, getProductByIdController, updateProductController } from '../controllers/product.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import cors from 'cors'
import corsOptions from '../helpers/utils/corsOptions.js'
import multer from 'multer'
import path from 'path'


const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    console.log(file.originalname,  )
    
    const allowedExtensions = ['.jpg', '.png', '.jpeg'];
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error('Only image files are allowed!'));
    }

    const uniqueId = Math.round(Math.random() * 1E9) + '-' + Math.round(Math.random() * 1E9);
    const completeFileName = uniqueId + ext;
    
    console.log("Complete file name:", completeFileName);
    cb(null, completeFileName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

const productRouter = express.Router()

productRouter.get('/', getAllProductController)
productRouter.post('/', authMiddleware(['admin', 'user']), upload.single('file'), createProductController)
productRouter.options('/', cors(corsOptions))

productRouter.get('/:id', getProductByIdController)
productRouter.delete('/:id', authMiddleware(['admin', 'user']), deleteProductController)
productRouter.put('/:id',  authMiddleware(['admin', 'user']), updateProductController)
productRouter.options('/:id', cors(corsOptions))



export default productRouter