#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🎯 FINAL STEP: Complete Email Setup');
console.log('===================================\n');

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function finalEmailSetup() {
    try {
        console.log('📧 Current Configuration:');
        console.log('- FROM: kunalgaikwad5533@gmail.com ✅');
        console.log('- TO: User\'s email (dynamic) ✅');
        console.log('- SMTP_PASS: your-smtp-password ❌ (NEEDS UPDATE)\n');
        
        console.log('🔑 You need to get your Gmail App Password:');
        console.log('1. Go to: https://myaccount.google.com/apppasswords');
        console.log('2. Sign in with: kunalgaikwad5533@gmail.com');
        console.log('3. Enable 2-Factor Authentication if not enabled');
        console.log('4. Generate App Password for "Mail"');
        console.log('5. Copy the 16-character password\n');
        
        const appPassword = await question('Enter your 16-character Gmail App Password: ');
        
        if (!appPassword) {
            console.log('❌ App Password is required!');
            return;
        }
        
        if (appPassword.length !== 16) {
            console.log('❌ App Password must be exactly 16 characters!');
            console.log(`Current length: ${appPassword.length} characters`);
            return;
        }
        
        // Update .env file
        const envPath = path.join(__dirname, '..', '.env');
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        // Update SMTP_PASS
        envContent = envContent.replace(/SMTP_PASS=.*/g, `SMTP_PASS=${appPassword}`);
        
        // Write back to .env file
        fs.writeFileSync(envPath, envContent);
        
        console.log('\n✅ SUCCESS! Email configuration complete!');
        console.log('\n📧 Email Flow:');
        console.log('1. User enters email → System sends FROM kunalgaikwad5533@gmail.com TO user\'s email');
        console.log('2. User clicks reset link → Redirected to reset password page');
        console.log('3. User creates new password → Password updated in database');
        
        console.log('\n🧪 Test the flow:');
        console.log('1. Restart server: npm run dev');
        console.log('2. Go to: http://localhost:8080/forgot-password');
        console.log('3. Enter an email that exists in your database');
        console.log('4. Check your email for the reset link');
        console.log('5. Click the link and reset your password');
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        rl.close();
    }
}

finalEmailSetup();
