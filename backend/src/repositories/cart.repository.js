import mongoose from "mongoose"
import CartProduct from "../models/cart.models.js"

class CartProductRepository {
    static async createProductCart(product, cartId) {
        let cartSession = await CartProduct.findOne({ cartId })
        
        if (!cartSession) {    
            console.log("THe _id ", product._id)
            cartSession = new CartProduct({
                cartId: cartId,
                detailProducts: [
                    {
                        _id: product._id,
                        title: product.title,
                        price: product.price,
                        stock: product.stock,
                        image_url: product.image_url
                    },
                ],
            })
            
            return await cartSession.save()
        } else {
            
            const filtering = cartSession.detailProducts.filter(
                (element ) => String(element._id) == String(product._id )
            )
            if (filtering.length <= product.stock ){
            console.log("filtering great than products")

                cartSession.detailProducts.push({
                    _id: product._id,
                    title: product.title,
                    price: product.price,
                    stock: product.stock,
                    image_url: product.image_url

                })
                return await cartSession.save()
            } else{
            console.log("the else")

                return false
               
            }
        }
    }
    


    static async getAllProductsDetails(cartId) {
        console.log(`.findOne({ "cartId": ${cartId} })`) // OUTPUT: .findOne({ "cartId": {"$ne":""} })
        console.log(typeof cartId) // string
        let cartSession = await CartProduct.findOne({ "cartId": cartId })
        console.log(cartSession) // NULL
        if (!cartSession) {
            return false
        }

        return cartSession.detailProducts
    }

    static async findSessionAndDelete(cartId) {
        let cartSession = await CartProduct.findOneAndDelete({ "cartId": cartId })
        return cartSession
    }
    
    static async deleteProductCart(product_id, cartId ) {
        const cartSession = await CartProduct.findOne({ "cartId": cartId });

        console.log("The cartSession is: ", cartSession)
        if (!cartSession) {
          return "Cart not found";
        }
      
        const existingProductIndex = cartSession.detailProducts.findIndex(
          (item) => {
            console.log("THE _ID ", String(item._id) )
            return String(item._id) === product_id}
        );
        if (existingProductIndex === -1) {
          return "Product not found in cart";
        }
        console.log("The product to elliminate, ",cartSession.detailProducts[existingProductIndex].stock)
        if (cartSession.detailProducts[existingProductIndex].stock < cartSession.detailProducts[existingProductIndex].stock){
            return "No more products to delete"
        }
        console.log(cartSession.length)

        cartSession.detailProducts.splice(existingProductIndex, 1);
        console.log(cartSession.length)
        await cartSession.save();
      
        return cartSession.detailProducts
    }
}

export default CartProductRepository