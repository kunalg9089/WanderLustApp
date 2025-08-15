const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('🧪 Testing Email Configuration...');
console.log('===============================');

// Check if email configuration exists
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('❌ Email configuration not found!');
    console.log('Please check your .env file for SMTP_USER and SMTP_PASS');
    process.exit(1);
}

console.log(`📧 Sender Email: ${process.env.SMTP_USER}`);
console.log(`🔑 Password: ${process.env.SMTP_PASS.substring(0, 4)}****${process.env.SMTP_PASS.substring(process.env.SMTP_PASS.length - 4)}`);
console.log(`🌐 SMTP Host: ${process.env.SMTP_HOST || 'smtp.gmail.com'}`);
console.log(`🔌 SMTP Port: ${process.env.SMTP_PORT || 587}`);
console.log('');

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Test email configuration
async function testEmail() {
    try {
        console.log('🔍 Testing SMTP connection...');
        
        // Verify SMTP connection
        await transporter.verify();
        console.log('✅ SMTP connection successful!');
        
        console.log('');
        console.log('📤 Sending test email...');
        
        // Send test email
        const info = await transporter.sendMail({
            from: `"WanderLust" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER, // Send to yourself as a test
            subject: "🧪 WanderLust Email Test",
            html: `
                <h2>🎉 Email Test Successful!</h2>
                <p>Your WanderLust email configuration is working correctly.</p>
                <p><strong>Sender:</strong> ${process.env.SMTP_USER}</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                <hr>
                <p><em>This is a test email from your WanderLust application.</em></p>
            `
        });
        
        console.log('✅ Test email sent successfully!');
        console.log(`📧 Message ID: ${info.messageId}`);
        console.log('');
        console.log('🎯 Your email configuration is working perfectly!');
        console.log('🚀 Users can now receive password reset emails.');
        
    } catch (error) {
        console.log('❌ Email test failed!');
        console.log('Error:', error.message);
        console.log('');
        console.log('🔧 Troubleshooting tips:');
        console.log('1. Make sure you have 2-Step Verification enabled on your Gmail account');
        console.log('2. Generate a 16-character App Password from Google Account settings');
        console.log('3. Use the App Password (not your regular password) in SMTP_PASS');
        console.log('4. Check that SMTP_USER is your complete Gmail address');
    }
}

testEmail();
