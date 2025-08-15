# 🚀 Render Deployment Guide for WanderLust

This guide will help you deploy WanderLust to Render with full email functionality.

## 📋 Prerequisites

1. **GitHub Repository**: Your WanderLust project should be on GitHub
2. **Gmail Account**: For email functionality
3. **MongoDB Atlas**: Cloud database (recommended for production)

## 🔧 Step 1: Prepare Your Application

### 1.1 Update package.json
Make sure your `package.json` has the correct start script:
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

### 1.2 Environment Variables
Create a `.env` file locally for testing:
```env
# Database Configuration
ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust

# Session Secret
SECRET=your-super-secret-session-key-change-this-in-production

# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password

# Application URL (will be updated for production)
BASE_URL=http://localhost:8080

# Payment Gateway (if using)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Environment
NODE_ENV=development
PORT=8080
```

## 📧 Step 2: Set Up Gmail for Email

### 2.1 Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification

### 2.2 Generate App Password
1. Go to **Security** → **2-Step Verification** → **App passwords**
2. Select **Mail** as the app
3. Click **Generate**
4. Copy the 16-character password

### 2.3 Test Email Locally
1. Update your `.env` file with Gmail credentials
2. Run: `npm run dev`
3. Test forgot password functionality
4. Check your email for reset links

## 🌐 Step 3: Deploy to Render

### 3.1 Create Render Account
1. Go to [Render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your GitHub repository

### 3.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure the service:

**Basic Settings:**
- **Name**: `wanderlust` (or your preferred name)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free (or paid for better performance)

### 3.3 Environment Variables
Add these environment variables in Render dashboard:

```env
# Database
ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust

# Session Secret
SECRET=your-super-secret-session-key-change-this-in-production

# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password

# Application URL (important for email links)
BASE_URL=https://your-app-name.onrender.com

# Environment
NODE_ENV=production

# Payment Gateway (if using)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### 3.4 Deploy
1. Click **"Create Web Service"**
2. Wait for the build to complete
3. Your app will be available at: `https://your-app-name.onrender.com`

## 🔍 Step 4: Verify Deployment

### 4.1 Test Basic Functionality
1. Visit your deployed URL
2. Test user registration
3. Test user login
4. Test listing creation

### 4.2 Test Email Functionality
1. Go to `/forgot-password`
2. Enter your email address
3. Check your email for the reset link
4. Click the link and reset your password

### 4.3 Check Logs
If something doesn't work:
1. Go to your Render dashboard
2. Click on your service
3. Go to **"Logs"** tab
4. Check for any error messages

## 🛠️ Troubleshooting

### Common Issues:

1. **"Email not configured"**
   - Check if `EMAIL_USER` and `EMAIL_PASS` are set in Render
   - Verify Gmail App Password is correct
   - Ensure 2FA is enabled on Gmail

2. **"Database connection failed"**
   - Check `ATLASDB_URL` in Render environment variables
   - Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`

3. **"Password reset link doesn't work"**
   - Check `BASE_URL` is set to your Render URL
   - Ensure it starts with `https://`

4. **"App crashes on startup"**
   - Check Render logs for error messages
   - Verify all required environment variables are set
   - Ensure `NODE_ENV=production`

### Debug Commands:
```bash
# Check environment variables
echo $EMAIL_USER
echo $BASE_URL

# Test email configuration
npm run setup-email
```

## 🔒 Security Best Practices

### For Production:
1. **Use strong SECRET**: Generate a random 32+ character string
2. **HTTPS only**: Render provides this automatically
3. **Environment variables**: Never commit secrets to Git
4. **Database security**: Use MongoDB Atlas with proper authentication
5. **Email security**: Use App Passwords, not regular passwords

### Environment Variables Checklist:
- [ ] `ATLASDB_URL` - MongoDB connection string
- [ ] `SECRET` - Strong session secret
- [ ] `EMAIL_USER` - Gmail address
- [ ] `EMAIL_PASS` - Gmail App Password
- [ ] `BASE_URL` - Your Render app URL
- [ ] `NODE_ENV` - Set to "production"
- [ ] `RAZORPAY_KEY_ID` - Payment gateway (if using)
- [ ] `RAZORPAY_KEY_SECRET` - Payment gateway secret (if using)

## 📈 Performance Optimization

### For Better Performance:
1. **Upgrade Plan**: Consider paid Render plans for better performance
2. **Database**: Use MongoDB Atlas for better reliability
3. **Caching**: Implement Redis for session storage
4. **CDN**: Use Cloudinary for image optimization
5. **Monitoring**: Set up uptime monitoring

## 🔄 Continuous Deployment

### Automatic Deployments:
1. Render automatically deploys when you push to GitHub
2. Set up branch protection rules
3. Test locally before pushing
4. Monitor deployment logs

### Manual Deployments:
1. Go to Render dashboard
2. Click **"Manual Deploy"**
3. Select branch to deploy
4. Monitor build process

## 📞 Support

If you encounter issues:
1. Check Render logs
2. Verify environment variables
3. Test email configuration locally
4. Check MongoDB Atlas connection
5. Review this troubleshooting guide

---

**Happy deploying! 🌍✈️**

Your WanderLust app should now be live with full email functionality!
