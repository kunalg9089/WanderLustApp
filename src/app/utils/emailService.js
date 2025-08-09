const nodemailer = require('nodemailer');

// Create a transporter using Gmail SMTP
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
    try {
        const transporter = createTransporter();
        
        const resetUrl = `${process.env.BASE_URL || 'http://localhost:8080'}/reset-password/${resetToken}`;
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'WanderLust - Password Reset Request',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="margin: 0; font-size: 28px; color: #fff;">🌍 WanderLust</h1>
                        <p style="margin: 10px 0; opacity: 0.9;">Your Adventure Awaits</p>
                    </div>
                    
                    <div style="background: rgba(255, 255, 255, 0.1); padding: 30px; border-radius: 8px; backdrop-filter: blur(10px);">
                        <h2 style="margin: 0 0 20px 0; color: #fff;">Password Reset Request</h2>
                        
                        <p style="margin: 0 0 20px 0; line-height: 1.6;">
                            Hello! We received a request to reset your password for your WanderLust account.
                        </p>
                        
                        <p style="margin: 0 0 20px 0; line-height: 1.6;">
                            If you didn't make this request, you can safely ignore this email.
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
                            This link will expire in 1 hour for security reasons.
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
        console.log('Password reset email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return false;
    }
};

module.exports = {
    sendPasswordResetEmail
}; 