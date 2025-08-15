#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Updating .env file with new SMTP and JWT configuration...');

try {
    const envPath = path.join(__dirname, '..', '.env');
    
    // Read current .env content
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Update email configuration to use SMTP
    envContent = envContent.replace(/EMAIL_USER=.*/g, 'SMTP_USER=wanderlust@email.com');
    envContent = envContent.replace(/EMAIL_PASS=.*/g, 'SMTP_PASS=your-smtp-password');
    
    // Add SMTP host and port
    if (!envContent.includes('SMTP_HOST=')) {
        envContent += '\n# SMTP Configuration\n';
        envContent += 'SMTP_HOST=smtp.gmail.com\n';
        envContent += 'SMTP_PORT=587\n';
    }
    
    // Add JWT secret
    if (!envContent.includes('JWT_SECRET=')) {
        envContent += '\n# JWT Configuration\n';
        envContent += 'JWT_SECRET=supersecretresetkey\n';
    }
    
    // Write back to .env file
    fs.writeFileSync(envPath, envContent);
    
    console.log('✅ .env file updated successfully!');
    console.log('\n📋 Configuration updated:');
    console.log('- EMAIL_USER → SMTP_USER');
    console.log('- EMAIL_PASS → SMTP_PASS');
    console.log('- Added SMTP_HOST and SMTP_PORT');
    console.log('- Added JWT_SECRET');
    
    console.log('\n📋 Next steps:');
    console.log('1. Update SMTP_PASS with your actual password');
    console.log('2. Update JWT_SECRET with a strong secret key');
    console.log('3. Restart your server: npm run dev');
    
} catch (error) {
    console.error('❌ Error updating .env file:', error);
}
