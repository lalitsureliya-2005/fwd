import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AddToCartButton from './AddToCartButton';
import { API_ENDPOINTS, apiCall } from '../utils/api';

function DashboardPage() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const exampleFoodItems = [
    {
      id: 1,
      name: "Paneer Butter Masala",
      price: 160,
      description: "Rich and creamy cottage cheese curry with aromatic spices and butter",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&auto=format",
      category: "Main Course",
      type: "Vegetarian"
    },
    {
      id: 2,
      name: "Fresh Lemon Tea",
      price: 25,
      description: "Refreshing hot tea infused with fresh lemon and ginger",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&auto=format",
      category: "Beverages",
      type: "Vegetarian"
    },
    {
      id: 3,
      name: "Dal Baati Churma",
      price: 110,
      description: "Traditional Rajasthani wheat balls with lentil curry and sweet churma",
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop&auto=format",
      category: "Traditional",
      type: "Vegetarian"
    },
    {
      id: 4,
      name: "Crispy Samosa",
      price: 30,
      description: "Golden fried pastry filled with spiced potatoes, peas and herbs",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&auto=format",
      category: "Snacks",
      type: "Vegetarian"
    },
    {
      id: 5,
      name: "Chole Bhature",
      price: 100,
      description: "Spicy chickpea curry with fluffy deep-fried bread and pickled onions",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&h=300&fit=crop&auto=format",
      category: "North Indian",
      type: "Vegetarian"
    },
    {
      id: 6,
      name: "Palak Paneer",
      price: 145,
      description: "Creamy spinach curry with chunks of fresh cottage cheese and aromatic spices",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&auto=format",
      category: "Main Course",
      type: "Vegetarian"
    },
    {
      id: 7,
      name: "Rajma Rice",
      price: 85,
      description: "Kidney beans in thick onion-tomato gravy served with steamed basmati rice",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format",
      category: "Main Course",
      type: "Vegetarian"
    },
    {
      id: 8,
      name: "Aloo Gobi",
      price: 95,
      description: "Classic dry curry with cauliflower and potatoes cooked with turmeric and spices",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&auto=format",
      category: "Main Course",
      type: "Vegetarian"
    },
    {
      id: 9,
      name: "Veg Pulao",
      price: 75,
      description: "Aromatic basmati rice cooked with mixed vegetables, whole spices and saffron",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop&auto=format",
      category: "Main Course",
      type: "Vegetarian"
    },
    {
      id: 10,
      name: "Bhel Puri",
      price: 45,
      description: "Crunchy puffed rice mixed with sev, chutneys, onions and fresh herbs",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&auto=format",
      category: "Snacks",
      type: "Vegetarian"
    },
    {
      id: 11,
      name: "Kadai Paneer",
      price: 150,
      description: "Cottage cheese cooked with bell peppers in spicy tomato-based kadai masala",
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&auto=format",
      category: "Main Course",
      type: "Vegetarian"
    },
    {
      id: 12,
      name: "Pav Bhaji",
      price: 65,
      description: "Spicy mixed vegetable curry served with butter-toasted bread rolls",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&auto=format",
      category: "Street Food",
      type: "Vegetarian"
    },
    {
      id: 13,
      name: "Stuffed Kulcha",
      price: 85,
      description: "Soft leavened bread stuffed with spiced potatoes, served with yogurt and pickle",
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop&auto=format",
      category: "North Indian",
      type: "Vegetarian"
    },
    {
      id: 14,
      name: "Paneer Tikka",
      price: 130,
      description: "Marinated cottage cheese cubes grilled with bell peppers and onions",
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&auto=format",
      category: "Appetizers",
      type: "Vegetarian"
    },
    {
      id: 15,
      name: "Cold Coffee",
      price: 45,
      description: "Chilled coffee blended with milk, ice cream, and a touch of chocolate",
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format",
      category: "Beverages",
      type: "Vegetarian"
    }
  ];

  useEffect(() => {
    fetchFoodItems();
    fetchUserProfile();
    
    // Simple cart loading
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart);
          }
        }
      } catch (error) {
        setCartItems([]);
      }
    };
    
    loadCart();
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCart();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const fetchFoodItems = async () => {
    try {
      // Always use local static data to ensure removed items stay removed
      setFoodItems(exampleFoodItems);
      setLoading(false);
    } catch (error) {
      console.error('Error setting food items:', error);
      setFoodItems(exampleFoodItems);
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const data = await apiCall(API_ENDPOINTS.AUTH.PROFILE);
      if (data.success) {
        setUser(data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const addToCart = (item) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        existingCart.push({ ...item, quantity: 1 });
      }
      
      localStorage.setItem('cart', JSON.stringify(existingCart));
      setCartItems(existingCart);
      
      // Single event dispatch
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Single toast notification
      toast.success(`${item.name} added to cart!`, {
        duration: 2000,
        position: 'bottom-center',
        icon: '🛒'
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.8, rotateX: 15 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <motion.div 
        className="absolute top-20 right-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute top-96 left-10 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      />
      <motion.div 
        className="absolute bottom-20 right-1/4 w-64 h-64 bg-green-200/20 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <motion.h1 
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent cursor-pointer"
                onClick={() => navigate('/dashboard')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CampusEats
              </motion.h1>
              <span className="hidden sm:inline-block text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                Welcome back, {user.fullName?.split(' ')[0] || 'Student'}! 👋
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 relative group"
                onClick={() => navigate('/cart')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Cart ({getCartItemCount()})</span>
                {getCartItemCount() > 0 && (
                  <motion.div 
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {getCartItemCount()}
                  </motion.div>
                )}
              </motion.button>
              <motion.button 
                onClick={() => navigate('/profile')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </motion.button>
              <button 
                onClick={handleSignOut}
                className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <motion.h2 
            className="text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Today's Delicious Menu
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Fresh, tasty meals for pickup at your campus location 🍽️
          </motion.p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden animate-pulse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-10 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {foodItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="card bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 group relative"
                variants={itemVariants}
                whileHover={{ 
                  y: -15, 
                  scale: 1.03,
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: { type: "spring", stiffness: 400, damping: 25 } 
                }}
                animate={{
                  y: 0,
                  scale: 1,
                  rotateY: 0,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Glowing border effect on hover */}
                <motion.div 
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                />
                
                <div className="relative overflow-hidden h-48">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  
                  {/* Price badge with animation */}
                  <motion.div 
                    className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full font-bold text-gray-800 shadow-lg border border-blue-100"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    <span className="text-green-600">₹</span>{item.price}
                  </motion.div>
                  
                  {/* Vegetarian badge */}
                  <motion.div 
                    className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    🌿 VEG
                  </motion.div>
                  
                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-5 relative">
                  <motion.h3 
                    className="font-bold text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.name}
                  </motion.h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Category and Type Tags */}
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <motion.span 
                      className="text-xs font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full border border-green-200"
                      whileHover={{ scale: 1.05, backgroundColor: '#dcfce7' }}
                      transition={{ duration: 0.2 }}
                    >
                      🌿 {item.type}
                    </motion.span>
                    <motion.span 
                      className="text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full border border-blue-200"
                      whileHover={{ scale: 1.05, backgroundColor: '#dbeafe' }}
                      transition={{ duration: 0.2 }}
                    >
                      📋 {item.category}
                    </motion.span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <motion.span 
                        className="text-2xl font-bold text-green-600"
                        whileHover={{ scale: 1.1 }}
                      >
                        ₹{item.price}
                      </motion.span>
                    </div>
                    <div className="ml-4">
                      <AddToCartButton 
                        onClick={() => addToCart(item)} 
                        aria-label={`Add ${item.name} to cart`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;