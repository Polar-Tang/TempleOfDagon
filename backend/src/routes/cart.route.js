import express from 'express'
import { addToCartController, eliminateProductCart, getAllCartProducts, checkoutController, checkoutRouterController, eliminateSessionCartController } from '../controllers/cart.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import corsOptions from '../helpers/utils/corsOptions.js'
import crypto from 'crypto'
import validateId from '../middlewares/valid_id.js';

const cartRouter = express.Router()

// cartRouter.use((req, res, next) => {
//     res.setHeader('X-Basket-Id', crypto.randomUUID());
//     next();
// });
cartRouter.use(cookieParser());

cartRouter.delete('/:_id', validateId, eliminateProductCart )
cartRouter.options('/:_id', cors(corsOptions))

cartRouter.post('/add', addToCartController)
cartRouter.options('/add', cors(corsOptions))

cartRouter.get('/', getAllCartProducts)
cartRouter.delete('/', eliminateSessionCartController)

cartRouter.options('/', cors(corsOptions))


cartRouter.post('/checkout', checkoutController)
cartRouter.options('/checkout', cors(corsOptions))

cartRouter.get('/checkout-router/:checkoutId', checkoutRouterController)
cartRouter.options('/checkout-router/:checkoutId', cors(corsOptions))


export default cartRouter