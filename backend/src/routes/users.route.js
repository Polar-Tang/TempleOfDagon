import express from 'express'
import {getUserController} from "../controllers/users.controller.ts"

const userRouter = express.Router()

userRouter.get('/:name', getUserController)
// userRouter.get('/:name/detail', getUserDetailController)



export default userRouter