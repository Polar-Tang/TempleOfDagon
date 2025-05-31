import mongoose from "mongoose";

export type UserInteractionType = {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId[];
    interactionType: "like" | "view" | "purchase" | "wishlist" | "review" | "share";
    isActive: boolean;
}