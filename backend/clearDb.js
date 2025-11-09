require('dotenv').config();
const mongoose = require('mongoose');

async function resetDatabase() {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/campuseats';
        await mongoose.connect(mongoUri);
        console.log('✅ Connected to MongoDB');
        
        const db = mongoose.connection.db;
        
        // Drop the entire database to clear all collections and indexes
        await db.dropDatabase();
        console.log('🗑️ Database completely reset');
        
        // Disconnect and reconnect to create fresh database
        await mongoose.disconnect();
        await mongoose.connect(mongoUri);
        console.log('🔄 Reconnected to fresh database');
        
        // Create the User model to ensure proper schema setup
        const User = require('./models/userModel');
        
        // Create a test user to initialize the collection with correct indexes
        const testUser = new User({
            fullName: 'Test User',
            email: 'test.init@bmsce.ac.in',
            mobileNumber: '9876543210',
            password: 'password123'
        });
        
        // Save and immediately delete to initialize the collection
        await testUser.save();
        await User.deleteOne({ email: 'test.init@bmsce.ac.in' });
        
        console.log('✅ Database reset completed successfully');
        console.log('✅ Fresh indexes created for User model');
        
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error resetting database:', error);
        process.exit(1);
    }
}

resetDatabase();