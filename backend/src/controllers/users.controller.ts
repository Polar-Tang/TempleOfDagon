import jwt from 'jsonwebtoken'
import ResponseBuilder from '../helpers/builders/response.builder.js'
import UserRepository from '../repositories/user.repository.js'
import ENVIRONMET from "../config/environment.js"
import ProductRepository from '../repositories/product.repository.js'

export const getUserController = async (req, res, next) => {
    try {
        const { name } = req.params
        // res.set("Cache-Control", "no-store")

        const userProfile = await UserRepository.getByName(name)
        console.log(userProfile)

        if (!userProfile) {
             const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(404)
            .setMessage(`User not found`)
            .setPayload({
                detail: userProfile,
                isOwner: false
            })
            .build()
        return res.json({ response })
        }

        const productsByName = ProductRepository.getProductBySellerId(userProfile.name)

        const filteredUserProfile = {
            name: userProfile.name,
            email: userProfile.email,
            bio: userProfile.bio,
            location: userProfile.location
        }

        const auth_header = req.get("Authorization")

        if (auth_header) {
            const token = auth_header.split(" ")[1]
            const payload = jwt.decode(token, process.env.JWT_SECRET)
            console.log(token)
            console.log(payload)
            console.log(payload.name, " ", name, " are wuall? ", name === payload.name)
            if (name == payload.name) {
                const response = new ResponseBuilder()
                    .setOk(true)
                    .setStatus(200)
                    .setMessage(`Sending the user`)
                    .setPayload({
                        user: filteredUserProfile,
                        products: productsByName,
                        isOwner: true
                    })
                    .build()
                    return res.json({ response })
            }

        }

        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Sending the user`)
            .setPayload({
                detail: filteredUserProfile,
                isOwner: false
            })
            .build()
        return res.json({ response })
    } catch (err) {
        console.error(err)
        next(err)
    }
}

export const updateUserController = async (req, res, next) => {
try {
    
} catch (error) {
    
}
}