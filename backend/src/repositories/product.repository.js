import Product from "../models/product.models.js"
// import pool  from "../config/dbMysql.config.js"

class ProductRepository {
    static async createProduct( new_product_data ) {
        // console.log( new_product_data)
        const new_product = new Product(new_product_data)
         await new_product.save()
         return
    }

    static async updateProduct (product_id, update_data) {
        return Product.findOneAndUpdate({"_id":product_id}, update_data)
    } 

    static async getAllProducts (){
        return Product.find({active: true})
    }

    static async getProductById (product_id){
        return Product.findOne({"_id":product_id})
    }

    static async deleteProduct (filter){
        return Product.findOneAndUpdate(filter, { active: false }, { new: true });
    }

    // vulnerable function
    static async getProductByUnsanitizedInput (raw_json){
        // return Product.findOne({"active": JSON.parse(product_id)})

        // where is not allowed
        // return Product.findOne({ $where: `this._id == ${raw_json} ` })
        const product = Product.findOne(raw_json)
        return product
    }
}

// class ProductRepository {
//     // STATIC GUARDA EL METODO EN LA CLASE
//     static async createProduct( new_product_data ) {
//         const {
//             title,
//             price,
//             stock,
//             description,
//             category,
//             seller_id,
//             image_base64
//         } = new_product_data
//         const query = `INSERT INTO Products (title, price, stock, description, category, seller_id, image_base64) VALUES (?, ?, ?, ?, ?, ?, ?)`

//         const [result] = await pool.execute(query, [title, price, stock, description, category, seller_id, image_base64])
//         if (result.affectedRows > 0) {
//             return {title, price, stock, description, category, seller_id, image_base64, id: result.insertId}
//         } 
//     }

//     static async updateProduct (product_id, update_data) {
//         return Product.findOneAndUpdate(product_id, update_data)
//     } 

//     static async getAllProducts (){
//         const [rows] = await pool.execute(`SELECT * FROM Products WHERE active = 1`)
//         return rows
//     }

//     static async getProductById (product_id){
//         const [rows] = await pool.execute(`SELECT * FROM Products WHERE id = ? AND active = 1`, [product_id])
//         return rows.length > 0 ? rows[0] : null
//     }

//     static async deleteProduct (filter){
//         return Product.findOneAndUpdate(filter, { active: false }, { new: true });
//     }
// }

export default ProductRepository
