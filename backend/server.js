require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./models/userModel');
const FoodItem = require('./models/foodItemModel');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'CampusEats API is running' });
});

// Food Items Routes
app.get('/api/food-items', async (req, res) => {
    try {
        const foodItems = await FoodItem.find({ available: true }).sort({ category: 1 });
        res.json({
            success: true,
            data: foodItems
        });
    } catch (error) {
        console.error('Error fetching food items:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch food items'
        });
    }
});

// Get user profile
app.get('/api/auth/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch profile'
        });
    }
});

// Update user profile
app.put('/api/auth/profile', auth, async (req, res) => {
    try {
        const { fullName, mobileNumber, address, hostelRoom } = req.body;
        
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { fullName, mobileNumber, address, hostelRoom },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: user
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile'
        });
    }
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, fullName, mobileNumber } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'This email is already registered'
            });
        }

        const user = await User.create({
            email,
            password,
            fullName,
            mobileNumber
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(201).json({
            success: true,
            token,
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.json({
            success: true,
            token,
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid college ID or password'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});