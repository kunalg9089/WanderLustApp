# Payment System Troubleshooting Guide

If you're having issues with the payment functionality, follow this step-by-step guide to identify and fix the problem.

## 🔍 Quick Diagnosis

### Step 1: Check Server Logs
Start your server and look for these messages in the console:

```
✅ Razorpay keys configured successfully
```
or
```
❌ Razorpay keys not configured! Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file
```

### Step 2: Test Payment System
Visit `/test-payment` (while logged in) to run automated tests.

### Step 3: Check Browser Console
Open browser developer tools (F12) and check the Console tab for any JavaScript errors.

## 🚨 Common Issues & Solutions

### Issue 1: "Payment gateway not loaded" Error

**Symptoms:**
- Error message: "Payment gateway not loaded. Please refresh the page and try again."
- Razorpay modal doesn't open

**Solutions:**
1. **Check Razorpay Script Loading:**
   - Open browser developer tools
   - Go to Network tab
   - Refresh the page
   - Look for `checkout.js` from Razorpay
   - If not found, check your internet connection

2. **Verify Script in Layout:**
   - Check `views/layouts/boilerplate.ejs`
   - Ensure this line exists: `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>`

3. **Clear Browser Cache:**
   - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### Issue 2: "Error creating order" Message

**Symptoms:**
- Alert shows "Error creating order: [message]"
- Booking modal doesn't proceed to payment

**Solutions:**
1. **Check Environment Variables:**
   ```bash
   # In your .env file, ensure these exist:
   RAZORPAY_KEY_ID=rzp_test_your_key_here
   RAZORPAY_KEY_SECRET=your_secret_here
   ```

2. **Verify Razorpay Keys:**
   - Go to Razorpay Dashboard
   - Check if keys are active
   - Ensure you're using test keys for development

3. **Check Server Logs:**
   - Look for detailed error messages in console
   - Common issues: invalid listing ID, missing fields

### Issue 3: "Missing required fields" Error

**Symptoms:**
- Alert shows "Please fill in all required fields"
- Form validation fails

**Solutions:**
1. **Fill All Required Fields:**
   - Check-in date
   - Check-out date
   - Number of guests

2. **Check Date Selection:**
   - Ensure check-out is after check-in
   - Ensure dates are not in the past

### Issue 4: Payment Modal Opens But Payment Fails

**Symptoms:**
- Razorpay modal opens
- Payment process fails
- No success confirmation

**Solutions:**
1. **Use Test Payment Details:**
   ```
   Card Number: 4111 1111 1111 1111
   Expiry: Any future date
   CVV: Any 3 digits
   ```

2. **Check Network Connection:**
   - Ensure stable internet connection
   - Try different payment method (UPI: success@razorpay)

3. **Verify Payment Verification:**
   - Check server logs for verification errors
   - Ensure webhook/verification endpoint is working

### Issue 5: "User not authenticated" Error

**Symptoms:**
- Cannot access booking functionality
- Redirected to login page

**Solutions:**
1. **Login First:**
   - Go to `/login`
   - Sign in with valid credentials
   - Try booking again

2. **Check Session:**
   - Clear browser cookies
   - Try in incognito/private mode
   - Check if session is maintained

## 🔧 Advanced Troubleshooting

### Debug Mode
Add this to your `.env` file for detailed logs:
```env
DEBUG=razorpay:*
NODE_ENV=development
```

### Test API Endpoints
Test these endpoints directly:

1. **Test Configuration:**
   ```bash
   GET /api/test
   ```

2. **Create Order (with curl):**
   ```bash
   curl -X POST http://localhost:8080/api/create-order \
     -H "Content-Type: application/json" \
     -H "Cookie: your_session_cookie" \
     -d '{
       "listingId": "your_listing_id",
       "checkIn": "2024-12-25",
       "checkOut": "2024-12-27",
       "guestCount": "2"
     }'
   ```

### Database Issues
1. **Check MongoDB Connection:**
   - Verify `ATLASDB_URL` in `.env`
   - Check if database is accessible

2. **Verify Models:**
   - Ensure `Booking` model is imported
   - Check if collections exist

### Frontend Issues
1. **JavaScript Errors:**
   - Open browser console (F12)
   - Look for red error messages
   - Check for missing functions or variables

2. **Modal Issues:**
   - Ensure modal HTML is present
   - Check CSS for display issues
   - Verify event listeners are attached

## 📋 Testing Checklist

Before reporting an issue, verify:

- [ ] Server starts without errors
- [ ] Razorpay keys are configured in `.env`
- [ ] User is logged in
- [ ] Listing exists in database
- [ ] Browser console has no errors
- [ ] Network requests are successful
- [ ] Test payment details are used

## 🆘 Getting Help

If you're still having issues:

1. **Check Server Logs:**
   - Copy all console output
   - Look for error messages

2. **Browser Console:**
   - Open developer tools
   - Copy any error messages

3. **Environment:**
   - Node.js version: `node --version`
   - NPM version: `npm --version`
   - Operating system

4. **Steps to Reproduce:**
   - Exact steps that cause the issue
   - What you expected vs what happened

## 🎯 Quick Fixes

### Most Common Solutions:

1. **Restart Server:**
   ```bash
   npm start
   ```

2. **Clear Browser Cache:**
   - Hard refresh: Ctrl+F5

3. **Check .env File:**
   - Ensure no extra spaces
   - Verify key format

4. **Test with Sample Data:**
   - Use the sample data script
   - Test with known working listing

5. **Update Dependencies:**
   ```bash
   npm update
   ```

## ✅ Success Indicators

When everything is working correctly, you should see:

1. **Server Console:**
   ```
   ✅ Razorpay keys configured successfully
   📝 Creating order with data: {...}
   ✅ Found listing: [listing title]
   ✅ Razorpay order created: [order_id]
   ✅ Booking saved to database: [booking_id]
   ```

2. **Browser Console:**
   ```
   Creating order with data: {...}
   Response status: 200
   Order creation result: {success: true, ...}
   Razorpay options: {...}
   ```

3. **User Experience:**
   - Booking modal opens
   - Razorpay payment modal appears
   - Payment completes successfully
   - Success confirmation shows

If you see these indicators, your payment system is working correctly! 🎉 