#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚨 URGENT: Fix Email Configuration Now!');
console.log('=======================================\n');

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function fixEmailNow() {
    try {
        console.log('❌ Current Problem:');
        console.log('- SMTP_USER=wanderlust@email.com (NOT A REAL EMAIL)');
        console.log('- SMTP_PASS=your-smtp-password (NOT A REAL PASSWORD)\n');
        
        console.log('📧 To fix this, you need:');
        console.log('1. A real Gmail account');
        console.log('2. A Gmail App Password (16 characters)\n');
        
        console.log('🔑 How to get Gmail App Password:');
        console.log('1. Go to: https://myaccount.google.com/apppasswords');
        console.log('2. Sign in with your Gmail');
        console.log('3. Enable 2-Factor Authentication if not enabled');
        console.log('4. Generate App Password for "Mail"');
        console.log('5. Copy the 16-character password\n');
        
        const gmailAddress = await question('Enter your REAL Gmail address: ');
        const appPassword = await question('Enter your 16-character Gmail App Password: ');
        
        if (!gmailAddress || !appPassword) {
            console.log('❌ Both fields are required!');
            return;
        }
        
        if (appPassword.length !== 16) {
            console.log('❌ App Password must be exactly 16 characters!');
            return;
        }
        
        // Update .env file
        const envPath = path.join(__dirname, '..', '.env');
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        // Replace the placeholder values
        envContent = envContent.replace(/SMTP_USER=.*/g, `SMTP_USER=${gmailAddress}`);
        envContent = envContent.replace(/SMTP_PASS=.*/g, `SMTP_PASS=${appPassword}`);
        
        // Add missing configurations if they don't exist
        if (!envContent.includes('SMTP_HOST=')) {
            envContent += '\n# SMTP Configuration\n';
            envContent += 'SMTP_HOST=smtp.gmail.com\n';
            envContent += 'SMTP_PORT=587\n';
        }
        
        if (!envContent.includes('JWT_SECRET=')) {
            envContent += '\n# JWT Configuration\n';
            envContent += 'JWT_SECRET=supersecretresetkey\n';
        }
        
        // Write back to .env file
        fs.writeFileSync(envPath, envContent);
        
        console.log('\n✅ SUCCESS! Email configuration fixed!');
        console.log(`📧 Emails will be sent FROM: ${gmailAddress}`);
        console.log('\n📋 Next steps:');
        console.log('1. Restart your server: npm run dev');
        console.log('2. Test forgot password at: http://localhost:8080/forgot-password');
        console.log('3. Check your email for the reset link');
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        rl.close();
    }
}

fixEmailNow();
