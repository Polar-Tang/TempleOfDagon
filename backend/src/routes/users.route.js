import express from 'express'
import {getUserController} from "../controllers/users.controller.js"

const userRouter = express.Router()

userRouter.get('/:name', getUserController)


export default userRouter