import crypto from "crypto"
import CartProductRepository from "../repositories/cart.repository.js"
import ProductRepository from "../repositories/product.repository.js"
import AppError from "../helpers/errors/app.error.js"
import ResponseBuilder from "../helpers/builders/response.builder.js"
import CheckoutSessionRepository from "../repositories/checkout.repository.js"
import ChallengeBuilder from "../helpers/builders/challenge.builder.js"
import sendNotification from "../helpers/sockets/sendNotification.js"
import ENVIRONMENT from "../config/environment.js"

export const addToCartController = async (req, res, next) => {
    try {
        let cartId = req.cookies.cartId
        if (!cartId) {
            cartId = crypto.randomBytes(16).toString("hex")
            // process.env.IS_PROD 
            res.cookie("cartId", cartId, { httpOnly: true, secure: true, sameSite: "strict" })
        }
    
        const product = await ProductRepository.getProductByUnsanitizedInput(req.body)
        if (!product) {
            return next(new AppError("Producto not found", 404))
        }
        if (product.active === false ) {
            const NoSQLInotiff = new ChallengeBuilder()
            .setName("no-sqli")
            .setIsSolved(true)
            .setMessage("Buy disabled products")
            .setDescription("Add a product to cart through No-SQLI")
            .setKey("no-sqli") 
            .build()
            sendNotification(NoSQLInotiff)
        }
        const newProduct = await CartProductRepository.createProductCart(product, cartId)
        if (!newProduct) {
            const response = new ResponseBuilder()
                .setOk(true)
                .setStatus(200)
                .setMessage(`There's no more products`)
                .setPayload({
                    detail: ""
                })
                .build()
            return res.status(200).json({ response })
        }
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Product added`)
            .setPayload({
                detail: "A mistery product is added to the cart",
                ProductSearched: newProduct
            })
            .build()
        return res.status(200).json({ response })
    } catch (err) {
        console.log(err)
        return next(new AppError("Ocurrió un error, intenta denuevo luego", 500))
    }
}


export const eliminateProductCart = async (req, res, next) => {
    try {

        const { _id } = req.params
        console.log("The _id", _id)
        const basketId = req.cookies.cartId
    
        if (!basketId) {
            return next(new AppError("No session cart", 400))
        }
    
        if (!_id) {
            return next(new AppError("Bad parameter", 400))
        }
    
        const retriever = await CartProductRepository.deleteProductCart(_id, basketId)
        if (typeof retriever === "string") {
            return next(new AppError(retriever, 400))
        }
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`The product has been deleted successfully`)
            .setPayload({
                detail: retriever
            })
            .build()
        return res.status(200).json({ response })
    } catch(err){
        console.log(err)
        res.send("Error happened")
    }
}

export const getAllCartProducts = async (req, res, next) => {
    try {
        const basketId = req.cookies.cartId
        const productsDetail = await CartProductRepository.getAllProductsDetails(basketId)
        if (!productsDetail) {
            return next(new AppError("There's no cookie", 404))
        }
    
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Listing products`)
            .setPayload({
                detail: productsDetail
            })
            .build()
        return res.status(200).json({ response })
    } catch(err){
        console.error(err)
        return next(new AppError("Ocurrió un error, intenta denuevo luego", 500))
    }
}


export const checkoutController = async (req, res, next) => {
    const basketId = req.headers.basketId;
    
    if (!basketId) {
        return res.status(400).json({ message: "No cart session found" });
    }
    
    const {cartId,
    cardNumber,
    expiryMonth,
    expiryYear,
    cvv,
    address} = req.body

    const cardDetails = {cartId: cartId,
        cardNumber: cardNumber,
        expiryMonth: expiryMonth,
        expiryYear: expiryYear,
        cvv: cvv,
        address: address
    }
    CheckoutSessionRepository.createCheckoutSession(cardDetails)

    const orderId = crypto.randomBytes(16).toString("hex");

    const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Redirecting`)
            .build()
        return res.set('X-Order-Id', orderId).status(200).json({ response })
};

export const checkoutRouterController = async (req, res, next) =>  {
    const { checkoutId } = req.params;
    

    const session = await CheckoutSessionRepository.findCheckoutSession(checkoutId);
    if (!session) {
      return res.status(404).send('This page does not exist');
    }
    // session.basketId &&
    // const productsDetail = await CartProductRepository.getAllProductsDetails(session.basketId)

    
  
    // const response = new ResponseBuilder()
    //         .setOk(true)
    //         .setStatus(200)
    //         .setMessage(`The data`)
    //         .setPayload({
    //             session,
    //             productsDetail
    //         })
    //         .build()
    //     return res.json({ response })
}

