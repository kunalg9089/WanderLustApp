const express = require("express");
const router = express.Router({ mergeParams: true }); // important for accessing :id from parent route
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isreviewAuthor } = require("../middleware/middleware.js");
const review = require("../models/review.js");
const { createReview } = require("../controllers/reviews.js");
const reviewController = require("../controllers/reviews.js");

// Reviews Route
router.post(
    "/",
    isLoggedIn,validateReview,
    wrapAsync(reviewController.createReview)
);

// Delete Review Route
router.delete(
    "/:reviewId",
    isLoggedIn,isreviewAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;