const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Main Course', 'Beverages', 'North Indian', 'South Indian', 'Traditional', 'Snacks']
  },
  type: {
    type: String,
    required: true,
    default: 'Vegetarian',
    enum: ['Vegetarian', 'Vegan']
  },
  available: {
    type: Boolean,
    default: true
  },
  ingredients: [String],
  preparationTime: {
    type: Number,
    default: 30 // in minutes
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FoodItem', foodItemSchema);