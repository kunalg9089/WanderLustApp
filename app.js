if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./src/app/utils/wrapAsync.js");
const ExpressError = require("./src/app/utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./src/config/schema.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./src/app/models/user.js");

// Route Imports
const listingRouter = require("./src/app/routes/listing.js");
const reviewRouter = require("./src/app/routes/review.js");
const userRouter = require("./src/app/routes/user.js");
const paymentRouter = require("./src/app/routes/payment.js");

// MongoDB Connection
const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.error("DB Connection Error:", err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

// View Engine Setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// 🚀 High-Performance Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add JSON middleware for API routes
app.use(methodOverride("_method"));

// 🚀 Performance: Static file serving with aggressive caching
app.use(express.static(path.join(__dirname, "src/public"), {
    maxAge: '1y', // Cache static assets for 1 year
    etag: false, // Disable ETags for better caching
    lastModified: false, // Disable last-modified headers
    setHeaders: (res, path) => {
        // Set different cache strategies for different file types
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes for HTML
        } else if (path.endsWith('.css') || path.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year for CSS/JS
        } else if (path.match(/\.(jpg|jpeg|png|gif|ico|svg|webp)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year for images
        }
        // Add security headers
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
    }
}));

app.use("/uploads", express.static("uploads", {
    maxAge: '1y',
    setHeaders: (res, path) => {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
})); // serve image files if any

// Session Store
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600, // 1 day
});

store.on("error", (err) => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Middleware for Flash and Current User
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Routes
app.get("/", (req, res) => {
    res.redirect("/listings");
});

// Legal pages routes (must come before user routes)
app.get("/privacy", (req, res) => {
    res.render("legal/privacy");
});

app.get("/terms", (req, res) => {
    res.render("legal/terms");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/api", paymentRouter); // Add payment routes

// 404 Catch-all
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// Error Handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong";
    res.status(statusCode).render("error.ejs", { message: err.message });
});

// Server Start
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
