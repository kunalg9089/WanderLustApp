const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/booking');
const Listing = require('../models/listing');

// Check if Razorpay keys are configured
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error('❌ Razorpay keys not configured! Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file');
} else {
    console.log('✅ Razorpay keys configured successfully');
}

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
module.exports.createOrder = async (req, res) => {
    try {
        console.log('📝 Creating order with data:', req.body);
        
        const { listingId, checkIn, checkOut, guestCount, specialRequests } = req.body;
        
        // Validate required fields
        if (!listingId || !checkIn || !checkOut || !guestCount) {
            console.log('❌ Missing required fields:', { listingId, checkIn, checkOut, guestCount });
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Get listing details
        const listing = await Listing.findById(listingId);
        if (!listing) {
            console.log('❌ Listing not found:', listingId);
            return res.status(404).json({
                success: false,
                message: 'Listing not found'
            });
        }

        console.log('✅ Found listing:', listing.title);

        // Calculate dates and nights
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const numberOfNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        
        if (numberOfNights < 1) {
            console.log('❌ Invalid date range:', { checkIn, checkOut, numberOfNights });
            return res.status(400).json({
                success: false,
                message: 'Check-out date must be after check-in date'
            });
        }

        // Calculate total amount
        const totalAmount = listing.price * numberOfNights * 100; // Convert to paise for Razorpay

        console.log('💰 Price calculation:', {
            pricePerNight: listing.price,
            numberOfNights,
            totalAmount,
            totalAmountInRupees: totalAmount / 100
        });

        // Create Razorpay order
        const orderOptions = {
            amount: totalAmount,
            currency: 'INR',
            receipt: `booking_${Date.now()}`,
            notes: {
                listingId: listingId,
                listingTitle: listing.title,
                checkIn: checkIn,
                checkOut: checkOut,
                numberOfNights: numberOfNights,
                guestCount: guestCount
            }
        };

        console.log('🔧 Creating Razorpay order with options:', orderOptions);

        const order = await razorpay.orders.create(orderOptions);
        console.log('✅ Razorpay order created:', order.id);

        // Create booking record
        const booking = new Booking({
            listing: listingId,
            user: req.user._id,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            numberOfNights: numberOfNights,
            totalAmount: totalAmount / 100, // Store in rupees
            pricePerNight: listing.price,
            razorpayOrderId: order.id,
            guestCount: guestCount,
            specialRequests: specialRequests || ''
        });

        await booking.save();
        console.log('✅ Booking saved to database:', booking._id);

        res.json({
            success: true,
            order: order,
            booking: booking,
            key_id: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error('❌ Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating payment order',
            error: error.message
        });
    }
};

// Verify payment and update booking
module.exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Verify signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }

        // Update booking with payment details
        const booking = await Booking.findOne({ razorpayOrderId: razorpay_order_id });
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        booking.razorpayPaymentId = razorpay_payment_id;
        booking.paymentStatus = 'completed';
        await booking.save();

        res.json({
            success: true,
            message: 'Payment verified successfully',
            booking: booking
        });

    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying payment'
        });
    }
};

// Get user's booking history
module.exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('listing')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            bookings: bookings
        });

    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching booking history'
        });
    }
};

// Get booking details
module.exports.getBookingDetails = async (req, res) => {
    try {
        const { bookingId } = req.params;
        
        const booking = await Booking.findById(bookingId)
            .populate('listing')
            .populate('user', 'username email');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if user owns this booking
        if (booking.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        res.json({
            success: true,
            booking: booking
        });

    } catch (error) {
        console.error('Error fetching booking details:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching booking details'
        });
    }
};

// Cancel booking
module.exports.cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if user owns this booking
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        // Check if booking can be cancelled (not too close to check-in)
        const now = new Date();
        const checkInDate = new Date(booking.checkIn);
        const daysUntilCheckIn = Math.ceil((checkInDate - now) / (1000 * 60 * 60 * 24));

        if (daysUntilCheckIn <= 1) {
            return res.status(400).json({
                success: false,
                message: 'Bookings can only be cancelled at least 24 hours before check-in'
            });
        }

        booking.bookingStatus = 'cancelled';
        booking.paymentStatus = 'cancelled';
        await booking.save();

        res.json({
            success: true,
            message: 'Booking cancelled successfully',
            booking: booking
        });

    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({
            success: false,
            message: 'Error cancelling booking'
        });
    }
}; 