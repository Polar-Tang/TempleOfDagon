import mongoose from 'mongoose'
import { createProducts, createCards, createUsers, createComments } from '../helpers/scripts/seedMongod.js'
import Product from '../models/product.models.js';
import ENVIRONMENT from './environment.js'
import CheckoutSession from '../models/checkout.model.js';
import User from '../models/user.models.js';
import Comment from '../models/comment.model.js';

//const MONGO_URL = 'mongodb://localhost:27017/mydatabase'

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("Database connected");

    // Seed products if not already seeded
    const productCount = await Product.countDocuments();
    const cartDetailsCount = await CheckoutSession.countDocuments();
    const userCount = await User.countDocuments();
    const commentsCount = await Comment.countDocuments();

    if (productCount === 0) {
      await createProducts();
    } else {
      console.log("Products already exist. Skipping seeding.");
    }

    if (cartDetailsCount === 0) {
      await createCards();
    } else {
      console.log("Cart details already exist. Skipping seeding.");
    }
    if (userCount === 0) {
      await createUsers();
    } else {
      console.log("Users already exist. Skipping seeding.")
    }
    if (commentsCount === 0) {
      await createComments()
    } else {
      console.log("Comments already exist. Skipping seeding.")
    }
    console.log("Server setup complete.");
  })
  .catch((err) => {
    console.error('Database connection error:', err)
  })

export default mongoose