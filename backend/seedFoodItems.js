const mongoose = require('mongoose');
const FoodItem = require('./models/foodItemModel');
require('dotenv').config();

const seedFoodItems = [
  {
    name: "Paneer Butter Masala",
    price: 160,
    description: "Rich and creamy cottage cheese curry with aromatic spices and butter",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&auto=format",
    category: "Main Course",
    type: "Vegetarian",
    ingredients: ["Paneer", "Tomatoes", "Butter", "Cream", "Spices"],
    preparationTime: 25
  },
  {
    name: "Fresh Lemon Tea",
    price: 25,
    description: "Refreshing hot tea infused with fresh lemon and ginger",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&auto=format",
    category: "Beverages",
    type: "Vegetarian",
    ingredients: ["Tea leaves", "Lemon", "Ginger", "Honey"],
    preparationTime: 10
  },
  {
    name: "Laccha Paratha with Chole",
    price: 90,
    description: "Flaky layered paratha served with spicy chickpea curry",
    image: "https://images.unsplash.com/photo-1606471962342-3c5400d43a65?w=400&h=300&fit=crop&auto=format",
    category: "North Indian",
    type: "Vegetarian",
    ingredients: ["Wheat flour", "Chickpeas", "Onions", "Tomatoes", "Spices"],
    preparationTime: 35
  },
  {
    name: "Dal Baati Churma",
    price: 110,
    description: "Traditional Rajasthani wheat balls with lentil curry and sweet churma",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop&auto=format",
    category: "Traditional",
    type: "Vegetarian",
    ingredients: ["Wheat flour", "Lentils", "Ghee", "Jaggery", "Spices"],
    preparationTime: 45
  },
  {
    name: "Masala Dosa",
    price: 65,
    description: "Crispy South Indian crepe with spiced potato filling and chutney",
    image: "https://images.unsplash.com/photo-1630851218971-aa2dac9f7d7b?w=400&h=300&fit=crop&auto=format",
    category: "South Indian",
    type: "Vegetarian",
    ingredients: ["Rice", "Lentils", "Potatoes", "Onions", "Coconut"],
    preparationTime: 20
  },
  {
    name: "Vegetable Biryani",
    price: 120,
    description: "Fragrant basmati rice with mixed vegetables, saffron and aromatic spices",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d7d3?w=400&h=300&fit=crop&auto=format",
    category: "Main Course",
    type: "Vegetarian",
    ingredients: ["Basmati rice", "Mixed vegetables", "Saffron", "Yogurt", "Spices"],
    preparationTime: 40
  },
  {
    name: "Crispy Samosa",
    price: 30,
    description: "Golden fried pastry filled with spiced potatoes, peas and herbs",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&auto=format",
    category: "Snacks",
    type: "Vegetarian",
    ingredients: ["Wheat flour", "Potatoes", "Peas", "Cumin", "Coriander"],
    preparationTime: 30
  },
  {
    name: "Chole Bhature",
    price: 100,
    description: "Spicy chickpea curry with fluffy deep-fried bread and pickled onions",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&h=300&fit=crop&auto=format",
    category: "North Indian",
    type: "Vegetarian",
    ingredients: ["Chickpeas", "Wheat flour", "Onions", "Tomatoes", "Spices"],
    preparationTime: 35
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campuseats');
    console.log('Connected to MongoDB');

    // Clear existing food items
    await FoodItem.deleteMany({});
    console.log('Cleared existing food items');

    // Insert new food items
    const insertedItems = await FoodItem.insertMany(seedFoodItems);
    console.log(`✅ Successfully seeded ${insertedItems.length} food items`);

    // Display inserted items
    insertedItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - ₹${item.price} (${item.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();