# 🌟 WanderLust - Travel & Adventure Platform

<div align="center">

![WanderLust Logo](https://img.shields.io/badge/WanderLust-Travel%20Platform-blue?style=for-the-badge&logo=compass&logoColor=white)

A modern, full-stack travel booking platform built with **industry-standard MVC architecture** using Node.js, Express, and MongoDB.

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [🔧 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🌐 API Routes](#-api-routes)
- [📱 Features Overview](#-features-overview)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🔐 **Authentication & Security**
- User registration and login with Passport.js
- Password reset functionality with email verification
- Session management with secure cookies
- Input validation and sanitization

### 🏠 **Property Management**
- Create, edit, and delete property listings
- Image upload with Cloudinary integration
- Advanced search and filtering capabilities
- Category-based property browsing

### 💳 **Booking & Payments**
- Secure payment processing with Razorpay
- Real-time booking management
- Payment verification and confirmation
- Booking history and management

### ⭐ **Reviews & Ratings**
- User reviews and ratings system
- Review management (edit/delete own reviews)
- Average rating calculations

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Modern glass morphism design
- Smooth animations and transitions
- Professional authentication forms

---

## 🏗️ Architecture

This project follows **industry-standard MVC (Model-View-Controller) architecture**:

```
📁 src/
├── 🎮 app/                    # Core application logic
│   ├── 📋 models/             # Data models (MongoDB schemas)
│   ├── 🎨 views/              # EJS templates
│   ├── 🎮 controllers/        # Business logic
│   ├── 🛣️ routes/             # API endpoints
│   ├── 🛡️ middleware/         # Authentication & validation
│   ├── 🔧 services/           # Business services
│   └── 🛠️ utils/              # Helper functions
├── ⚙️ config/                 # Configuration files
├── 🗄️ database/              # Database initialization
├── 🌐 public/                # Static assets (CSS, JS, images)
└── 🧪 tests/                 # Test suites
```

---

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Visit** `http://localhost:8080`

---

## 🔧 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Step-by-Step Setup

1. **Clone & Install**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   npm install
   ```

2. **Database Setup**
   ```bash
   # Option 1: Use MongoDB Atlas (Recommended)
   # Sign up at https://www.mongodb.com/atlas
   # Create a cluster and get your connection string
   
   # Option 2: Use Local MongoDB
   # Install MongoDB locally and start the service
   ```

3. **Environment Configuration**
   ```bash
   # Create environment file
   cp .env.example .env
   
   # Edit .env file with your settings (see Configuration section)
   ```

4. **Sample Data (Optional)**
   ```bash
   # Populate database with sample listings
   npm run seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

---


### 📧 Email Setup (Gmail)
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings → Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this in `EMAIL_PASS`

### 💳 Payment Setup (Optional)
1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your API keys from the dashboard
3. Add keys to `.env` file

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication middleware

### Frontend
- **EJS** - Templating engine
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icons
- **Custom CSS** - Modern design with animations

### Services & Tools
- **Cloudinary** - Image hosting and optimization
- **Razorpay** - Payment processing
- **Nodemailer** - Email sending
- **Connect-Flash** - Flash messages
- **Express-Session** - Session management

---

## 📁 Project Structure

```
WanderLust/
├── 📱 src/                          # Source code
│   ├── app/                      # Core application
│   │   ├── controllers/          # Business logic
│   │   ├── models/               # Data schemas
│   │   ├── routes/               # API endpoints
│   │   ├── middleware/           # Auth & validation
│   │   └── utils/                # Helper functions
│   ├── config/                   # Configuration
│   ├── database/                # DB initialization
│   ├── public/                   # Static assets
│   └── views/                    # EJS templates
├── docs/                         # Documentation
├── scripts/                      # Automation scripts
├── logs/                         # Application logs
├── app.js                        # Entry point
├── package.json                  # Dependencies
└── README.md                     # This file
```

---

## 🌐 API Routes

### 🔐 Authentication
```
POST   /signup           Register new user
POST   /login            User login
GET    /logout           User logout
POST   /forgot-password  Request password reset
POST   /reset-password   Reset password with token
```

### 🏠 Listings
```
GET    /listings         Browse all listings (with search & filters)
POST   /listings         Create new listing
GET    /listings/new     New listing form
GET    /listings/:id     View specific listing
PUT    /listings/:id     Update listing
DELETE /listings/:id     Delete listing
GET    /listings/:id/edit Edit listing form
```

### ⭐ Reviews
```
POST   /listings/:id/reviews           Add review
DELETE /listings/:id/reviews/:reviewId Delete review
```

### 💳 Bookings & Payments
```
POST   /api/payments/create-order      Create payment order
POST   /api/payments/verify            Verify payment
GET    /bookings                       User booking history
```

### 📜 Legal
```
GET    /privacy          Privacy policy
GET    /terms            Terms of service
```

---

## 📱 Features Overview

### 🔍 **Search & Filtering**
- **Real-time Search**: Search by title, location, or description
- **Category Filters**: 12+ categories (Mountains, Beaches, Cities, etc.)
- **Combined Filtering**: Search + category filters work together
- **Smart Results**: Debounced search with result counts

### 🎨 **Modern UI Design**
- **Responsive Layout**: Mobile-first design approach
- **Glass Morphism**: Modern translucent design elements
- **Smooth Animations**: Hover effects and transitions
- **Professional Forms**: Clean authentication interfaces

### 🔒 **Security Features**
- **Input Validation**: Server-side validation with Joi
- **XSS Protection**: Input sanitization
- **Secure Sessions**: HTTP-only cookies
- **Password Hashing**: bcrypt encryption
- **CSRF Protection**: Cross-site request forgery prevention

### 📧 **Email System**
- **Welcome Emails**: User registration confirmation
- **Password Reset**: Secure token-based password recovery
- **Booking Confirmations**: Email receipts for bookings

---

## 🚀 Available Scripts

```bash
npm start              # Start production server
npm run dev            # Start development server with nodemon
npm run seed           # Populate database with sample data
npm test               # Run test suite (coming soon)
npm run format         # Format code with Prettier
```

---

## 🔧 Development Setup

### Local Development
```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

### Production Deployment
```bash
# Install production dependencies only
npm ci --only=production

# Start production server
npm start


**Payment Integration Issues**
```bash
# Verify Razorpay keys in .env
# Check if keys are for correct environment (test/live)
```


## 🙏 Acknowledgments

- **Bootstrap** for the responsive UI framework
- **Font Awesome** for beautiful icons
- **Cloudinary** for image hosting solutions
- **Razorpay** for secure payment processing
- **MongoDB Atlas** for cloud database hosting

---
