const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware/middleware.js");
const Booking = require("../models/booking.js");

const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));


router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), userController.login)

router.get("/logout", userController.logout);

// Forgot Password Routes
router.route("/forgot-password")
.get(userController.renderForgotPasswordForm)
.post(wrapAsync(userController.forgotPassword));

router.route("/reset-password/:token")
.get(userController.renderResetPasswordForm)
.post(wrapAsync(userController.resetPassword));

// Booking History Route
router.get("/bookings", isLoggedIn, wrapAsync(async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate('listing')
        .sort({ createdAt: -1 });
    
    res.render("bookings/index.ejs", { bookings });
}));

// Payment Test Route
router.get("/test-payment", isLoggedIn, (req, res) => {
    res.render("test-payment.ejs");
});

// Diagnostic Route
router.get("/diagnostic", isLoggedIn, (req, res) => {
    res.render("diagnostic.ejs");
});

module.exports = router;