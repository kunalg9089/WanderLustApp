// Script to change demo user password
// Run this script to update the password for the demo user

const mongoose = require('mongoose');
const User = require('../src/app/models/user');

// MongoDB connection
const dbUrl = process.env.ATLASDB_URL || 'mongodb://127.0.0.1:27017/wanderlust';

async function changeDemoPassword() {
    try {
        // Connect to MongoDB
        await mongoose.connect(dbUrl);
        console.log('Connected to MongoDB');

        // Find the demo user (you'll need to replace 'demo' with the actual username)
        const demoUser = await User.findOne({ username: 'demo' });
        
        if (!demoUser) {
            console.log('Demo user not found. Please check the username.');
            console.log('Available users:');
            const users = await User.find({}, 'username email');
            users.forEach(user => {
                console.log(`- ${user.username} (${user.email})`);
            });
            return;
        }

        // Set new password (you can change this to your preferred password)
        const newPassword = 'WanderLust2024!';
        
        // Change password using passport-local-mongoose
        await demoUser.setPassword(newPassword);
        await demoUser.save();
        
        console.log(`✅ Password changed successfully for user: ${demoUser.username}`);
        console.log(`New password: ${newPassword}`);
        console.log('Please save this password securely and delete this script after use.');

    } catch (error) {
        console.error('Error changing password:', error);
    } finally {
        mongoose.connection.close();
    }
}

changeDemoPassword();
