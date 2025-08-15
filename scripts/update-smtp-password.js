const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔧 SMTP Password Update Tool');
console.log('============================');
console.log('');
console.log('⚠️  IMPORTANT: You need a 16-character Gmail App Password, not your regular password!');
console.log('');
console.log('To get an App Password:');
console.log('1. Go to https://myaccount.google.com/');
console.log('2. Security → 2-Step Verification (enable if not already)');
console.log('3. App passwords → Generate new app password for "Mail"');
console.log('4. Copy the 16-character password (remove spaces)');
console.log('');

rl.question('Enter your 16-character Gmail App Password: ', (newPassword) => {
    const envPath = path.join(__dirname, '..', '.env');
    
    try {
        // Read current .env content
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        // Update SMTP_PASS
        envContent = envContent.replace(
            /SMTP_PASS=.*/,
            `SMTP_PASS=${newPassword.trim()}`
        );
        
        // Write back to .env file
        fs.writeFileSync(envPath, envContent);
        
        console.log('✅ SMTP password updated successfully!');
        console.log('🚀 You can now restart the application with: npm start');
        
    } catch (error) {
        console.error('❌ Error updating .env file:', error.message);
    }
    
    rl.close();
});

