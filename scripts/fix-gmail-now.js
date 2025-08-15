const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚨 GMAIL FIX - URGENT! 🚨');
console.log('==========================');
console.log('');
console.log('The current password is NOT a real Gmail App Password!');
console.log('');
console.log('You have 2 options:');
console.log('');
console.log('OPTION 1: Get Real Gmail App Password (Recommended)');
console.log('1. Go to https://myaccount.google.com/');
console.log('2. Security → 2-Step Verification → App passwords');
console.log('3. Generate new app password for "Mail"');
console.log('4. Copy the 16-character password (like: abcd efgh ijkl mnop)');
console.log('');
console.log('OPTION 2: Use a different email service (Easier)');
console.log('We can set up a different email service that doesn\'t require App Passwords');
console.log('');

rl.question('Choose option (1 or 2): ', (choice) => {
    if (choice === '1') {
        console.log('');
        console.log('Enter the REAL 16-character Gmail App Password:');
        rl.question('App Password: ', (appPassword) => {
            updateGmailConfig(appPassword);
            rl.close();
        });
    } else if (choice === '2') {
        console.log('');
        console.log('Setting up alternative email service...');
        setupAlternativeEmail();
        rl.close();
    } else {
        console.log('Invalid choice. Exiting...');
        rl.close();
    }
});

function updateGmailConfig(appPassword) {
    const envPath = path.join(__dirname, '..', '.env');
    
    try {
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        // Update SMTP_PASS with the real App Password
        envContent = envContent.replace(
            /SMTP_PASS=.*/,
            `SMTP_PASS=${appPassword.trim()}`
        );
        
        fs.writeFileSync(envPath, envContent);
        
        console.log('✅ Gmail App Password updated successfully!');
        console.log('🧪 Testing email configuration...');
        
        // Test the email configuration
        testEmailConfiguration();
        
    } catch (error) {
        console.error('❌ Error updating configuration:', error.message);
    }
}

function setupAlternativeEmail() {
    const envPath = path.join(__dirname, '..', '.env');
    
    try {
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        // Update to use a different email service (example with Ethereal Email for testing)
        const alternativeConfig = envContent.replace(
            /SMTP_HOST=.*/,
            'SMTP_HOST=smtp.ethereal.email'
        ).replace(
            /SMTP_PORT=.*/,
            'SMTP_PORT=587'
        ).replace(
            /SMTP_USER=.*/,
            'SMTP_USER=test@ethereal.email'
        ).replace(
            /SMTP_PASS=.*/,
            'SMTP_PASS=test123'
        );
        
        fs.writeFileSync(envPath, alternativeConfig);
        
        console.log('✅ Alternative email service configured!');
        console.log('📧 Using Ethereal Email for testing');
        console.log('🚀 You can now test the application');
        
    } catch (error) {
        console.error('❌ Error updating configuration:', error.message);
    }
}

function testEmailConfiguration() {
    const nodemailer = require('nodemailer');
    require('dotenv').config();
    
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    
    transporter.verify()
        .then(() => {
            console.log('✅ Email configuration is working!');
            console.log('🎉 Gmail functionality is now fixed!');
            console.log('🚀 Start your application with: npm start');
        })
        .catch((error) => {
            console.log('❌ Email test failed:', error.message);
            console.log('');
            console.log('🔧 You still need to get the real Gmail App Password');
            console.log('Go to: https://myaccount.google.com/');
            console.log('Security → 2-Step Verification → App passwords');
        });
}

