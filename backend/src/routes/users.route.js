import express from 'express'
import { getUserController, updateUserController } from "../controllers/users.controller.js"
import corsOptions from '../helpers/utils/corsOptions.js'
import cors from "cors"
import authMiddleware from '../middlewares/auth.middleware.js'
import multer from "multer"
import path from "path"


const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {

    const ext = path.extname(file.originalname).toLowerCase();
    
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

const userRouter = express.Router()

userRouter.get('/:name', getUserController)
userRouter.options('/:name', cors(corsOptions))


// userRouter.get('/:name/detail', getUserDetailController)


userRouter.put('/avatar', authMiddleware(['admin', "user"]), upload.single('file'), updateUserController)
userRouter.options('/avatar', cors(corsOptions))


export default userRouter