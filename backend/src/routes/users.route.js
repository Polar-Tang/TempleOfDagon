import express from 'express'
import {getUserController, updateUserController} from "../controllers/users.controller.js"
import corsOptions from '../helpers/utils/corsOptions.js'


const userRouter = express.Router()

userRouter.get('/:name', getUserController)
userRouter.options('/:name', cors(corsOptions))


// userRouter.get('/:name/detail', getUserDetailController)


userRouter.put('/', authMiddleware(['admin', "user"]), updateUserController)
userRouter.options('/', cors(corsOptions))


export default userRouter