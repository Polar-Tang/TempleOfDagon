import multer from "multer"
import path from "path"
import { fileURLToPath } from 'url';
import { createProductController, deleteProductController, getAllProductController, getProductByIdController, updateProductController } from '../controllers/product.controller.js';
import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import cors from 'cors';
import corsOptions from "../helpers/utils/corsOptions.js";
import ENVIRONMENT from "../config/environment.js";

const productRouter = express.Router()
console.log("The main module", process.mainModule)


const storage = multer.diskStorage({
  destination: `./uploads`,
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    console.log(file.originalname,  )
    
    const allowedExtensions = ['.jpg', '.png', '.jpeg'];
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error('Only image files are allowed!'));
    }

    const uniqueId = Math.round(Math.random() * 1E9) + '-' + Math.round(Math.random() * 1E9);
    const completeFileName = uniqueId + ext
    
    console.log("Complete file name:", completeFileName);
    cb(null, completeFileName);
  }
});
// const storage = multer.memoryStorage()
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});
productRouter.get('/', getAllProductController)
productRouter.post('/', authMiddleware(['admin', 'user']), upload.any(), createProductController)
productRouter.options('/', cors(corsOptions))

productRouter.get('/:id', getProductByIdController)
productRouter.delete('/:id', authMiddleware(['admin', 'user']), deleteProductController)
productRouter.put('/:id',  authMiddleware(['admin', 'user']), updateProductController)
productRouter.options('/:id', cors(corsOptions))



export default productRouter