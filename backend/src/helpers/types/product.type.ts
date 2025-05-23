import mongoose from "mongoose";

export type SanitizedProduct = {
    _id: mongoose.Types.ObjectId | null | undefined
    title: string;
    stock: number;
    description: string;
    category: string;
    image_url: string;
    seller_name: string;
    price: number;
    seller_id: string;
};