import express from 'express'
import {postPingController} from '../controllers/status.controller.js' 
import testMiddleware from '../middlewares/test.middleware.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const statusRouter = express.Router()

statusRouter.get('/ping', testMiddleware, (req, res, next) => {
  console.log("Incoming Headers:", req.headers);
  next();
})

export default statusRouter