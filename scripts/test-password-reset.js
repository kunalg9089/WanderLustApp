const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

console.log('🧪 Testing Password Reset Email Functionality...');
console.log('===============================================');

// Test email configuration
const testEmail = 'kunalgaikwad5533@gmail.com'; // Your email for testing

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Generate a test reset token
const generateTestToken = () => {
    const payload = {
        userId: 'test-user-id',
        email: testEmail,
        type: 'password_reset'
    };
    
    const options = {
        expiresIn: '15m',
        issuer: 'wanderlust',
        audience: 'wanderlust_users'
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// Test password reset email
async function testPasswordResetEmail() {
    try {
        console.log('📧 Testing password reset email...');
        console.log(`📬 Sending to: ${testEmail}`);
        console.log(`🌐 Base URL: ${process.env.BASE_URL || 'http://localhost:8081'}`);
        console.log('');
        
        const resetToken = generateTestToken();
        const resetUrl = `${process.env.BASE_URL || 'http://localhost:8081'}/reset-password?token=${resetToken}`;
        
        console.log('🔗 Reset URL:', resetUrl);
        console.log('');
        
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: testEmail,
            subject: '🧪 Test: Reset Your WanderLust Password',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="margin: 0; font-size: 28px; color: #fff;">🧪 TEST EMAIL</h1>
                        <h2 style="margin: 0; font-size: 24px; color: #fff;">🌍 WanderLust</h2>
                        <p style="margin: 10px 0; opacity: 0.9;">Password Reset Test</p>
                    </div>
                    
                    <div style="background: rgba(255, 255, 255, 0.1); padding: 30px; border-radius: 8px; backdrop-filter: blur(10px);">
                        <h2 style="margin: 0 0 20px 0; color: #fff;">Password Reset Request</h2>
                        
                        <p style="margin: 0 0 20px 0; line-height: 1.6;">
                            This is a TEST email for password reset functionality.
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" 
                               style="display: inline-block; background: linear-gradient(45deg, #ff6b6b, #ee5a24); 
                                      color: white; padding: 15px 30px; text-decoration: none; 
                                      border-radius: 25px; font-weight: bold; font-size: 16px;
                                      box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s ease;">
                                Reset My Password
                            </a>
                        </div>
                        
                        <p style="margin: 20px 0 0 0; font-size: 14px; opacity: 0.8;">
                            This link will expire in 15 minutes for security reasons.
                        </p>
                        
                        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">
                            If the button doesn't work, copy and paste this link into your browser:
                        </p>
                        <p style="margin: 5px 0 0 0; font-size: 12px; word-break: break-all; opacity: 0.7;">
                            ${resetUrl}
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
                        <p style="margin: 0; font-size: 12px; opacity: 0.7;">
                            © 2024 WanderLust. All rights reserved.
                        </p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Password reset test email sent successfully!');
        console.log(`📧 Message ID: ${info.messageId}`);
        console.log('');
        console.log('🎯 Password reset functionality is working!');
        console.log('📬 Check your email for the test password reset link');
        console.log('');
        console.log('🚀 Your application is ready for password reset testing');
        console.log('🌐 Visit: http://localhost:8081/forgot-password');
        
    } catch (error) {
        console.log('❌ Password reset test failed!');
        console.log('Error:', error.message);
        console.log('');
        console.log('🔧 Check your email configuration in .env file');
    }
}

testPasswordResetEmail();

