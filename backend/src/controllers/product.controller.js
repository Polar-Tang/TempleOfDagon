import AppError from "../helpers/errors/app.error.js";
import ResponseBuilder from "../helpers/builders/response.builder.js";
import ProductRepository from "../repositories/product.repository.js";
import UserRepository from "../repositories/user.repository.js";
import { verifyMinLength, verifyString } from "../helpers/validations/auth.validators.js";

const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
};

export const createProductController = async (req, res, next) => {
    try {
        if (isEmptyObject(req.body)) {
            return next(new AppError("El producto está vacío", 400))
        }
        const {
            stock,
            description,
            category,
            image_url,
        } = req.body

         if (!image_url || typeof image_url !== 'string') {
            return next(new AppError("The image was not processed correctly", 500))
         }
        const auth_header = req.get("Authorization")
        const token = auth_header.split(" ")[1]
        const payload = jwt.decode(token, process.env.JWT_SECRET)

        const author = UserRepository.getByMail(payload.email)
        console.log("author:\n------------------------------\n",author)
        
        if(!author) {
            return next(new AppError("User not found", 403))
        }
        let errors = []

        const newProduct =  {
            stock: stock ,
            description: description ,
            category: category,
            image_url: image_url ,
            price: price,
        }
        const newProductsKeys = Object.keys(newProduct)
        for (let i = 0; i < newProductsKeys.length; i++ ) {
            const productItemValue= newProduct[i]
            console.log("The value is:\n", productItemValue)
            const productItemKey= newProductsKeys[i]
            console.log("The key is:\n", productItemKey)
            if (productItemKey == "price"  || productItemKey == "stock") {
                let error = positiveNumber(productItemKey, productItemValue)
                if (error) {
                    errors.push(error)
                }
            }
            if (productItemKey == "image_url"  || productItemKey == "description") {
                let error = verifyString(productItemKey, productItemValue)
                error = verifyMinLength(productItemKey, productItemValue, 8)
                if (error) {
                    errors.push(error)
                }
            }
        } 
        if (errors.length > 0) {
            return next(new AppError(errors, 403))
        }

        const sanitizedProduct = {
            stock: Number(stock),
            description: description.trim(),
            category: category.toLowerCase(),
            image_url: image_url.trim(),
            seller_name: payload.name.trim(),
            price: Number(price),
            seller_id: author._id,

        };
        const new_object = await ProductRepository.createProduct(sanitizedProduct)
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(201)
            .setMessage(`Product created`)
            .setPayload({
                new_object
            })
            .build()
        return res.status(201).json({ response })
    } catch (error) {
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