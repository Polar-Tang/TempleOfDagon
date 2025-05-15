import crypto from "crypto"
import CartProductRepository from "../repositories/cart.repository.js"
import ProductRepository from "../repositories/product.repository.js"
import AppError from "../helpers/errors/app.error.js"
import ResponseBuilder from "../helpers/builders/response.builder.js"
import CheckoutSessionRepository from "../repositories/checkout.repository.js"
import ChallengeBuilder from "../helpers/builders/challenge.builder.js"
import sendNotification from "../helpers/sockets/sendNotification.js"
import ENVIRONMENT from "../config/environment.js"
import fs from 'node:fs';
import pdf from "html-pdf"


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
        if (product.active === false) {
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
    } catch (err) {
        console.log(err)
        return next(new AppError("Ocurrió un error, intenta denuevo luego", 500))
    }
}

export const eliminateSessionCartController = async (req, res, next) => {
    try {
        const basketId = req.cookies.cartId

        if (!basketId) {
            return next(new AppError("No session cart", 400))
        }


        const retriever = await CartProductRepository.findSessionAndDelete(basketId)
        if (!retriever) {
            return next(new AppError("No session", 404))
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
    } catch (err) {
        console.log(err)
        return next(new AppError("Ocurrió un error, intenta denuevo luego", 500))

    }
}

export const getAllCartProducts = async (req, res, next) => {
    try {
        const basketId = req.cookies.cartId
        const productsDetail = await CartProductRepository.getAllProductsDetails(basketId)
        if (!productsDetail) {
            return next(new AppError("Not found", 404))
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
    } catch (err) {
        console.error(err)
        return next(new AppError("Ocurrió un error, intenta denuevo luego", 500))
    }
}

type productsListStockNotation = {
    name: string
    stock: number
}

export const checkoutController = async (req, res, next) => {
    try {
        const basketId = req.cookies.cartId;

        if (!basketId) {
            return res.status(400).json({ message: "No cart session found" });
        }
        const productsDetail = await CartProductRepository.getAllProductsDetails(basketId)
        if (!productsDetail) {
            return next(new AppError("Not found", 404))
        }

        const listingProducts: productsListStockNotation[] = []
        let isProductPresent = false
        let isErrorStock = false
        let isErrorTotal = false

        let productsAmountPrice = productsDetail.reduce((acc, item) => acc + item.price, 0)

        for (let i = 0; i < productsDetail.length; i++) {
            const item = productsDetail[i]
            let itemNotation = listingProducts.at(i)
            listingProducts.forEach((notedElement) => {
                if (notedElement.name == item.title) {
                    isProductPresent = true
                } else {
                    isProductPresent = false
                }
            })
            if (!isProductPresent) {
                const newProductListed = {
                    name: item.title,
                    stock: 1
                }
                listingProducts.push(newProductListed)

            }

            if (isProductPresent) {
                let repeatedElement = listingProducts.find(prod => prod.name === item.title)
                if (repeatedElement) {
                    if (repeatedElement.stock >= item.stock || 0 >= item.stock) {
                        isErrorStock = false
                        break
                    } else {
                        repeatedElement.stock++
                    }
                } else {
                    isErrorStock = false
                    break
                }
            }


        };

        if (isErrorStock) {
            return next(new AppError("Increase or reduce the cart products stock ", 404))
        }

        const {
            cardNumber,
            expiryMonth,
            expiryYear,
            cvv,
            address,
            cardholderName,
            country,
            credit,
        } = req.body


        let cardDetails = {
      cardNumber: cardNumber,
            expiryMonth: expiryMonth,
            expiryYear: expiryYear,
            cvv: cvv,
            address: address,
            cardholderName: cardholderName,
            country: country,
            credit: 0,
            // total: total      

        }
        // validations
        // if (total != productsAmountPrice) {
        //     return next(new AppError("An error has occured, please try again later ", 400))
        // }
        // proceed
        console.log(typeof productsAmountPrice, productsAmountPrice)
        const paymentTime = await CheckoutSessionRepository.createCheckoutSession(cardDetails, Number(productsAmountPrice))
        console.log("PAYMENT THING ", paymentTime)
        //
        if (!paymentTime) {
        return next(new AppError("We haven't registered that card yet...", 400))
        }

        // return res.redirect()
        const redirURL = `${process.env.FRONTENDURL}/new/checkout/${cardholderName}?order=${paymentTime}`
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Redirecting`)
            .setPayload({
                detail: redirURL
            })
            .build()
        return res.status(200).json({ response })

    } catch (error) {
        console.error(error)
        return next(new AppError("An error has occured, please try again later", 500))
    }

}
export const checkoutRouterController = async (req, res, next) => {
    const { name } = req.params;
    const { order } = req.query;

    const session = await CheckoutSessionRepository.findCheckoutSessionsByName(name);
    if (!session) {
        return res.status(404).send('This page does not exist');
    }
    console.log("THis is the sesion ", session)
    if (name !== "Robert Olmstead") {
        const connectedChallenge = new ChallengeBuilder()
            .setDescription("You can access to customer payment details")
            .setIsSolved(true)
            .setKey("Idor")
            .setMessage("You have find an idor")
            .setName("Payment Details Idor")
            .build()
            sendNotification(connectedChallenge)
    }
    const orderObject = session[order]
    const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage(`Listing products`)
        .setPayload({
            productsDetail: orderObject
        })
        .build()
    return res.status(200).json({ response })
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

// export const generatePdfCOntroller = async (req, res, next) => {
//     try {
//         let html = `<html>
//         <body>
//             <h1>Hello world!</h1>
//         </body>
//     </html>`
//         let options = { format: 'Letter' };
//         console.log(process.cwd())
//         //export OPENSSL_CONF=/etc/ssl
//         const any = pdf.create(html, options).toFile(`${process.cwd()}/businesscard.pdf`, function (err, response) {
//             console.log(response); // { filename: '/app/businesscard.pdf' }
//             if (err) return console.log(err);
//         });
//         const response = new ResponseBuilder()
//             .setOk(true)
//             .setStatus(200)
//             .setMessage(`The File has been created`)
//             .setPayload({
//                 any,
//             })
//             .build()
//         return res.json({ response })
//     } catch (error) {
//         console.log(error)
//     }

// }

