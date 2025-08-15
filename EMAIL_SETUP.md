# 📧 Email Setup Guide for WanderLust

This guide will help you set up email functionality for password reset features.

## 🚀 Quick Start (Development Mode)

If you just want to test the password reset functionality without setting up email:

1. **Create a `.env` file** in your project root:
   ```bash
   cp env.example .env
   ```

2. **Start your server**:
   ```bash
   npm run dev
   ```

3. **Test password reset**:
   - Go to `/forgot-password`
   - Enter your email
   - Check the server console for the reset link
   - Copy and paste the link in your browser

## 📧 Production Email Setup (Gmail)

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled

### Step 2: Generate App Password
1. Go to **Security** → **2-Step Verification** → **App passwords**
2. Select **Mail** as the app
3. Click **Generate**
4. Copy the 16-character password

### Step 3: Configure Environment Variables
Edit your `.env` file:
```env
# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
BASE_URL=https://your-domain.com
```

### Step 4: Test Email Functionality
1. Restart your server
2. Go to `/forgot-password`
3. Enter your email
4. Check your inbox for the reset email

## 🔧 Alternative Email Services

### Using Other SMTP Providers
If you prefer other email services, modify the email configuration:

```env
# For other providers (e.g., Outlook, Yahoo, etc.)
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@provider.com
EMAIL_PASS=your-password
```

### Using Email Services (SendGrid, Mailgun, etc.)
For production applications, consider using dedicated email services:

#### SendGrid Example:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

## 🛠️ Troubleshooting

### Common Issues:

1. **"Failed to send reset email"**
   - Check if `.env` file exists
   - Verify email credentials
   - Ensure 2FA is enabled for Gmail

2. **"Authentication failed"**
   - Use App Password, not regular password
   - Check if 2FA is enabled
   - Verify email address is correct

3. **"Connection timeout"**
   - Check internet connection
   - Verify SMTP settings
   - Try different port (587 or 465)

### Development Mode Features:
- ✅ Password reset links shown in console
- ✅ No email configuration required
- ✅ Full password strength validation
- ✅ Secure token generation

### Production Features:
- ✅ Real email delivery
- ✅ Professional email templates
- ✅ Secure token expiration (1 hour)
- ✅ Password strength requirements

## 🔒 Security Features

### Password Requirements:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

### Security Measures:
- Tokens expire after 1 hour
- Tokens are cryptographically secure
- Passwords are hashed using bcrypt
- Weak passwords are blocked
- CSRF protection enabled

## 📱 Email Template Features

The password reset email includes:
- 🌍 WanderLust branding
- 🔗 One-click reset button
- 📝 Manual link for copy-paste
- ⏰ Expiration warning
- 🎨 Professional design

## 🚀 Deployment Notes

For production deployment:
1. Set `NODE_ENV=production`
2. Use HTTPS URLs in `BASE_URL`
3. Configure proper email service
4. Set strong `SECRET` value
5. Enable proper logging

## 📞 Support

If you encounter issues:
1. Check server console for error messages
2. Verify environment variables
3. Test email configuration
4. Review this troubleshooting guide

---

**Happy coding! 🌍✈️**
