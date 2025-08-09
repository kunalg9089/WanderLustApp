# Razorpay Payment Integration Setup Guide

This guide will help you set up real-time payment functionality using Razorpay in your WanderLust travel booking website.

## 🚀 Features Implemented

### ✅ Payment Integration
- **Razorpay Checkout**: Seamless payment experience with multiple payment methods
- **Multiple Payment Options**: Credit/debit cards, UPI, wallets, net banking
- **Secure Payment Processing**: Server-side payment verification
- **Real-time Payment Status**: Instant feedback on payment success/failure

### ✅ Booking System
- **Book Now Button**: Added to each listing card
- **Booking Modal**: Beautiful modal for date selection and guest details
- **Price Calculation**: Automatic calculation with GST (18%)
- **Date Validation**: Prevents booking in the past
- **Guest Selection**: Choose number of guests (1-6+)

### ✅ User Experience
- **Modern UI**: Beautiful booking interface with animations
- **Responsive Design**: Works perfectly on all devices
- **Loading States**: Visual feedback during payment processing
- **Success Confirmation**: Detailed booking confirmation with IDs
- **Booking History**: Complete booking management system

### ✅ Backend Features
- **Booking Model**: Comprehensive booking data structure
- **Payment Verification**: Secure signature verification
- **Booking Management**: View, cancel, and track bookings
- **User Authentication**: Login required for booking

## 🔧 Setup Instructions

### 1. Environment Variables

Add the following variables to your `.env` file:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Existing variables (keep these)
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
BASE_URL=http://localhost:8080
```

### 2. Razorpay Account Setup

#### Step 1: Create Razorpay Account
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up for a new account
3. Complete your business verification

#### Step 2: Get API Keys
1. Go to **Settings** → **API Keys**
2. Generate a new key pair
3. Copy the **Key ID** and **Key Secret**

#### Step 3: Test Mode (Recommended for Development)
- Use test mode keys for development
- Test cards: 4111 1111 1111 1111 (Visa)
- Test UPI: success@razorpay

### 3. Install Dependencies

```bash
npm install razorpay
```

### 4. Database Setup

The booking system automatically creates the necessary database collections. Make sure your MongoDB connection is working.

## 📁 File Structure

```
WanderLust/
├── models/
│   ├── booking.js          # Booking data model
│   └── listing.js          # Updated with category field
├── controllers/
│   └── payments.js         # Payment and booking logic
├── routes/
│   └── payment.js          # Payment API routes
├── views/
│   ├── listings/
│   │   └── index.ejs       # Updated with booking functionality
│   └── bookings/
│       └── index.ejs       # Booking history page
├── app.js                  # Updated with payment routes
└── views/includes/
    └── navbar.ejs          # Updated with booking link
```

## 🎯 How to Use

### For Users:

1. **Browse Listings**: Visit `/listings` to see all available properties
2. **Search & Filter**: Use the search bar and category filters
3. **Book a Stay**: Click "Book Now" on any listing
4. **Select Dates**: Choose check-in and check-out dates
5. **Enter Details**: Select number of guests and add special requests
6. **Make Payment**: Click "Proceed to Payment" to open Razorpay
7. **Complete Booking**: Pay using any preferred method
8. **View Bookings**: Go to "My Bookings" to manage reservations

### For Developers:

#### Testing the Payment Flow:

1. **Start the server**:
   ```bash
   npm start
   ```

2. **Create a test user** (if needed):
   - Sign up at `/signup`
   - Login at `/login`

3. **Test booking flow**:
   - Go to `/listings`
   - Click "Book Now" on any listing
   - Fill in booking details
   - Use test payment details

#### Test Payment Details:

**Credit Card (Visa)**:
- Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits

**UPI**:
- ID: success@razorpay

**Net Banking**:
- Any bank (test mode)

## 🔒 Security Features

### Payment Security:
- **Server-side Order Creation**: Orders created securely on backend
- **Signature Verification**: Payment verification using HMAC SHA256
- **Environment Variables**: Sensitive keys stored securely
- **Input Validation**: All booking data validated

### Booking Security:
- **User Authentication**: Login required for booking
- **Ownership Verification**: Users can only access their own bookings
- **Date Validation**: Prevents invalid date selections
- **Amount Validation**: Server-side price calculation

## 📊 API Endpoints

### Payment Endpoints:
- `POST /api/create-order` - Create Razorpay order
- `POST /api/verify-payment` - Verify payment signature
- `GET /api/bookings` - Get user's booking history
- `GET /api/bookings/:id` - Get specific booking details
- `PUT /api/bookings/:id/cancel` - Cancel booking

### User Endpoints:
- `GET /bookings` - Booking history page

## 🎨 UI Components

### Booking Modal:
- **Listing Preview**: Shows property image and details
- **Date Selection**: Check-in and check-out picker
- **Guest Selection**: Dropdown for number of guests
- **Price Summary**: Real-time calculation with GST
- **Special Requests**: Optional text area

### Booking History:
- **Filter Tabs**: All, Confirmed, Pending, Completed, Cancelled
- **Booking Cards**: Detailed booking information
- **Action Buttons**: Cancel booking, view listing
- **Status Indicators**: Color-coded booking status

## 🚨 Troubleshooting

### Common Issues:

1. **Payment Not Processing**:
   - Check Razorpay keys in `.env`
   - Verify internet connection
   - Check browser console for errors

2. **Booking Modal Not Opening**:
   - Ensure user is logged in
   - Check JavaScript console
   - Verify Razorpay script is loaded

3. **Database Errors**:
   - Check MongoDB connection
   - Verify booking model is imported
   - Check user authentication

### Debug Mode:

Add this to your `.env` for detailed logs:
```env
DEBUG=razorpay:*
```

## 🔄 Future Enhancements

### Planned Features:
- **Email Confirmations**: Booking confirmation emails
- **Refund Processing**: Automatic refund handling
- **Booking Calendar**: Visual availability calendar
- **Multiple Currency**: Support for different currencies
- **Advanced Filters**: Price range, amenities filters
- **Reviews Integration**: Post-stay reviews

### Optional Additions:
- **Webhook Integration**: Real-time payment updates
- **Analytics Dashboard**: Booking analytics
- **Admin Panel**: Booking management for hosts
- **Mobile App**: Native mobile application

## 📞 Support

For issues related to:
- **Razorpay Integration**: Check [Razorpay Documentation](https://razorpay.com/docs/)
- **Application Issues**: Check server logs and browser console
- **Database Issues**: Verify MongoDB connection and models

## 🎉 Success!

Your WanderLust travel booking website now has complete payment functionality! Users can:

✅ Browse and search listings  
✅ Filter by categories  
✅ Book stays with real-time payment  
✅ View booking history  
✅ Cancel bookings  
✅ Receive payment confirmations  

The system is production-ready with proper security measures and user-friendly interface. 