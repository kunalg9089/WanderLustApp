#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔧 Gmail App Password Setup Fix');
console.log('================================\n');

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function fixGmailSetup() {
    try {
        console.log('📧 The issue is that you need a Gmail App Password, not a regular password.\n');
        
        console.log('🔑 How to get Gmail App Password:');
        console.log('1. Go to: https://myaccount.google.com/apppasswords');
        console.log('2. Sign in with your Gmail account');
        console.log('3. Select "Mail" and click "Generate"');
        console.log('4. Copy the 16-character App Password\n');
        
        const hasAppPassword = await question('Do you have your Gmail App Password ready? (yes/no): ');
        
        if (hasAppPassword.toLowerCase() === 'yes') {
            const appPassword = await question('Enter your 16-character Gmail App Password: ');
            
            if (appPassword.length !== 16) {
                console.log('❌ App Password should be exactly 16 characters long');
                return;
            }
            
            // Read existing .env file
            const envPath = path.join(__dirname, '..', '.env');
            let envContent = fs.readFileSync(envPath, 'utf8');
            
            // Update EMAIL_PASS
            envContent = envContent.replace(/EMAIL_PASS=.*/g, `EMAIL_PASS=${appPassword}`);
            
            // Write back to .env file
            fs.writeFileSync(envPath, envContent);
            
            console.log('\n✅ Gmail App Password updated successfully!');
            console.log('\n📋 Next steps:');
            console.log('1. Restart your server: npm run dev');
            console.log('2. Test the forgot password feature');
            console.log('3. Check your email for the reset link');
            
        } else {
            console.log('\n📋 Please follow these steps:');
            console.log('1. Go to: https://myaccount.google.com/apppasswords');
            console.log('2. Enable 2-Factor Authentication if not already enabled');
            console.log('3. Generate an App Password for "Mail"');
            console.log('4. Run this script again with your App Password');
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        rl.close();
    }
}

fixGmailSetup();
