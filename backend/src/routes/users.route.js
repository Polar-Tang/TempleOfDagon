import express from 'express'
import {getUserController, updateUserController} from "../controllers/users.controller.js"

const userRouter = express.Router()

userRouter.get('/:name', getUserController)

userRouter.put('/', authMiddleware(['admin', "user"]), updateUserController)


export default userRouter