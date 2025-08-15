const mongoose = require('mongoose');
const User = require('../src/app/models/user');

// MongoDB connection
const dbUrl = process.env.ATLASDB_URL || 'mongodb://127.0.0.1:27017/wanderlust';

async function createDefaultUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(dbUrl);
        console.log('Connected to MongoDB');

        // Check if default user already exists
        const existingUser = await User.findOne({ username: 'wanderlust_admin' });
        
        if (existingUser) {
            console.log('Default user already exists:', existingUser.username);
            console.log('User ID:', existingUser._id);
            return existingUser._id;
        }

        // Create default user
        const defaultUser = new User({
            username: 'wanderlust_admin',
            email: 'admin@wanderlust.com',
            password: 'WanderLust2024!'
        });

        await defaultUser.save();
        console.log('✅ Default user created successfully!');
        console.log('Username: wanderlust_admin');
        console.log('Email: admin@wanderlust.com');
        console.log('Password: WanderLust2024!');
        console.log('User ID:', defaultUser._id);

        return defaultUser._id;

    } catch (error) {
        console.error('Error creating default user:', error);
    } finally {
        mongoose.connection.close();
    }
}

createDefaultUser();
