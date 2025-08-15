#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('📧 WanderLust Email Setup - Final Configuration');
console.log('==============================================\n');

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function setupEmailFinal() {
    try {
        console.log('🔧 Current Issue: SMTP credentials are not configured properly.\n');
        
        console.log('📋 You have two options:');
        console.log('1. Use Gmail (Recommended)');
        console.log('2. Use a different email service\n');
        
        const choice = await question('Choose option (1 or 2): ');
        
        if (choice === '1') {
            console.log('\n📧 Gmail Setup Instructions:');
            console.log('1. Go to: https://myaccount.google.com/apppasswords');
            console.log('2. Sign in with your Gmail account');
            console.log('3. Enable 2-Factor Authentication if not already enabled');
            console.log('4. Generate an App Password for "Mail"');
            console.log('5. Copy the 16-character App Password\n');
            
            const gmailAddress = await question('Enter your Gmail address: ');
            const appPassword = await question('Enter your 16-character Gmail App Password: ');
            
            if (!gmailAddress || !appPassword) {
                console.log('❌ Both Gmail address and App Password are required!');
                return;
            }
            
            if (appPassword.length !== 16) {
                console.log('❌ App Password should be exactly 16 characters long');
                return;
            }
            
            // Update .env file
            const envPath = path.join(__dirname, '..', '.env');
            let envContent = fs.readFileSync(envPath, 'utf8');
            
            // Update SMTP configuration
            envContent = envContent.replace(/SMTP_USER=.*/g, `SMTP_USER=${gmailAddress}`);
            envContent = envContent.replace(/SMTP_PASS=.*/g, `SMTP_PASS=${appPassword}`);
            envContent = envContent.replace(/SMTP_HOST=.*/g, 'SMTP_HOST=smtp.gmail.com');
            envContent = envContent.replace(/SMTP_PORT=.*/g, 'SMTP_PORT=587');
            
            // Write back to .env file
            fs.writeFileSync(envPath, envContent);
            
            console.log('\n✅ Gmail configuration updated successfully!');
            console.log(`📧 Email will be sent FROM: ${gmailAddress}`);
            console.log('\n📋 Next steps:');
            console.log('1. Restart your server: npm run dev');
            console.log('2. Test the forgot password feature');
            console.log('3. Check your email for the reset link');
            
        } else if (choice === '2') {
            console.log('\n📧 Custom SMTP Setup:');
            console.log('You can use any email service supported by Nodemailer\n');
            
            const smtpHost = await question('Enter SMTP Host (e.g., smtp.gmail.com): ');
            const smtpPort = await question('Enter SMTP Port (e.g., 587): ');
            const smtpUser = await question('Enter SMTP Username/Email: ');
            const smtpPass = await question('Enter SMTP Password: ');
            
            if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
                console.log('❌ All SMTP fields are required!');
                return;
            }
            
            // Update .env file
            const envPath = path.join(__dirname, '..', '.env');
            let envContent = fs.readFileSync(envPath, 'utf8');
            
            // Update SMTP configuration
            envContent = envContent.replace(/SMTP_HOST=.*/g, `SMTP_HOST=${smtpHost}`);
            envContent = envContent.replace(/SMTP_PORT=.*/g, `SMTP_PORT=${smtpPort}`);
            envContent = envContent.replace(/SMTP_USER=.*/g, `SMTP_USER=${smtpUser}`);
            envContent = envContent.replace(/SMTP_PASS=.*/g, `SMTP_PASS=${smtpPass}`);
            
            // Write back to .env file
            fs.writeFileSync(envPath, envContent);
            
            console.log('\n✅ Custom SMTP configuration updated successfully!');
            console.log(`📧 Email will be sent FROM: ${smtpUser}`);
            console.log('\n📋 Next steps:');
            console.log('1. Restart your server: npm run dev');
            console.log('2. Test the forgot password feature');
            console.log('3. Check your email for the reset link');
            
        } else {
            console.log('❌ Invalid choice. Please run the script again.');
        }
        
    } catch (error) {
        console.error('❌ Error setting up email:', error);
    } finally {
        rl.close();
    }
}

setupEmailFinal();
