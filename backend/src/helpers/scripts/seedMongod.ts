import Product from '../../models/product.models.js'
import CheckoutSession from "../../models/checkout.model.js"
import bcrypt from 'bcrypt'
import User from '../../models/user.models.js';
import mongoose from 'mongoose';
import { products } from './products.js';


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
    const hashedPassword = await bcrypt.hash("josephC0rwell", 10)

    const charlesdexterward = {
      _id: new mongoose.Types.ObjectId(),
      name: "Charles Dexter Ward",
      password: hashedPassword,
      email: "charlesdexterward@gmail.com",
      active: true,
      products: [],
      role: "admin",
      emailVerified: true,
      verificationToken: "",
      bio: "I like to walk over the antique gardence of providence, Joseph Corwell but i like most that no one knock the doors, even if someone needs it",
      location: "Providence, Massachusetts",
    }
    const charlesdexterward_user = new User(charlesdexterward)

    await charlesdexterward_user.save()
    const products = await Product.find({ seller_name: charlesdexterward_user.name });
    const products_ids: mongoose.Types.ObjectId[] = []
    await Promise.all(products.map(async (product) => {
      product.seller_id = charlesdexterward_user._id;
      if (product._id) {
        products_ids.push(product._id)
      }
      await product.save();
    }))
    charlesdexterward_user.products = products_ids
    await charlesdexterward_user.save()

    console.log("users seeded");
  } catch (err) {
    console.log("An error when we were seed has happened: ", err)
  }

}