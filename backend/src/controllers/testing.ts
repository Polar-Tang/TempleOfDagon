// controllers/preferencesController.js
const UserInteraction = require('../models/UserInteraction');
const Product = require('../models/Product');

class PreferencesController {
  
  // Toggle like/unlike product
  async toggleLike(req, res) {
    try {
      const { productId } = req.params;
      const userId = req.user.id; // from auth middleware
      
      // Check if interaction exists
      const existingInteraction = await UserInteraction.findOne({
        userId,
        productId,
        interactionType: 'like'
      });
      
      if (existingInteraction) {
        // Toggle the active state
        existingInteraction.isActive = !existingInteraction.isActive;
        await existingInteraction.save();
        
        return res.json({
          success: true,
          liked: existingInteraction.isActive,
          message: existingInteraction.isActive ? 'Product liked' : 'Product unliked'
        });
      } else {
        // Create new like interaction
        const newInteraction = new UserInteraction({
          userId,
          productId,
          interactionType: 'like',
          isActive: true
        });
        
        await newInteraction.save();
        
        return res.json({
          success: true,
          liked: true,
          message: 'Product liked'
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  
  // Get user's liked products
  async getLikedProducts(req, res) {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10 } = req.query;
      
      const likedInteractions = await UserInteraction.find({
        userId,
        interactionType: 'like',
        isActive: true
      })
      .populate('productId')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
      
      const likedProducts = likedInteractions.map(interaction => ({
        product: interaction.productId,
        likedAt: interaction.createdAt
      }));
      
      res.json({
        success: true,
        data: likedProducts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit)
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  
  // Add to wishlist
  async addToWishlist(req, res) {
    try {
      const { productId } = req.params;
      const { notes } = req.body;
      const userId = req.user.id;
      
      // Check if already in wishlist
      const existing = await UserInteraction.findOne({
        userId,
        productId,
        interactionType: 'wishlist',
        isActive: true
      });
      
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Product already in wishlist'
        });
      }
      
      const wishlistItem = new UserInteraction({
        userId,
        productId,
        interactionType: 'wishlist',
        metadata: { notes },
        isActive: true
      });
      
      await wishlistItem.save();
      
      res.json({
        success: true,
        message: 'Product added to wishlist'
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  
  // Get user analytics/insights
  async getUserInsights(req, res) {
    try {
      const userId = req.user.id;
      
      // Aggregate user behavior
      const insights = await UserInteraction.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId), isActive: true } },
        {
          $group: {
            _id: '$interactionType',
            count: { $sum: 1 },
            lastInteraction: { $max: '$createdAt' }
          }
        }
      ]);
      
      // Get most liked categories
      const categoryPreferences = await UserInteraction.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId), interactionType: 'like', isActive: true } },
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'product'
          }
        },
        { $unwind: '$product' },
        {
          $group: {
            _id: '$product.category',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]);
      
      res.json({
        success: true,
        data: {
          interactionSummary: insights,
          favoriteCategories: categoryPreferences
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = new PreferencesController();