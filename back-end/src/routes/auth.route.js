import express from 'express'
import cors from 'cors'
import corsOptions from '../utils/corsOptions.js'
import { ping } from '../controllers/auth.controller.js'


const authRouter = express.Router()

authRouter.get('/ping', ping)

export default authRouter