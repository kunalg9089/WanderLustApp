#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Quick Email Fix...');

try {
    const envPath = path.join(__dirname, '..', '.env');
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Update with the user's Gmail
    envContent = envContent.replace(/SMTP_USER=.*/g, 'SMTP_USER=kunalgaikwad5533@gmail.com');
    
    // Add missing configurations
    if (!envContent.includes('SMTP_HOST=')) {
        envContent += '\n# SMTP Configuration\n';
        envContent += 'SMTP_HOST=smtp.gmail.com\n';
        envContent += 'SMTP_PORT=587\n';
    }
    
    if (!envContent.includes('JWT_SECRET=')) {
        envContent += '\n# JWT Configuration\n';
        envContent += 'JWT_SECRET=supersecretresetkey\n';
    }
    
    fs.writeFileSync(envPath, envContent);
    
    console.log('✅ Updated SMTP_USER to: kunalgaikwad5533@gmail.com');
    console.log('\n📋 Now you need to:');
    console.log('1. Get your Gmail App Password from: https://myaccount.google.com/apppasswords');
    console.log('2. Update SMTP_PASS in .env file with your 16-character App Password');
    console.log('3. Restart server: npm run dev');
    
} catch (error) {
    console.error('❌ Error:', error);
}
