const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

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

// Index Route - Show all listings
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// New Route - Show form to create a new listing
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

// Create Route - Handle POST request to create new listing
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}));

// Show Route - Show a specific listing
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"},}).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}));

// Edit Route - Show edit form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

// Update Route - Handle PUT request to update listing
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if (listing.owner.toString() !== req.user._id.toString()) {
        req.flash("error", "You don't have permission to edit this listing.");
        return res.redirect(`/listings/${id}`);
    }

    if (!req.body.listing) {
        return res.status(400).json({ error: "Listing data is required" });
    }

    const updatedImage = {
        url: req.body.listing.image,
        filename: "file1", // You might want to handle file name dynamically
    };

    const updatedListing = await Listing.findByIdAndUpdate(
        id,
        {
            ...req.body.listing,
            image: updatedImage,
        },
        { new: true, runValidators: true }
    );

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}));

// Delete Route - Delete a listing
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router;
