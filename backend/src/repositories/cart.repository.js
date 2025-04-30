import mongoose from "mongoose"
import CartProduct from "../models/cart.models.js"

class CartProductRepository {
    static async createProductCart(product, cartId) {
        let cartSession = await CartProduct.findOne({ cartId })
    
        
        if (!cartSession) {    
            cartSession = new CartProduct({
                cartId: cartId,
                detailProducts: [
                    {
                        _id: product._id,
                        title: product.title,
                        price: product.price,
                        stock: product.stock,
                    },
                ],
            })
            
            return await cartSession.save()
        } else {
            
            const filtering = cartSession.detailProducts.filter(
                (element ) => element._id == product._id 
            )
            if (filtering.length <= product.stock ){
            console.log("filtering great than products")

                cartSession.detailProducts.push({
                    _id: product._id,
                    title: product.title,
                    price: product.price,
                    stock: product.stock,
                })
                return await cartSession.save()
            } else{
            console.log("the else")

                return false
               
            }
        }
    }
    


    static async getAllProductsDetails(cartId) {
        let cartSession = await CartProduct.findOne({ "_id": cartId })
        
        if (!cartSession) {
            return false
        }

        return cartSession.detailProducts
    }

    
    static async deleteProductCart(product_id, cartId ) {
        const cartSession = await CartProduct.findOne({ "_id": cartId });

        if (!cartSession) {
          return "Cart not found";
        }
      
        const existingProductIndex = cartSession.detailProducts.findIndex(
          (item) => item._id === product_id
        );
      
        if (existingProductIndex === -1) {
          return "Product not found in cart";
        }
        console.log("The product to elliminate, ",cartSession.detailProducts[existingProductIndex].stock)
        if (cartSession.detailProducts[existingProductIndex].stock < cartSession.detailProducts[existingProductIndex].stock){
            return "No more products to delete"
        }
        cartSession.detailProducts.splice(existingProductIndex, 1);
      
        await cartSession.save();
      
        return cartSession.detailProducts
    }
}

export default CartProductRepository