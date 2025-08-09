const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payments");
const { isLoggedIn } = require("../middleware/middleware.js");

// All payment routes require authentication
router.use(isLoggedIn);

// Test endpoint to verify Razorpay configuration
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Payment API is working",
        razorpay_configured: !!process.env.RAZORPAY_KEY_ID && !!process.env.RAZORPAY_KEY_SECRET,
        key_id: process.env.RAZORPAY_KEY_ID ? "Configured" : "Not configured",
        user: req.user ? req.user.username : "Not logged in"
    });
});

// Create Razorpay order
router.post("/create-order", paymentController.createOrder);

// Verify payment
router.post("/verify-payment", paymentController.verifyPayment);

// Get user's booking history
router.get("/bookings", paymentController.getUserBookings);

// Get specific booking details
router.get("/bookings/:bookingId", paymentController.getBookingDetails);

// Cancel booking
router.put("/bookings/:bookingId/cancel", paymentController.cancelBooking);

module.exports = router; 