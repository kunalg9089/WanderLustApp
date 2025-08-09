# 🌟 WanderLust - Travel & Adventure Platform

A modern travel and adventure platform built with **industry-standard MVC architecture** using Node.js, Express, and MongoDB.

> 📁 **[View Detailed Project Structure →](PROJECT_STRUCTURE.md)**

## Features

- **User Authentication**: Sign up, login, and logout functionality
- **Forgot Password**: Complete password reset functionality with email verification
- **Modern UI**: Beautiful, responsive design with animations and gradients
- **Listings**: Browse and manage travel listings
- **Search & Filtering**: Advanced search and category filtering functionality
- **Reviews**: Rate and review travel experiences

## Search & Filtering Functionality

The application now includes comprehensive search and filtering capabilities:

### Search Features:
- **Real-time Search**: Search listings by title, location, country, or description
- **Debounced Input**: Automatic search after 500ms of typing (3+ characters)
- **Search Results**: Clear display of search results with count
- **No Results Handling**: User-friendly messages when no listings are found

### Category Filtering:
- **12 Categories**: Trending, Rooms, Iconic Cities, Mountains, Castles, Arctic Pools, Camping, Farms, Arctic, Domes, Boats
- **Active States**: Visual indication of currently selected category
- **Combined Filtering**: Search and category filters work together
- **Clear Filters**: Easy way to reset all filters

### UI Features:
- **Modern Search Bar**: Beautiful search input with clear button
- **Category Buttons**: Interactive filter buttons with hover effects
- **Results Counter**: Shows number of listings found
- **Responsive Design**: Works perfectly on mobile and desktop
- **Smooth Transitions**: Animated category switching

## Forgot Password Functionality

The application now includes a complete forgot password system with the following features:

### How it works:
1. User clicks "Forgot your password?" on the login page
2. User enters their email address
3. System generates a secure reset token and sends an email
4. User clicks the link in the email to reset their password
5. User enters a new password and confirms it
6. Password is updated and user can login with the new password

### Email Setup

To enable email functionality, you need to configure your email settings in the `.env` file:

```env
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
BASE_URL=http://localhost:8080
```

#### Gmail Setup Instructions:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in your `EMAIL_PASS` environment variable

3. **Alternative Email Services**:
   - You can modify the email service in `utils/emailService.js`
   - Supported services: Gmail, Outlook, Yahoo, etc.

### Security Features

- **Secure Tokens**: 32-byte random tokens for password reset
- **Token Expiration**: Reset links expire after 1 hour
- **One-time Use**: Tokens are invalidated after use
- **Email Verification**: Only registered email addresses can request resets

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd WanderLust
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file
cp .env.example .env

# Add your configuration
ATLASDB_URL=your-mongodb-connection-string
SECRET=your-session-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
BASE_URL=http://localhost:8080
```

4. Start the server:
```bash
npm start
```

## Sample Data Setup

To test the search and filtering functionality, you can populate your database with sample listings:

```bash
# Run the sample data script
node init/populateSampleData.js
```

This will add 12 sample listings across different categories to help you test the functionality.

## UI Features

### Modern Design Elements:
- **Gradient Backgrounds**: Beautiful purple-blue gradients
- **Glass Morphism**: Translucent cards with backdrop blur
- **Floating Animations**: Subtle floating shapes in the background
- **Smooth Transitions**: Hover effects and button animations
- **Password Strength Indicator**: Visual feedback for password strength
- **Show/Hide Password**: Toggle password visibility
- **Loading States**: Button loading animations during form submission

### Responsive Design:
- Mobile-friendly layouts
- Flexible card designs
- Touch-friendly buttons and inputs

## Routes

### Authentication Routes:
- `GET /login` - Login page
- `POST /login` - Login form submission
- `GET /signup` - Signup page
- `POST /signup` - Signup form submission
- `GET /logout` - Logout user

### Forgot Password Routes:
- `GET /forgot-password` - Forgot password page
- `POST /forgot-password` - Request password reset
- `GET /reset-password/:token` - Reset password page
- `POST /reset-password/:token` - Reset password form submission

### Listings Routes:
- `GET /listings` - Browse all listings (with search & filtering)
- `GET /listings/new` - Create new listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View individual listing
- `GET /listings/:id/edit` - Edit listing form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: Passport.js, Passport-Local-Mongoose
- **Email**: Nodemailer
- **Frontend**: EJS templates, CSS3, JavaScript
- **Styling**: Custom CSS with modern design patterns
- **Security**: bcrypt (via passport-local-mongoose), crypto for tokens
- **Search**: MongoDB text search with regex patterns

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License. 