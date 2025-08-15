#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🌍 WanderLust Email Setup Wizard');
console.log('================================\n');

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function setupEmail() {
    try {
        console.log('📧 Setting up email configuration for password reset...\n');
        
        const emailUser = await question('Enter your Gmail address: ');
        const emailPass = await question('Enter your Gmail App Password (16 characters): ');
        
        if (!emailUser || !emailPass) {
            console.log('❌ Email configuration is required!');
            return;
        }
        
        // Read existing .env file
        const envPath = path.join(__dirname, '..', '.env');
        let envContent = '';
        
        if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, 'utf8');
        }
        
        // Update or add email configuration
        const emailConfig = `# Email Configuration
EMAIL_USER=${emailUser}
EMAIL_PASS=${emailPass}
BASE_URL=http://localhost:8080`;
        
        // Check if email config already exists
        if (envContent.includes('EMAIL_USER=')) {
            // Replace existing email config
            envContent = envContent.replace(/EMAIL_USER=.*/g, `EMAIL_USER=${emailUser}`);
            envContent = envContent.replace(/EMAIL_PASS=.*/g, `EMAIL_PASS=${emailPass}`);
        } else {
            // Add email config
            envContent += '\n\n' + emailConfig;
        }
        
        // Write back to .env file
        fs.writeFileSync(envPath, envContent);
        
        console.log('\n✅ Email configuration updated successfully!');
        console.log('\n📋 Next steps:');
        console.log('1. Restart your server: npm run dev');
        console.log('2. Test the forgot password feature');
        console.log('3. Check your email for the reset link');
        
        console.log('\n🚀 For Render deployment:');
        console.log('1. Go to your Render dashboard');
        console.log('2. Add these environment variables:');
        console.log(`   EMAIL_USER=${emailUser}`);
        console.log(`   EMAIL_PASS=${emailPass}`);
        console.log('   BASE_URL=https://your-app-name.onrender.com');
        console.log('   NODE_ENV=production');
        
    } catch (error) {
        console.error('❌ Error setting up email:', error);
    } finally {
        rl.close();
    }
}

setupEmail();
