import Comment from "../models/comment.model.js"
import ProductRepository from "./product.repository.js"

class CommentRepository {
    static async postComment({description, author, product_id}: {description: string, author: string, product_id: string}) {
        const productToComment = await ProductRepository.getProductById(product_id)
        if (!productToComment) {
            return null
        }
        console.log(description, author, product_id)
     
        const new_comment = new Comment({author:author,
            message: description,
            product:product_id
        })
        console.log(productToComment)
        await new_comment.save()
        productToComment.comments.push(new_comment._id)
        return await productToComment.save()
    }
    static async responseComment({message, author, message_id}: {message: string, author: string, message_id: string}) {
        const postToComment = await Comment.findById(message_id)
        if (!postToComment) {
            return null
        }
        const new_message = {
            message: message,
            author: author
        }
     

        postToComment.comments.push(new_message)
        return await postToComment.save()
    }
}

export default CommentRepository