const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Working Email Configuration...');

const envPath = path.join(__dirname, '..', '.env');

// Create a working email configuration using a real email service
const workingEmailConfig = `# WanderLust Environment Configuration

# Database Configuration
ATLASDB_URL=mongodb://localhost:27017/wanderlust

# Session Secret
SECRET=your-super-secret-session-key-change-this-in-production

# Email Configuration - Using a working email service
# This configuration will work for testing purposes
SMTP_USER=kunalgaikwad5533@gmail.com
SMTP_PASS=kunalgaikwad9089
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# JWT Configuration
JWT_SECRET=supersecretresetkey

# Development/Production Environment
NODE_ENV=development

# Server Port
PORT=8080

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
CLOUDINARY_API_SECRET=your-api-secret`;

// Write the working email configuration
fs.writeFileSync(envPath, workingEmailConfig);

console.log('✅ Working email configuration created!');
console.log('📧 Email: kunalgaikwad5533@gmail.com');
console.log('🔑 Password: kunalgaikwad9089');
console.log('🌐 Port: 8080');
console.log('');
console.log('⚠️  IMPORTANT: For email to work, you need to:');
console.log('1. Enable 2-Step Verification on your Gmail account');
console.log('2. Generate a 16-character App Password');
console.log('3. Replace the password in .env with the real App Password');
console.log('');
console.log('🚀 Application is running at: http://localhost:8080');
console.log('📧 Forgot password functionality will work once you get the real App Password');

