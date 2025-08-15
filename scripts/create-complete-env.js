const fs = require('fs');
const path = require('path');

console.log('🔧 Creating Complete .env Configuration...');

const envPath = path.join(__dirname, '..', '.env');

// Complete environment configuration
const completeEnvConfig = `# WanderLust Environment Configuration

# Database Configuration
ATLASDB_URL=mongodb://localhost:27017/wanderlust

# Session Secret
SECRET=your-super-secret-session-key-change-this-in-production

# Email Configuration (Required for password reset functionality)
# Gmail Configuration
SMTP_USER=kunalgaikwad5533@gmail.com
SMTP_PASS=kunalgaikwad9089x
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# JWT Configuration
JWT_SECRET=supersecretresetkey

# Development/Production Environment
NODE_ENV=development

# Server Port
PORT=8081

# Application URL
BASE_URL=http://localhost:8081

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

// Write the complete .env file
fs.writeFileSync(envPath, completeEnvConfig);

console.log('✅ Complete .env configuration created successfully!');
console.log('📧 Email: kunalgaikwad5533@gmail.com');
console.log('🔑 Password: kunalgaikwad9089x (16 characters)');
console.log('🌐 Port: 8081');
console.log('🗄️  Database: mongodb://localhost:27017/wanderlust');
console.log('🚀 You can now start the application with: npm start');

