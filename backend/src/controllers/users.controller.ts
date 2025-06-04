import jwt from 'jsonwebtoken'
import ResponseBuilder from '../helpers/builders/response.builder.js'
import UserRepository from '../repositories/user.repository.js'
import ENVIRONMET from "../config/environment.js"
import ProductRepository from '../repositories/product.repository.js'
import UserInteractionRepository from '../repositories/userInteraction.repository.js'
import { userPayload } from '../types/token.type.js'
import { getUploadsUrl } from '../helpers/utils/getUploadsUrl.js'


export const getUserController = async (req, res, next) => {
    try {
        const { name } = req.params
        // res.set("Cache-Control", "no-store")
        const productsFilter = req.query.products

        if (name && productsFilter) {
            try {
                console.log("Products filter is converted to: ")
                console.log(productsFilter)

                const userProfile = await UserRepository.getUserProductsByName(name, productsFilter)
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
                    // return res.render(userProfile)
                }
                const filteredUserProfile = {
                    name: userProfile.name,
                    email: userProfile.email,
                    bio: userProfile.bio,
                    location: userProfile.location,
                    image_url: userProfile.avatar_url,
                    productsFilter: userProfile.products,
                }
                const response = new ResponseBuilder()
                    .setOk(true)
                    .setStatus(200)
                    .setMessage(`User found`)
                    .setPayload({
                        detail: filteredUserProfile,
                        isOwner: false
                    })

                    .build()
                return res.json({ response })
            } catch (error) {
                next(error)
                return
            }
        }

        // get profile with products
        const userProfile = await UserRepository.getUserProductsByName(name, {
            path: 'products',
        })


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
        console.log("User products ", userProfile.products)

        const filteredUserProfile = {
            name: userProfile.name,
            email: userProfile.email,
            bio: userProfile.bio,
            location: userProfile.location,
            productsFilter: userProfile.products,
            image_url: userProfile.avatar_url,
        }
        console.log("FIltered user profile ", filteredUserProfile)
        const auth_header = req.get("Authorization")

        if (auth_header) {
            const token = auth_header.split(" ")[1]
            const payload = jwt.verify(token, process.env.JWT_SECRET)
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
        return
    }
}
type multerFileParse = {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number

}
export const updateUserController = async (req, res, next) => {
    try {
        const { bio, location } = req.body
        const {
            fieldname,
            originalname,
            encoding,
            mimetype,
            destination,
            filename,
            path,
            size
        } = req.file as multerFileParse

        const imagePath = getUploadsUrl(filename)

        const auth_header = req.get("Authorization")
        const token = auth_header.split(" ")[1]
        const payload = jwt.decode(token, process.env.JWT_SECRET)
        console.log("THis is the payload ", payload)
        const userProfile = await UserRepository.updateUser(String(payload.email), { imagePath })

        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Sending the user`)
            .setPayload({
                file: req.file
            })
            .build()
        return res.json({ response })
    } catch (error) {
        return next(error)
    }
}

// export const updateUserController = async (req, res, next) => {
//     try {
//         const { bio, location } = req.body

//         const auth_header = req.get("Authorization")
//         const token = auth_header.split(" ")[1]
//         const payload = jwt.decode(token, process.env.JWT_SECRET)
//         await UserRepository.updateUser(payload.email, { bio, location })

//         const filteredUserProfile = {
//             name: payload.name,
//             email: payload.email,
//             bio: bio,
//             location: location
//         }
//         const response = new ResponseBuilder()
//             .setOk(true)
//             .setStatus(200)
//             .setMessage(`Sending the user`)
//             .setPayload({
//                 detail: filteredUserProfile,
//                 isOwner: false
//             })
//             .build()
//         return res.json({ response })
//     } catch (error) {
//         return next(error)
//     }
// }

// const getUserDetailController = async (req, res, next) => {
//     try {
//         const { name } = req.params
//         const productsFilter = req.query.products

//         const userProducts = ProductRepository.getProductBySellerId(name, productsFilter)
//         if (!userProducts) {
//             const response = new ResponseBuilder()
//                 .setOk(false)
//                 .setStatus(404)
//                 .setMessage(`User not found`)
//                 .build()
//             return res.json({ response })
//         }
//         const response = new ResponseBuilder()
//             .setOk(true)
//             .setStatus(200)
//             .setMessage(`Sending the user`)
//             .setPayload({
//                 user: userProducts
//             })
//             .build()
//         return res.json({ response })

//     } catch (error) {
//         next(error)
//     }
// }

export const responseCommentLikeController = async (req, res, next) => {
    try {

        const { product_id } = req.params

        console.log("THe product ID is:", product_id)

        const auth_header = req.get("Authorization")

        const token = auth_header.split(" ")[1]
        const payload: userPayload = jwt.verify(token, process.env.JWT_SECRET)
        const { user_id } = payload
        console.log("The user verified by the JWT: ", payload)

        const [userInteraction, isLiked] = await UserInteractionRepository.userLikeProduct({ user_id, product_id })
        console.log(typeof userInteraction)
        if (typeof userInteraction != "object") {
            return next("Was not posible to give a like, try again later")
        }
        const unsignedJWT = btoa(JSON.stringify({ alg: "none", typ: "JWT" })) + "." + btoa(JSON.stringify(userInteraction)) + ".";

        res.cookie("preferences", unsignedJWT, { httpOnly: false, secure: true, sameSite: "none", path: "/", domain: `${process.env.DOMAIN}`  })
        const good_response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Product ${isLiked ? "liked" : "disliked"}!`)
            .setPayload({
                detail: product_id
            })
            .build()
        return res.send(good_response)
    } catch (error) {
        return next(error)
    }
}