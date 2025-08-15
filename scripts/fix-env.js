#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing .env file with missing configurations...');

try {
    const envPath = path.join(__dirname, '..', '.env');
    
    // Read current .env content
    let envContent = '';
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
    }
    
    // Create complete .env content
    const completeEnvContent = `# WanderLust Environment Configuration
# Copy this file to .env and fill in your actual values

# Database Configuration
# Local MongoDB
ATLASDB_URL=mongodb://localhost:27017/wanderlust

# MongoDB Atlas (Cloud Database) - Recommended for production
# ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust

# Session Secret - Use a strong, random string
SECRET=your-super-secret-session-key-change-this-in-production

# Email Configuration (Required for password reset functionality)
# Gmail Configuration
EMAIL_USER=kunalgaikwad5533@gmail.com
EMAIL_PASS=Kunalg9089$

# Application URL
BASE_URL=http://localhost:8080

# Mapbox Configuration (Required for maps and geocoding)
# Get your access token from: https://account.mapbox.com/access-tokens/
MAP_TOKEN=pk.eyJ1Ijoia3VuYWxnYWlrd2FkNTUzMyIsImEiOiJjbHZ6Z2Z6Z2Z6Z2Z6In0.example

# Payment Gateway Configuration (Optional - for booking functionality)
# Razorpay Test Keys (Get from https://dashboard.razorpay.com/)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Image Upload Configuration (Optional - for property images)
# Cloudinary Configuration (Get from https://cloudinary.com/)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Development/Production Environment
NODE_ENV=development

# Server Port (Optional - defaults to 8080)
PORT=8080
`;
    
    // Write the complete .env file
    fs.writeFileSync(envPath, completeEnvContent);
    
    console.log('✅ .env file updated successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Get your Mapbox access token from: https://account.mapbox.com/access-tokens/');
    console.log('2. Update MAP_TOKEN in .env file with your actual token');
    console.log('3. Get your Gmail App Password and update EMAIL_PASS');
    console.log('4. Restart your server: npm run dev');
    
} catch (error) {
    console.error('❌ Error updating .env file:', error);
}
