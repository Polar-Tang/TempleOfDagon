import mongoose from "mongoose"
import CheckoutSession from "../models/checkout.model.js"
import CartProductRepository from "./cart.repository.js"

class CheckoutSessionRepository {

    static async createCheckoutSession(cardDetails){
        // const productsDetail = CartProductRepository.getAllProductsDetails(cartId)
        const new_product = new CheckoutSession(cardDetails)
         await new_product.save()
         return
    }

    static async findCheckoutSession(checkoutId){
        console.log("checkoutId: ", checkoutId)
        console.log("is checkoutId?: ", Boolean(checkoutId))
        
        const checkoutSession = await CheckoutSession.findOne({ "checkoutId": checkoutId })
        console.log(checkoutSession)
        console.log("The complete session",checkoutSession)

       
        // checkoutSession.active = false
        // checkoutSession.save()
        return checkoutSession
    }

}

export default CheckoutSessionRepository


// {
//     "checkoutId": "f76759e85b150d054acbe90408fae60b",
//                 cartId: cartId,
//                 cardNumber: body.cardNumber, 
//                 expiryMonth: body.expiryMonth, 
//                 expiryYear: body.expiryYear, 
//                 cvv: body.cvv, 
//                 country: body.country, 
//                 address: body.address, 
//                 active: true
//     }