import mongoose from "mongoose"
import CheckoutSession from "../models/checkout.model.js"
import CartProductRepository from "./cart.repository.js"

class CheckoutSessionRepository {
    static async createCheckoutSession(cardDetails, productsAmountPrice: number) {

        let isValidCreds = false
        const allSessions = await CheckoutSessionRepository.findAllCheckoutSessions()
        const sessionsByName = allSessions.filter((element) => {
            return element.cardholderName === cardDetails.cardholderName
        })

        for (let i = 0; i < allSessions.length; i++) {
            let existingProduct = allSessions[i]
            if (existingProduct.address === cardDetails.address && existingProduct.expiryMonth === cardDetails.expiryMonth && existingProduct.expiryYear === cardDetails.expiryYear && existingProduct.cvv === cardDetails.cvv && existingProduct.cardholderName === cardDetails.cardholderName && existingProduct.country === cardDetails.country) {
                isValidCreds = true
                break
            }
        }
        if (!isValidCreds) {
            return false
        }

        const sessionTime = (sessionsByName).length
        const latestSession = sessionsByName[sessionTime-1]
        if (latestSession.credit < productsAmountPrice) {
            return false
        }
        cardDetails.paymentTime = sessionTime
        cardDetails.credit= latestSession.credit - productsAmountPrice
        // newCardDetails
        const new_product = new CheckoutSession(cardDetails)
        console.log(new_product)
        await new_product.save()

        return sessionTime
        // const productsDetail = CartProductRepository.getAllProductsDetails(cartId)
    }

    static async findCheckoutSession(checkoutId) {
        console.log("checkoutId: ", checkoutId)
        console.log("is checkoutId?: ", Boolean(checkoutId))

        const checkoutSession = await CheckoutSession.findOne({ "checkoutId": checkoutId })
        console.log(checkoutSession)
        console.log("The complete session", checkoutSession)


        // checkoutSession.active = false
        // checkoutSession.save()
        return checkoutSession
    }

    static async findCheckoutSessionsByName(cardholderName) {
        console.log("cardholderName: ", cardholderName)
        console.log("is cardholderName?: ", Boolean(cardholderName))

        const checkoutSession = await CheckoutSession.find({ "cardholderName": cardholderName })
        console.log(checkoutSession)
        console.log("The complete session", checkoutSession)


        // checkoutSession.active = false
        // checkoutSession.save()
        return await checkoutSession
    }

    static async findAllCheckoutSessions() {
        const checkoutSession = await CheckoutSession.find()
        return await checkoutSession
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