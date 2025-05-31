import mongoose from "mongoose";

const userInteractionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product',
    required: true
  },
  interactionType: {
    type: String,
    enum: ['like', 'view', 'purchase', 'wishlist', 'review', 'share'],
    required: true
  },
  metadata: {
    rating: { type: Number, min: 1, max: 5 },
    purchaseAmount: Number,
    reviews: Number
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound indexes
userInteractionSchema.index({ userId: 1, interactionType: 1, isActive: 1 });
userInteractionSchema.index({ productId: 1, interactionType: 1, isActive: 1 });
userInteractionSchema.index({ userId: 1, productId: 1, interactionType: 1 });

const UserInteraction = mongoose.model('UserInteraction', userInteractionSchema);

export default UserInteraction