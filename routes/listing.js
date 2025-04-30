const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

// Joi validation for listing creation and updates
const Joi = require("joi");

// Define Joi validation schema for the listing
const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        // Add other fields like category, location, etc.
    }).required(),
});

// Middleware for validating listing data
// const validateListing = (req, res, next) => {
//     const { error } = listingSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map((el) => el.message).join(", ");
//         return next(new ExpressError(400, msg));  // Pass error to ExpressError
//     }
//     next();
// };

router.route("/")
.get(wrapAsync(listingController.index))

.post(isLoggedIn, wrapAsync(listingController.createListing));


// New Route - Show form to create a new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
.get(wrapAsync(listingController.showListing))

.put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))

.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route - Show edit form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
