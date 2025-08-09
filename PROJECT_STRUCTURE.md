# 🏗️ WanderLust - MVC Architecture Overview

## 📁 **Industry-Standard Folder Structure**

```
🌟 WanderLust/
├── 📱 src/                           # Source code (All application logic)
│   ├── 🎯 app/                       # Core application
│   │   ├── 🎮 controllers/           # Business Logic Layer
│   │   │   ├── 🏠 listings.js        # Property listings management
│   │   │   ├── 💳 payments.js        # Payment processing
│   │   │   ├── ⭐ reviews.js         # Review system
│   │   │   └── 👤 users.js           # User authentication & management
│   │   │
│   │   ├── 🗃️ models/                # Data Models (Database Schema)
│   │   │   ├── 📋 booking.js         # Booking data structure
│   │   │   ├── 🏠 listing.js         # Property listing schema
│   │   │   ├── ⭐ review.js          # Review schema
│   │   │   └── 👤 user.js            # User profile schema
│   │   │
│   │   ├── 🛣️ routes/                # API Routes (URL Endpoints)
│   │   │   ├── 🏠 listing.js         # /listings/* routes
│   │   │   ├── 💳 payment.js         # /api/payments/* routes
│   │   │   ├── ⭐ review.js          # /reviews/* routes
│   │   │   └── 👤 user.js            # /auth/* routes
│   │   │
│   │   ├── 🛡️ middleware/            # Request Processing
│   │   │   └── ⚙️ middleware.js      # Authentication, validation, etc.
│   │   │
│   │   ├── 🔧 services/              # Business Services (Future)
│   │   │   └── (Payment services, email services, etc.)
│   │   │
│   │   ├── 🛠️ utils/                 # Helper Functions
│   │   │   ├── 📧 emailService.js    # Email notifications
│   │   │   ├── ❌ ExpressError.js    # Custom error handling
│   │   │   └── 🔄 wrapAsync.js       # Async error wrapper
│   │   │
│   │   └── ✅ validators/            # Data Validation (Future)
│   │       └── (Input validation schemas)
│   │
│   ├── ⚙️ config/                    # Configuration Files
│   │   ├── ☁️ cloudConfig.js         # Cloudinary setup
│   │   └── 📋 schema.js              # Joi validation schemas
│   │
│   ├── 🗄️ database/                 # Database Related
│   │   ├── 📊 data.js                # Sample data definitions
│   │   ├── 🔧 index.js               # Database connection
│   │   ├── 🌱 populateSampleData.js  # Database seeding
│   │   └── 📝 sampleData.js          # Test data
│   │
│   ├── 🌐 public/                    # Static Assets (Client-side)
│   │   └── 📂 assets/
│   │       ├── 🎨 css/               # Stylesheets
│   │       │   ├── ⭐ rating.css     # Rating component styles
│   │       │   └── 🎯 style.css      # Main application styles
│   │       ├── 🖼️ images/           # Images & icons
│   │       │   └── 🏠 airbnb.png     # Application logo
│   │       └── 📜 js/                # Client-side JavaScript
│   │           ├── 🗺️ map.js         # Interactive maps
│   │           └── ⚡ script.js       # Main frontend logic
│   │
│   ├── 🎨 views/                     # Templates (Presentation Layer)
│   │   ├── 📄 components/            # Reusable UI components
│   │   ├── 🖼️ layouts/               # Page layouts
│   │   │   └── 📋 boilerplate.ejs    # Main page template
│   │   ├── 📱 pages/                 # Page templates
│   │   │   ├── 🛏️ bookings/          # Booking management pages
│   │   │   ├── 🏠 listings/          # Property listing pages
│   │   │   ├── 📜 legal/             # Privacy & Terms pages
│   │   │   └── 👤 users/             # Authentication pages
│   │   ├── 🧩 partials/              # Shared components
│   │   │   ├── ⚡ flash.ejs          # Flash messages
│   │   │   ├── 🦶 footer.ejs         # Page footer
│   │   │   └── 🧭 navbar.ejs         # Navigation bar
│   │   ├── 🔍 diagnostic.ejs         # System diagnostics
│   │   ├── ❌ error.ejs              # Error pages
│   │   └── 💳 test-payment.ejs       # Payment testing
│   │
│   └── 🧪 tests/                     # Test Suite (Future)
│       ├── 🔧 unit/                  # Unit tests
│       └── 🔗 integration/           # Integration tests
│
├── 📚 docs/                          # Documentation
├── 🔧 scripts/                       # Automation scripts
├── 📋 logs/                          # Application logs
├── 📱 client/                        # Frontend build (if React/Vue)
├── 🚀 app.js                         # Application entry point
├── 📦 package.json                   # Dependencies & scripts
├── 🔒 package-lock.json              # Dependency lock file
├── 📖 README.md                      # Project documentation
├── 💳 PAYMENT_SETUP.md               # Payment integration guide
└── 🛠️ TROUBLESHOOTING.md            # Common issues & solutions
```

---

## 🎯 **MVC Architecture Benefits**

### 🎮 **Model-View-Controller Pattern**

| Layer | Purpose | Location | Responsibility |
|-------|---------|----------|----------------|
| **🗃️ Model** | Data & Business Logic | `src/app/models/` | Database schemas, data validation |
| **🎨 View** | Presentation Layer | `src/views/` | HTML templates, user interface |
| **🎮 Controller** | Application Logic | `src/app/controllers/` | Request handling, business logic |

### ✨ **Key Advantages**

- **🧩 Separation of Concerns**: Each component has a single responsibility
- **🔄 Reusability**: Modular components can be reused across the application
- **🧪 Testability**: Easy to write unit tests for isolated components
- **👥 Team Collaboration**: Multiple developers can work on different layers
- **📈 Scalability**: Easy to add new features without affecting existing code
- **🛠️ Maintainability**: Bug fixes and updates are isolated to specific layers

---

## 🚀 **Getting Started**

### 📋 **Prerequisites**
- Node.js (v16+)
- MongoDB
- npm or yarn

### ⚡ **Quick Start**
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Seed database with sample data
node src/database/index.js

# Start development server
npm start
```

### 🔧 **Available Scripts**
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run test suite (coming soon)
npm run seed       # Populate database with sample data
```

---

## 📡 **API Endpoints**

### 🏠 **Listings**
- `GET /listings` - Browse all properties
- `POST /listings` - Create new listing
- `GET /listings/:id` - View specific property
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Remove listing

### 👤 **Authentication**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/logout` - User logout
- `POST /auth/forgot-password` - Password reset

### 💳 **Payments**
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/verify` - Verify payment
- `GET /api/bookings` - User booking history

### ⭐ **Reviews**
- `POST /listings/:id/reviews` - Add review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

---

## 🛡️ **Security Features**

- 🔐 **Authentication**: Passport.js with local strategy
- 🛡️ **Authorization**: Role-based access control
- 🔒 **Input Validation**: Joi schema validation
- 🚫 **XSS Protection**: Input sanitization
- 💾 **Session Security**: Secure session management
- 🌐 **HTTPS**: SSL/TLS encryption ready

---

## 🎨 **UI/UX Features**

- 📱 **Responsive Design**: Mobile-first approach
- ⚡ **Fast Loading**: Optimized static assets
- 🎭 **Modern UI**: Glass morphism & gradients
- 🔍 **Search & Filter**: Real-time search functionality
- 💳 **Payment Integration**: Razorpay payment gateway
- 📧 **Email Notifications**: Automated email system

---

## 🤝 **Contributing**

1. 🍴 Fork the repository
2. 🌟 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💝 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎯 Open a Pull Request

---

## 📄 **License**

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**🌟 Built with ❤️ using Industry-Standard MVC Architecture 🌟**

*WanderLust - Your Gateway to Amazing Travel Experiences*

</div>
