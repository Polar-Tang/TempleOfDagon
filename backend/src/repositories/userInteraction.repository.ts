import mongoose from "mongoose";
import UserInteraction from "../models/userInteraction.model.js";
import { UserInteractionType } from "../types/userInteraction.type.js";
import UserRepository from "./user.repository.js";
import Product from "../models/product.models.js"

class UserInteractionRepository {
    static async getPreferencesByProductId(product_id: mongoose.Types.ObjectId ) {
        try {
            console.log("Product id ",product_id)
            const query = UserInteraction.find({
                productId: new mongoose.Types.ObjectId(product_id)
            });
            const productsLiked = await query.exec()
            console.log(productsLiked)
            query.getFilter()
            return productsLiked;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    static async userLikeProduct({ user_id, product_id }: { user_id: mongoose.Types.ObjectId | string, product_id: mongoose.Types.ObjectId }): Promise<[UserInteractionType | null, boolean | null]> {
        try {
            // Find the UserInteraction for this user and interactionType 'like'
            let userInteraction = await UserInteraction.findOne({
                userId: user_id,
            })
            const user = await UserRepository.getById(String(user_id))
            if (!user) {
                return [null, null];
            }
            if (!userInteraction) {
                // Create new UserInteraction with productId as an array
                userInteraction = new UserInteraction({
                    userId: user_id,
                    productId: [product_id],
                    interactionType: 'like',
                    isActive: true,
                });
                await userInteraction.save();
                user.preferences.push(userInteraction._id)

                await user.save()
                // true means product was liked
                return [userInteraction, true];
            } else {
                // Check if product_id already exists in productId array
                const isIncluded = userInteraction.productId.includes(product_id);
                if (!isIncluded) {
                    userInteraction.productId.push(product_id);
                    await userInteraction.save();
                    // true means product was liked
                    return [userInteraction, true];
                } else {
                    const index = userInteraction.productId.findIndex((prod) => prod.equals ? prod.equals(product_id) : prod === product_id);
                    console.log(index)
                    userInteraction.productId.splice(index, 1);
                    console.log("The preferences are: ", userInteraction.productId)
                    await userInteraction.save();
                    // false means product was unliked
                    return [userInteraction, false];
                }
            }
        } catch (err) {
            console.log(err);
            return [null, null];
        }
    }
}

export default UserInteractionRepository