import express from 'express'
import cors from 'cors'
import corsOptions from '../utils/corsOptions.js'
import { ping, loginController } from '../controllers/auth.controller.ts'


const authRouter = express.Router()

authRouter.get('/ping', ping)

authRouter.post('/login', loginController)

export default authRouter