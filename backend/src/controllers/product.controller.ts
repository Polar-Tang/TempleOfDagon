import AppError from "../helpers/errors/app.error.js";
import ResponseBuilder from "../helpers/builders/response.builder.js";
import ProductRepository from "../repositories/product.repository.js";
import { verifyMinLength, verifyString } from "../helpers/validations/auth.validators.js";
import jwt from "jsonwebtoken"
import { virifyPositiveNumber } from "../helpers/validations/product.validators.js";
import mongoose from "mongoose";
import { SanitizedProduct } from "../helpers/types/product.type.js";
import path from "path";
import fs from "fs"
import createFilename from "../helpers/utils/createFIlename.js"
import CommentRepository from "../repositories/comment.repository.js";
import UserInteractionRepository from "../repositories/userInteraction.repository.js";
import ENVIRONMENT from './config/environment.js'
import { getUploadsUrl } from "../helpers/utils/getUploadsUrl.js";

const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
};
const errorRes = new ResponseBuilder()
    .setOk(true)
    .setStatus(400)
    .setMessage(`Can't create the product`)
    .build()
const notFound = new ResponseBuilder()
    .setOk(true)
    .setStatus(404)
    .setMessage(`Product Not found`)
    .build()

export const createProductController = async (req, res, next) => {
    try {
        if (isEmptyObject(req.body)) {
            return next(new AppError("El producto está vacío", 400))
        }
        const {
            originalname,
            mimetype,
            buffer
        } = req.file as {
            originalname: string,
            mimetype: string,
            buffer: NodeJS.ArrayBufferView
        }
        const {
            stock,
            description,
            category,
            title,
            price
        } = req.body

        const fileName = createFilename(originalname)
        if (!fileName || typeof fileName !== 'string') {
            // there's an error while creating the filename, createFilename returns an error 
            const response = errorRes.setPayload({
                    detail: String(fileName)
                })
            return res.status(400).send(response);
        }
        const fileStorageImage = path.join('uploads', fileName)
        const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
        if (buffer.byteLength > MAX_FILE_SIZE) {
            const response = errorRes.setPayload({
                    detail: String("Max 10 mb for a file")
                })
            return res.status(400).send(response);
        }
        if (buffer.byteLength === 0) {
            const response = errorRes.setPayload({
                    detail: String("Please select an image")
                })
            return res.status(400).send(response);
        }
        fs.writeFile(fileStorageImage, buffer, (err) => {
            if (err) {
                const response = errorRes.setPayload({
                    detail: String("Error saving file")
                })
            return res.status(500).send(response);
            } 
        })

        const completeFileName = getUploadsUrl(fileName)
        let errors: string[] = []

        const auth_header = req.get("Authorization")
        const token = auth_header.split(" ")[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const newProduct = {
            title: title,
            stock: stock,
            description: description,
            category: category,
            image_url: completeFileName,
            price: price,
        }

        for (const [key, value] of Object.entries(newProduct)) {
            if (key == "price" || key == "stock") {
                let verifError = virifyPositiveNumber(key, Number(value))
                if (verifError) {
                    errors.push(verifError)
                }
            }
            if (key == "image_url" || key == "description" || key == "title") {
                let verifError = verifyString(key, value)
                verifError = verifyMinLength(key, value, 8)
                if (verifError) {
                    errors.push(verifError)
                }
            }
        }
        if (errors.length > 0) {
            return next(new AppError(errors, 400))
        }



        const sanitizedProduct: SanitizedProduct = {
            _id: new mongoose.Types.ObjectId(),
            title: String(title).trim(),
            stock: Number(stock),
            description: description.trim(),
            category: category.toLowerCase(),
            image_url: completeFileName.trim(),
            seller_name: payload.name.trim(),
            price: Number(price),
            seller_id: payload._id,
        };
        const new_product = await ProductRepository.createProduct(sanitizedProduct, payload.email)
        if (!new_product) {
            const response = new ResponseBuilder()
                .setOk(true)
                .setStatus(500)
                .setMessage(`Can't create the product`)
                .setPayload({
                    detail: "The product cannot be created, try again later"
                })
                .build()
            return res.status(201).json({ response })
        }
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(201)
            .setMessage(`Product created`)
            .setPayload({
                new_product
            })
            .build()
        return res.status(201).json({ response })
    } catch (error) {
        console.log(error)
        return next(error)
    }
}

export const deleteProductController = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) {
            return next(new AppError("You must provide an id", 400))

        }
        const new_object = await ProductRepository.deleteProduct({ "_id": id })

        if (isEmptyObject(new_object)) {
            return next(new AppError("Product not found", 404))
        }

        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Product eliminated`)
            .setPayload({
                new_object
            })
            .build()
        return res.json(response)
    } catch (error) {
        console.error(error);
        return next(error)
    }

}

export const updateProductController = async (req, res, next) => {
    try {

        const { id } = req.params

        if (!id) {
            return next(new AppError("There's no id", 400))
        }
        if (isEmptyObject(req.body)) {
            return next(new AppError("You have sent a wrong body", 400))
        }

        const new_object = await ProductRepository.updateProduct(id, req.body)

        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Product Updated`)
            .setPayload({
                new_object
            })
            .build()
        return res.json(response)
    } catch (error) {
        console.error(error);
        return next(error)
    }

}

export const getProductByIdController = async (req, res, next) => {
    try {

        const { id } = req.params

        if (!id) {
            return next(new AppError("There's no id", 400))
        }

        const ProductsSearched = await ProductRepository.getProductById(id)
        if (!ProductsSearched) {
            return next(new AppError("Product not found", 404))
        }
        const preferences = await UserInteractionRepository.getPreferencesByProductId(id)
        // if (isEmptyObject(object_searched)) {
        //     return next(new AppError("Product not found", 404))
        // }
        console.log("Preferences: ",preferences)

        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Get product by id`)
            .setPayload({
                ProductsSearched,
                likes: preferences?.length
            })
            .build()
        return res.json(response)
    } catch (error) {
        console.error(error);
        return next(error)
    }
}

export const getAllProductController = async (req, res, next) => {

    try {
        const ProductSearched = await ProductRepository.getAllProducts()
        if (isEmptyObject(ProductSearched)) {
            return next(new AppError("No hay productos", 404))
        }
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Todos los productos`)
            .setPayload({
                ProductSearched
            })
            .build()
        return res.json(response)
    } catch (error) {
        console.error(error);
        return next(error)
    }
}

export const createCommentController = async (req, res, next) => {
    try {
        const { id } = req.params
        const {message} = req.body

         const auth_header = req.get("Authorization")
        const token = auth_header.split(" ")[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        
        if (!payload) {
            return next("No user")

        }
        if (!message) {
            return next("There no such message")
        }
        const messageData = {
            description: message, 
            author: payload.name, 
            product_id: id
        }
        
        const comment = CommentRepository.postComment(messageData)
        if (!comment) {
            return next("An error has occured while posting the new message")
        }
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Your message has been posted successfully!`)
            .setPayload({
                detail: comment
            })
            .build()
        return res.json(response) 
    } catch (error) {
        console.log(error)
        return next(error)
    }
}

export const responseCommentController = async (req, res, next) => {
    try {
        const { id } = req.params
        const {message} = req.body

         const auth_header = req.get("Authorization")
        const token = auth_header.split(" ")[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        
        if (!payload) {
            return next("No user")

        }
        if (!message) {
            return next("There no such message")
        }
        const messageData = {
            message: message, 
            author: payload.name, 
            message_id: id
        }
        
        const comment = CommentRepository.responseComment(messageData)
        if (!comment) {
            return next("An error has occured while posting the new message")
        }
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Your message has been posted successfully!`)
            .setPayload({
                detail: comment
            })
            .build()
        return res.json(response) 
    } catch (error) {
        console.log(error)
        return next(error)
    }
}