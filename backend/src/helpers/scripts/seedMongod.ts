import Product from '../../models/product.models.js'
import CheckoutSession from "../../models/checkout.model.js"
import User from '../../models/user.models.js';
import mongoose from 'mongoose';
import { products } from './products.js';
import ENVIRONMENT from "../../config/environment"
import { users } from './users.js';
import ProductRepository from '../../repositories/product.repository.js';
import CommentRepository from '../../repositories/comment.repository.js';


export const createProducts = async () => {
  try {
    await Product.insertMany(products);
    console.log("Products seeded");
  } catch (err) {
    console.log("An error when we were seed has happened: ", err)
  }
}


export const createCards = async () => {
  try {
    const checkoutSessions = [
      {
        paymentTime: 1,
        cardholderName: "Charles Dexter Ward",
        cardNumber: "6694580695799579",
        expiryMonth: "5",
        expiryYear: "2029",
        total: 500,
        cvv: "564",
        country: "usa",
        credit: 5000,
        address: "51 Gano St, Providence, Rhode Island",

        active: true
      },
      {
        paymentTime: 1,
        cardholderName: "Herbert West",
        cardNumber: "1234067811793671",
        expiryMonth: "1",
        expiryYear: "2031",
        cvv: "123",
        country: "usa",
        credit: 3400,
        total: 1400,
        address: "137 Washington, Arkham, Massachusetts",
        active: true
      },
      {
        paymentTime: 2,
        cardholderName: "Herbert West",
        cardNumber: "1234067811793671",
        expiryMonth: "1",
        expiryYear: "2031",
        cvv: "123",
        credit: 2000,
        total: 300,
        country: "usa",
        address: "137 Washington, Arkham, Massachusetts",
        active: true
      },
      {
        cardholderName: "Robert Olmstead",

        cardNumber: "5901459740715409",
        expiryMonth: "3",
        expiryYear: "2033",
        cvv: "457",
        credit: 750,
        country: "usa",
        address: "777 The fisherman, Insmouth, Massachusetts",
        active: true
      },
    ]
    await CheckoutSession.insertMany(checkoutSessions);
    console.log("checkoutSessions seeded");
  } catch (err) {
    console.log("An error when we were seed has happened: ", err)
  }
}

export const createUsers = async () => {
  try {

    for (const user of users) {
      const newUser = new User(user)
      await newUser.save()
      const products = await Product.find({ seller_name: newUser.name });
      const products_ids: mongoose.Types.ObjectId[] = []
      await Promise.all(products.map(async (product) => {
        product.seller_id = newUser._id;
        if (product._id) {
          products_ids.push(product._id)
        }
        await product.save();
      }))
      newUser.products = products_ids
      await newUser.save()
    }


    console.log("users seeded");
  } catch (err) {
    console.log("An error when we were seed has happened: ", err)
  }

}

export const createComments = async () => {
  try {
    const product = await ProductRepository.getProductById("6828064fdb9bd4671fd1127e");
    if (!product) {
      console.error("Product not found for seeding comments.");
      return;
    }

    const comment1 = await CommentRepository.postComment({
      description: "It's avaible on Shantak-bird size?",
      author: "Swami Chandraputra",
      product_id: String(product?._id)
    });
    console.log("comment1", comment1);
    if (comment1) {
      await CommentRepository.responseComment({
        message: "What's that size?",
        author: "Charles Dexter Ward",
        message_id: String(comment1?._id)
      });

      await CommentRepository.responseComment({
        message: "Forget it.",
        author: "Swami Chandraputra",
        message_id: String(comment1?._id)
      });
    }


    const product2 = await ProductRepository.getProductById("6812424f01fbd13fcf8f1c0d");

    const comment2 = await CommentRepository.postComment({
      description: "It can ress people?",
      author: "Herbert West",
      product_id: String(product2?._id)
    });

    if (comment2) {
      await CommentRepository.responseComment({
        message: "It work for me",
        author: "Charles Dexter Ward",
        message_id: String(comment2?._id)
      });
    }

    const product3 = await ProductRepository.getProductById("6812424f01fbd13fcf8f1c0e");

    await CommentRepository.postComment({
      description: "It works on every race, i tested it",
      author: "Herbert West",
      product_id: String(product3?._id)
    });


    const product4 = await ProductRepository.getProductById("6812424f01fbd13fcf8f1c10");

    const comment4 = await CommentRepository.postComment({
      description: "The product is nice, i only wish the deliver to be better",
      author: "Charles Dexter Ward",
      product_id: String(product4?._id)
    });
    if(comment4) {
      await CommentRepository.responseComment({
        message: "Thank you for your feedback!",
        author: "Swami Chandraputra",
  
        message_id: String(comment4?._id)
      });
    }

    const product5 = await ProductRepository.getProductById("6812424f01fbd13fcf8f1c12");

    const comment5 = await CommentRepository.postComment({
      description: "It's avaible in different sizes?",
      author: "Charles Dexter Ward",
      product_id: String(product5?._id)
    });
    console.log(comment5);
    if (comment5) {
      await CommentRepository.responseComment({
        message: "The size is what's described in the description.",
        author: "Herbert West",
        message_id: String(comment5?._id)
      });

    }
    console.log("Seed comments created successfully.");
  } catch (err) {
    console.error(err);
  }
}