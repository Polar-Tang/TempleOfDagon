import AppError from "../helpers/errors/app.error.js";
import ResponseBuilder from "../helpers/builders/response.builder.js";
import ProductRepository from "../repositories/product.repository.js";
import UserRepository from "../repositories/user.repository.js";
import { verifyMinLength, verifyString } from "../helpers/validations/auth.validators.js";
import jwt from "jsonwebtoken"
import { virifyPositiveNumber } from "../helpers/validations/product.validators.js";
import mongoose from "mongoose";
import { SanitizedProduct } from "../helpers/types/product.type.js";

const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
};

export const createProductController = async (req, res, next) => {
    try {
        if (isEmptyObject(req.body)) {
            return next(new AppError("El producto está vacío", 400))
        }
        const {
            filename,
            fieldname
        } = req.file
        console.log("fieldname ", fieldname)
        const {
            stock,
            description,
            category,
            title,
            price
        } = req.body

        if (!filename || typeof filename !== 'string') {
            return next(new AppError("The image was not processed correctly", 500))
        }
        const auth_header = req.get("Authorization")
        const token = auth_header.split(" ")[1]
        const payload = jwt.decode(token, process.env.JWT_SECRET)
       
        let errors: string[] = []

        const newProduct = {
            title: title,
            stock: stock,
            description: description,
            category: category,
            image_url: filename,
            price: price,
        }
        console.log(newProduct)
        for (const [key, value] of Object.entries(newProduct)) {
            console.log("The value is:\n", value)
            console.log("The key is:\n", key)
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
            image_url: filename.trim(),
            seller_name: payload.name.trim(),
            price: Number(price),
            seller_id: payload._id,
        };
        const new_product = await ProductRepository.createProduct(sanitizedProduct, payload.email)
        console.log(new_product)
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
        next(error)
    }
}

export const deleteProductController = async (req, res, next) => {
    try {
        const { id } = req.params
        console.log("This is the id", id)
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
        next(error)
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
        next(error)
    }

}

export const getProductByIdController = async (req, res, next) => {
    try {

        const { id } = req.params

        if (!id) {
            return next(new AppError("There's no id", 400))
        }

        const ProductsSearched = await ProductRepository.getProductById(id) // []

        // if (isEmptyObject(object_searched)) {
        //     return next(new AppError("Product not found", 404))
        // }

        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Get product by id`)
            .setPayload({
                ProductsSearched
            })
            .build()
        return res.json(response)
    } catch (error) {
        console.error(error);
        next(error)
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
        next(error)
    }
}