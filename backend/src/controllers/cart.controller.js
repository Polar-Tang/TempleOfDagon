import crypto from "crypto"
import CartProductRepository from "../repositories/cart.repository.js"
import ProductRepository from "../repositories/product.repository.js"
import AppError from "../helpers/errors/app.error.js"
import ResponseBuilder from "../helpers/builders/response.builder.js"
import CheckoutSessionRepository from "../repositories/checkout.repository.js"


export const addToCartController = async (req, res, next) => {
    let cartId = req.cookies.cartId

    if (!cartId) {
        cartId = crypto.randomBytes(16).toString("hex")
        res.cookie("Basket-Id", cartId, { httpOnly: true, secure: true, sameSite: "strict" })
    }
    console.log(req.body)

    const { seller_id } = req.body
    const product = await ProductRepository.getProductById(seller_id)
    if (!product) {
        return next(new AppError("Producto no encontrado", 404))
    }
    const newProduct = await CartProductRepository.createProductCart(product, cartId)
    if (!newProduct) {
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`No hay más productos`)
            .setPayload({
                detail: "No hay más productos, el stock está agotado"
            })
            .build()
        return res.status(200).json({ response })
    }
    const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage(`El producto ha sido añadido al carrito con éxito`)
        .setPayload({
            detail: "Producto añadido"
        })
        .build()
    return res.status(200).json({ response })
}


export const eliminateProductCart = async (req, res, next) => {
    const { seller_id } = req.params
    const cartId = req.cookies.cartId

    if (!cartId) {
        return next(new AppError("No hay sesión del carrito", 400))
    }

    if (!seller_id) {
        return next(new AppError("Parametro no encontrado", 400))
    }

    const retriever = await CartProductRepository.deleteProductCart(seller_id, cartId)
    if (!retriever) {
        return next(new AppError("Cannot delete product", 400))
    }
    const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage(`El producto ha sido añadido al carrito con éxito`)
        .setPayload({
            detail: retriever
        })
        .build()
    return res.status(200).json({ response })
}

export const getAllCartProducts = async (req, res, next) => {
    try {
        const cartId = req.cookies.cartId
        const productsDetail = await CartProductRepository.getAllProductsDetails(cartId)
        if (!productsDetail) {
            return next(new AppError("No hay cookie", 404))
        }
    
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Listando productos`)
            .setPayload({
                detail: productsDetail
            })
            .build()
        return res.status(200).json({ response })
    } catch(err){
        return next(new AppError("Ocurrió un error, intenta denuevo luego", 500))
    }
}


export const checkoutController = async (req, res, next) => {
    const cartId = req.cookies.cartId;
    const form = req.body;

    if (!cartId) {
        return res.status(400).json({ message: "No cart session found" });
    }

    const checkoutId = crypto.randomBytes(16).toString("hex");
    await CheckoutSessionRepository.createCheckoutSession(checkoutId, cartId, req.body);

    const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Redirenct`)
            .setPayload({
                form
            })
            .build()
        return res.set('X-Basket-Id', checkoutId).status(200).json({ response })
};

export const checkoutRouterController = async (req, res, next) =>  {
    const { checkoutId } = req.params;
    
    console.log("REquest form ", checkoutId)

    const session = await CheckoutSessionRepository.findCheckoutSession(checkoutId);
    if (!session) {
      return res.status(404).send('This page does not exist');
    }
    const productsDetail = await CartProductRepository.getAllProductsDetails(session.cartId)

    
  
    const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`The data`)
            .setPayload({
                session,
                productsDetail
            })
            .build()
        return res.json({ response })
}

