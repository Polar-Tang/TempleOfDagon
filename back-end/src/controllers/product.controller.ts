import { validateLen, validateAlphaNumeric } from "../helpers/validation.js"
import express from "express"
import ENVIRONMENT from '../config/environment.js'
import supabase from '../config/supabaseClient/supabase.client.js'

export const newProductController = async (req: express.Request, res: express.Response) => { 
    const {name, stock, price, product_image_url, active, category, description, created_at, slug } = req.body

    const {error} = await supabase
        .from('Users')
        .insert({
            name: name,
            product_image_url: product_image_url,
            active: active,
            stock: stock,
            category: category,
            description: description,
            created_at: created_at,
            slug: slug,
            price: price,
        })
    if (error) {
        return res.send(error);
    }
    return res.send("created!!");
}